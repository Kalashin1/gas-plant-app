"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSettingsPage = exports.addSettings = void 0;
const firebase_settings_1 = require("../firebase-settings");
// * add a new setting
exports.addSettings = async (req, res) => {
    const settings = req.body;
    const option = req.params.option;
    console.log(option, settings);
    if (option === 'add') {
        try {
            await firebase_settings_1.db.collection('settings').add(settings);
            res.status(200).end();
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err.message);
        }
    }
    else if (option === 'edit') {
        try {
            await firebase_settings_1.db.collection('settings').doc(settings.id).update(settings);
            res.status(200).end();
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err.message);
        }
    }
};
// * render the settings [age 
exports.renderSettingsPage = async (req, res) => {
    let edit = req.params.edit;
    const stringToBoolean = (str) => {
        switch (str.toLowerCase().trim()) {
            case "true":
                return true;
            case "false":
                return false;
            default: return Boolean(str);
        }
    };
    edit = stringToBoolean(edit);
    console.log(edit);
    // * if the request is made with an edit variable that is set to true render the settings page with some data
    if (edit === true) {
        const settingsRef = await firebase_settings_1.db.collection('settings').get();
        const settingsArr = settingsRef.docs.map(doc => doc.data());
        const settings = settingsArr[0];
        settingsRef.forEach(data => settings.id = data.id);
        console.log(settings);
        res.render('settings', { settings });
    }
    else { // * else just render only the settings page without any data
        res.render('settings');
    }
};
//# sourceMappingURL=settings.js.map