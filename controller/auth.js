"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettings = exports.getLoggedInUser = exports.isUserAdmin = exports.isUserLoggedIn = exports.signOut = exports.loginUser = exports.signupUser = void 0;
// import { Admin } from '../interface/Admin'
const firebase_settings_1 = require("../firebase-settings");
// * Sign the user up with firebase auth
exports.signupUser = async (req, res) => {
    const { email, password, adminStatus } = req.body;
    try {
        const { user } = await firebase_settings_1.auth.createUserWithEmailAndPassword(email, password);
        await firebase_settings_1.db.collection("user").doc(user.uid).set({ email, adminStatus });
        res.status(200).json({ message: "success" });
    }
    catch (err) {
        res.status(400).json({ errorCode: err.code, errorMessage: err.message });
    }
};
// * Log the user in with firebase auth
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        await firebase_settings_1.auth.signInWithEmailAndPassword(email, password);
        res.status(200).end();
    }
    catch (err) {
        res.status(400).json({ errorCode: err.code, errorMessage: err.message });
    }
};
// * Sign the user out
exports.signOut = async (req, res) => {
    try {
        await firebase_settings_1.auth.signOut();
        res.status(200).redirect("/login");
    }
    catch (err) {
        res.status(400).json({ errorCode: err.code, errMessage: err.message });
    }
};
//  * Get the current logged in user
exports.isUserLoggedIn = async (req, res, next) => {
    const user = firebase_settings_1.auth.currentUser;
    if (user !== null || undefined) {
        next();
    }
    else {
        res.redirect("/login");
    }
    // next()
};
// * Check if the user is and admin
exports.isUserAdmin = async (req, res, next) => {
    const user = firebase_settings_1.auth.currentUser;
    if (user) {
        const userRef = await firebase_settings_1.db
            .collection("users")
            .where("email", "==", user.email)
            .limit(1)
            .get();
        let doc = {};
        userRef.forEach((_doc) => (doc = _doc.data()));
        console.log(doc);
        if (doc.adminStatus !== false) {
            next();
        }
        else {
            res.redirect("/dashboard/sales");
        }
    }
    else {
        res.redirect("/login");
    }
    // next()
};
exports.getLoggedInUser = async (req, res) => {
    const user = firebase_settings_1.auth.currentUser;
    if (user) {
        // const userRef = await db.collection("users").doc(user.uid).get();
        // const userDoc = userRef.data();
        let _userDoc;
        const staffRef = await firebase_settings_1.db
            .collection("staffs")
            .where("email", "==", user.email)
            .limit(1)
            .get();
        staffRef.forEach((staff) => {
            _userDoc = staff.data();
        });
        res.json({ _userDoc });
    }
};
exports.getSettings = async (req, res) => {
    const setRef = await firebase_settings_1.db.collection("settings").limit(1).get();
    let settings = {};
    setRef.forEach((doc) => (settings = doc.data()));
    res.json(settings);
};
//# sourceMappingURL=auth.js.map