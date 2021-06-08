"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGasPrice = exports.setGasPrice = exports.fetchProductInfo = exports.renderEntry = exports.makeGasEntry = exports.deleteProduct = exports.renderEditProdcutPage = exports.editProduct = exports.getAllProducts = exports.getProduct = exports.addNewProduct = exports.fetchProductPage = void 0;
// import { Admin } from '../interface/Admin'
const firebase_settings_1 = require("../firebase-settings");
// import
// making a product entry
exports.fetchProductPage = async (req, res) => {
    res.render("dashboard/products");
};
//  * Add a new product or accessory
exports.addNewProduct = async (req, res) => {
    const product = req.body;
    console.log(product);
    let message;
    try {
        await firebase_settings_1.db.collection("products").add(product);
        message = "successful";
        res.status(200).json({ message });
    }
    catch (err) {
        console.log(err);
        message = "failed";
        res.status(400).json({ message, error: err });
    }
};
// * Get a particular product
exports.getProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await firebase_settings_1.db.collection("products").doc(productId).get();
        res.status(200).json({ doc: product.data(), id: product.id });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
// * Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const productRef = await firebase_settings_1.db.collection("products").get();
        const products = [];
        productRef.forEach((d) => products.push({ doc: d.data(), id: d.id }));
        res.status(200).json(products);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "succesful" });
    }
};
//  * edit a product
exports.editProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    try {
        const productRef = firebase_settings_1.db.collection("products").doc(id);
        await productRef.update(product);
        res.status(200).json({ message: "successful" });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
// * renders the edit page along with the requested product
exports.renderEditProdcutPage = async (req, res) => {
    console.log(req.params);
    try {
        const { id } = req.params;
        const productRef = await firebase_settings_1.db.collection("products").doc(id).get();
        const product = { doc: productRef.data(), id: productRef.id };
        console.log(productRef.data());
        res.render("edit/edit-product.ejs", { product });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await firebase_settings_1.db.collection("products").doc(id).delete();
        res.status(200).redirect("/dashboard/products");
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
exports.makeGasEntry = async (req, res) => {
    const { date, entryVolume, cost, logistics, landing, supplier, remark, tanks, } = req.body; //  * extracting the properties from the form
    console.log(tanks);
    try {
        // update the gas-entry collection with the data sent from the frontend
        await firebase_settings_1.db.collection("gas-entry").add({
            date,
            entryVolume,
            cost,
            logistics,
            landing,
            supplier,
            remark,
        });
        // update the product-info collection with some data, create a new
        await firebase_settings_1.db.collection("product-info").add({
            quantityBought: entryVolume,
            createdAt: date,
            quantityLeft: entryVolume,
            totalSold: 0,
            AmountSold: 0,
            category: "gas",
        });
        // * Get a reference to the tank we want to update
        tanks.forEach(async (tank) => {
            const tankRef = firebase_settings_1.db.collection('tanks').doc(tank);
            await tankRef.update({
                gasVolume: entryVolume / tanks.length,
                isEmpty: false,
            });
        });
        res.status(200).json({ message: "document added" });
    }
    catch (err) {
        console.log(err);
        const { errorCode, errorMessage } = err;
        res.status(400).json({ errorCode: errorCode, errorMessage: errorMessage });
    }
};
// render the make-entry page
exports.renderEntry = (req, res) => {
    res.render("dashboard/make-entry");
};
// fetch the latest information
exports.fetchProductInfo = async (req, res) => {
    try {
        const docRef = await firebase_settings_1.db
            .collection("product-info")
            .orderBy("createdAt", "desc")
            .limit(1)
            .get();
        docRef.docs.forEach((doc) => res.json(doc.data()));
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
};
// set the gas price
exports.setGasPrice = async (req, res) => {
    const price = req.body.price;
    const points = req.body.points;
    console.log(req.body);
    try {
        await firebase_settings_1.db.collection("gas-price").add({
            price,
            points,
            date: new Date(),
        });
        res.status(200).json({ message: "successful" });
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
};
// gets the current gas prie
exports.getGasPrice = async (req, res) => {
    const docRef = await firebase_settings_1.db
        .collection("gas-price")
        .orderBy("date", "desc")
        .limit(1)
        .get();
    let data;
    docRef.forEach((doc) => (data = doc.data()));
    res.json({ price: data.price, points: data.points });
};
//# sourceMappingURL=product-cont.js.map