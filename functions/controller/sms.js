"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSMS = exports.sendSms = exports.renderSmsPage = void 0;
const firebase_settings_1 = require("../firebase-settings");
// import firebase from 'firebase'
const node_fetch_1 = require("node-fetch");
require('dotenv').config();
// * render the sms page
exports.renderSmsPage = (req, res) => {
    res.render('dashboard/sms');
};
// send an sms
exports.sendSms = async (req, res) => {
    const { msg: text, customerNum } = req.body;
    const destinations = customerNum.map((num) => ({ to: num }));
    try {
        const _res = await node_fetch_1.default('https://mp83k4.api.infobip.com/sms/2/text/advanced', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': process.env.SMS_KEY,
            },
            body: JSON.stringify({
                messages: [
                    {
                        from: 'uptrax Tech',
                        text,
                        destinations,
                    },
                ],
            }),
        });
        if (_res.ok) {
            const data = await _res.json();
            await firebase_settings_1.db.collection('sms').add(data);
            res.json(await _res.json());
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
exports.requestSMS = async (obj) => {
    try {
        const _res = await node_fetch_1.default('https://mp83k4.api.infobip.com/sms/2/text/advanced', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': process.env.SMS_KEY,
            },
            body: JSON.stringify({
                messages: [
                    {
                        from: 'uptrax Tech',
                        text: obj.text,
                        destinations: obj.destinations,
                    },
                ],
            }),
        });
        if (_res.ok) {
            return (await _res.json());
        }
    }
    catch (err) {
        console.log(err);
        return { status: err.status, error: err.message };
    }
};
//# sourceMappingURL=sms.js.map