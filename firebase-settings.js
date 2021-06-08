"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.db = void 0;
const app_1 = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA3O0v433uF3W6toU7iqS5lUUYSm4A-pZQ",
    authDomain: "gasplantadmin.firebaseapp.com",
    projectId: "gasplantadmin",
    storageBucket: "gasplantadmin.appspot.com",
    messagingSenderId: "1060225921487",
    appId: "1:1060225921487:web:d9c330e9f75d80ca8922ba",
    measurementId: "G-00CX41ZDNY"
};
app_1.default.initializeApp(firebaseConfig);
const db = app_1.default.firestore();
exports.db = db;
const auth = app_1.default.auth();
exports.auth = auth;
//# sourceMappingURL=firebase-settings.js.map