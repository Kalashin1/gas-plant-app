"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSales = exports.makeSales = exports.renderSalesPage = void 0;
const firebase_settings_1 = require("../firebase-settings");
// import the serverSms function from sms
const sms_1 = require("./sms");
// import { GasEntryInterface } from '../interface/GasEntry'
// render the sales page
exports.renderSalesPage = (req, res) => {
    res.render('dashboard/sales');
};
// * make a sale 
exports.makeSales = async (req, res) => {
    // * extract the body of the request
    const salesItem = req.body;
    try {
        // * if the sales item is gas 
        if (salesItem.item === 'gas') {
            let gasInfo;
            // * retrieve the latest gas entry
            const docRef = await firebase_settings_1.db
                .collection("product-info")
                .orderBy("createdAt", "desc")
                .limit(1)
                .get();
            docRef.docs.forEach((doc) => {
                gasInfo = doc.data();
                gasInfo.id = doc.id;
            });
            // * get the entry that has an id equal to the entry we pulled out earlier
            const gasDocRef = firebase_settings_1.db.collection('product-info').doc(gasInfo.id);
            // * update that entry with details from the salesItem
            await gasDocRef.update({
                quantityLeft: gasInfo.quantityLeft - salesItem.quantity,
                totalSold: gasInfo.totalSold + salesItem.quantity,
                AmountSold: gasInfo.AmountSold + salesItem.total,
            });
            // * get the tank that the sale is being made from
            const TankdbRef = firebase_settings_1.db.collection('tanks').doc(salesItem.tank);
            // * get the tank
            const tankRef = await TankdbRef.get();
            const tank = tankRef.data();
            // check if the gas volume in the tank is not empty
            if (tank.gasVolume > 0) {
                // check if the gas volume in the tank is more than the current quantity of gas being bought
                if (tank.gasVolume > salesItem.quantity) {
                    // * Update the tank
                    await TankdbRef.update({
                        gasVolume: tank.gasVolume - salesItem.quantity,
                    });
                }
                else {
                    throw Error('Quantity of gas is not enough, select another tank');
                }
            }
            else {
                await TankdbRef.update({
                    isEmpty: true,
                });
                throw Error('That tank is empty, select another tank');
            }
            // * get a reference to the customer from the customers collection
            const customerRef = firebase_settings_1.db.collection('customers').doc(salesItem.customerId);
            const docRefs = await customerRef.get();
            // * get his phoneNumber
            const { phoneNumber: to } = docRefs.data();
            const { quantity, item, total } = salesItem;
            const text = `Friendly reminder that you bought ${quantity}kg of ${item} from us at N${total}, Thanks for patronizing us.`;
            const obj = { destinations: [{ to }], text };
            // * Make a request to the infoBip Api to send a message
            const smsResponse = await sms_1.requestSMS(obj);
            // * Add it to the sms collection
            // await db.collection('sms').add(smsResponse)
            console.log(smsResponse, obj);
            // * add the sales item to the sales collection
            await firebase_settings_1.db.collection('sales').add(salesItem);
            res.status(200).json({ message: 'successful' });
        }
        // * if the product is not gas then get the product from the product collection using
        else {
            const docRef = firebase_settings_1.db.collection('products').doc(salesItem.item);
            const productRef = await docRef.get();
            const product = productRef.data();
            // * update the product quantity
            await docRef.update({
                quantity: product.quantity - salesItem.quantity,
            });
            salesItem.item = product.name;
            // * get a reference to the customer from the customers collection
            const customerRef = firebase_settings_1.db.collection('customers').doc(salesItem.customerId);
            const docRefs = await customerRef.get();
            // * get his phoneNumber
            const { phoneNumber: to } = docRefs.data();
            const text = `Friendly reminder that you bought ${salesItem.quantity} of ${salesItem.item} from us at N${salesItem.total}, Thanks for patronizing us.`;
            const obj = { destinations: [{ to }], text };
            // * Make a request to the infoBip Api to send a message
            const smsResponse = await sms_1.requestSMS(obj);
            // * Add it to the sms collection
            await firebase_settings_1.db.collection('sms').add(smsResponse);
            console.log(smsResponse);
            //  * add the sales item to the sales collection
            await firebase_settings_1.db.collection('sales').add(salesItem);
            res.status(200).json({ message: 'successful' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
// * Get all the sales made
exports.getAllSales = async (req, res) => {
    try {
        const docRef = await firebase_settings_1.db.collection('sales').orderBy('date', 'desc').get();
        const sales = [];
        docRef.forEach(doc => sales.push({ doc: doc.data(), id: doc.id }));
        res.status(200).json(sales);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
//# sourceMappingURL=sales.js.map