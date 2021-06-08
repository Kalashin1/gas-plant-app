"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStaff = exports.editStaff = exports.renderEditStaffPage = exports.getAllStaffs = exports.getStaff = exports.renderStaffPage = exports.addStaff = void 0;
const firebase_settings_1 = require("../firebase-settings");
// * add a new staff
exports.addStaff = async (req, res) => {
    const staffObj = req.body;
    let message;
    try {
        staffObj.dob = new Date(staffObj.dob);
        await firebase_settings_1.db.collection('staffs').add(staffObj);
        message = 'staff added successfully';
        res.status(200).json({ message });
    }
    catch (err) {
        console.log(err);
        message = 'failed, staff not added';
        res.status(400).json({ message });
    }
};
// * render the staff page
exports.renderStaffPage = (req, res) => {
    res.render('dashboard/staff');
};
// * Get a single staff
exports.getStaff = async (req, res) => {
    const { id } = req.params;
    try {
        const docRef = await firebase_settings_1.db.collection('staffs').doc(id).get();
        const staff = { doc: docRef.data(), id: docRef.id };
        res.status(200).json(staff);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};
// * Get all the staffs from the staff collection
exports.getAllStaffs = async (req, res) => {
    try {
        const staffRef = await firebase_settings_1.db.collection('staffs').get();
        const staffs = [];
        staffRef.forEach(doc => staffs.push({ doc: doc.data(), id: doc.id }));
        res.json(staffs);
    }
    catch (err) {
        console.log(err);
        res.status(err);
    }
};
// * render the edit staff page
exports.renderEditStaffPage = async (req, res) => {
    const { id } = req.params;
    try {
        const docRef = await firebase_settings_1.db.collection('staffs').doc(id).get();
        const staff = { doc: docRef.data(), id: docRef.id };
        res.render('edit/staff', { staff });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};
// * edit a staff
exports.editStaff = async (req, res) => {
    const { id } = req.params;
    const docUpdate = req.body;
    try {
        const docRef = firebase_settings_1.db.collection('staffs').doc(id);
        await docRef.update(docUpdate);
        res.redirect('/dashboard/staffs');
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};
// * delete a staff
exports.deleteStaff = async (req, res) => {
    const { id } = req.params;
    try {
        const docRef = firebase_settings_1.db.collection('staffs').doc(id);
        await docRef.delete();
        res.redirect('/dashboard/staffs');
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};
//# sourceMappingURL=staff.js.map