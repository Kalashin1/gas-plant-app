"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllExpenses = exports.makeExpenses = exports.renderExpensesPage = void 0;
const firebase_settings_1 = require("../firebase-settings");
// import { Message } from 'firebase-functions/lib/providers/pubsub'
// * renders the sales page
exports.renderExpensesPage = (req, res) => {
    res.render('dashboard/expenditures');
};
// * Make an expense, add a document to the expense collection
exports.makeExpenses = async (req, res) => {
    const expense = req.body;
    let message;
    // expense.date = new Date()
    try {
        // console.log(expense)
        await firebase_settings_1.db.collection('expenses').add(expense);
        message = 'successful';
        res.status(200).json({ message });
    }
    catch (err) {
        console.log(err);
        message = 'failed';
        res.status(400).json({ message });
    }
};
// * retrieve all the expenses
exports.fetchAllExpenses = async (req, res) => {
    const { start, end } = req.params;
    try {
        const expensesRef = await firebase_settings_1.db.collection('expenses').orderBy('date', 'desc').get();
        const expenses = [];
        expensesRef.forEach(_doc => expenses.push({ doc: _doc.data(), id: _doc.id }));
        if (start && end) {
            res.status(200).json(expenses.slice(parseInt(start), parseInt(end)));
        }
        else {
            res.status(200).json(expenses);
        }
    }
    catch (err) {
        console.log(err);
        res.status(200).json({ error: err });
    }
};
//# sourceMappingURL=expenses.js.map