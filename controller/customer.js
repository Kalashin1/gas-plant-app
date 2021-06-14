"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomersBirthday = exports.deleteCustomer = exports.editCustomer = exports.renderEditCustomer = exports.getAllCustomers = exports.getCustomer = exports.addNewCustomer = void 0;
const firebase_settings_1 = require("../firebase-settings");
// * Create a new customer
exports.addNewCustomer = async (req, res) => {
    const { regNum, name, phoneNumber, regDate, address, dob } = req.body;
    try {
        await firebase_settings_1.db.collection('customers').add({
            regNum,
            name,
            phoneNumber,
            regDate,
            address,
            dob,
        });
        res.status(200).json({ message: 'customer added successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
// * Retrieve a single customer
exports.getCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const cusRef = await firebase_settings_1.db.collection('customers').doc(id).get();
        const customer = { doc: cusRef.data(), id: cusRef.id };
        res.status(200).json(customer);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
// * Retrieve all the customers from the database
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await firebase_settings_1.db.collection('customers').get();
        const customersArray = [];
        customers.forEach(customer => {
            customersArray.push({ doc: customer.data(), id: customer.id });
        });
        res.json(customersArray);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
// * Renders the edit page
exports.renderEditCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const customerRef = await firebase_settings_1.db.collection('customers').doc(id).get();
        const customer = { doc: customerRef.data(), id: customerRef.id };
        res.render('edit/customer', { customer });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
// * Edits the customer's info
exports.editCustomer = async (req, res) => {
    const { id } = req.params;
    const newInfo = req.body;
    try {
        const cusRef = firebase_settings_1.db.collection('customers').doc(id);
        await cusRef.update(newInfo);
        res.status(200).redirect('/dashboard/customers');
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};
// * Delete A document
exports.deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const cusRef = firebase_settings_1.db.collection('customers').doc(id);
        await cusRef.delete();
        res.redirect('/dashboard/customers');
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};
exports.getCustomersBirthday = async (req, res) => {
    const date = new Date();
    console.log(date);
    try {
        const cusRef = await firebase_settings_1.db.collection('customers').get();
        const customers = cusRef.docs.map(doc => doc.data());
        customers.forEach(doc => console.log(doc));
    }
    catch (err) {
        console.log(err);
    }
};
//# sourceMappingURL=customer.js.map