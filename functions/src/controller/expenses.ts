import { db } from '../firebase-settings'

import firebase from 'firebase'

import { ExpensesInterface } from '../interface/Expenses'
  
import { Request, Response} from 'express'
import { Message } from 'firebase-functions/lib/providers/pubsub'

// * renders the sales page
export const renderExpensesPage = (req: Request, res: Response) => {
  res.render('dashboard/expenditures')
}

// * Make an expense, add a document to the expense collection
export const makeExpenses = async (req: Request<ExpensesInterface>, res: Response) => {
  const expense: ExpensesInterface = req.body
  let message: string
  // expense.date = new Date()
  try {
    // console.log(expense)
    await db.collection('expenses').add(expense)
    message= 'successful'
    res.status(200).json({ message })
  } catch (err) {
    console.log(err)
    message = 'failed'
    res.status(400).json({ message })
  }
}

// * retrieve all the expenses
export const fetchAllExpenses = async (req: Request, res: Response) => {
  try {
    type Expense = firebase.firestore.QuerySnapshot<ExpensesInterface>
    const expensesRef: Expense = await db.collection('expenses').orderBy('date', 'desc').get()
    const expenses: ExpensesInterface[] = [];
    expensesRef.forEach(_doc => expenses.push({ doc: _doc.data(), id: _doc.id }))
    res.status(200).json(expenses)
  } catch (err) {
    console.log(err)
    res.status(200).json({ error : err})
  }
}