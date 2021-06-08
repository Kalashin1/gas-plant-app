"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneTank = exports.getAllTanks = exports.addGasTank = void 0;
// import firebase from 'firebase'
const firebase_settings_1 = require("../firebase-settings");
// add a Gas Tank
exports.addGasTank = async (req, res) => {
    const obj = req.body;
    try {
        obj.gasVolume = 0;
        obj.isEmpty = true;
        // add the new Tank to the Tank Db
        await firebase_settings_1.db.collection('tanks').add(obj);
        res.status(200).json({ message: 'successful' });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: 'failed' });
    }
};
exports.getAllTanks = async (req, res) => {
    try {
        const gasRef = await firebase_settings_1.db.collection('tanks').get();
        const gases = [];
        gasRef.forEach(_doc => gases.push({ doc: _doc.data(), id: _doc.id }));
        res.status(200).json(gases);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};
exports.getOneTank = async (req, res) => {
    const id = req.params.id;
    try {
        const gasRef = await firebase_settings_1.db.collection('tanks').doc(id).get();
        const gas = gasRef.data();
        res.status(200).json(gas);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: 'failed' });
    }
};
//# sourceMappingURL=tank.js.map