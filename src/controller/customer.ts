import { db } from '../firebase-settings'
import firebase from 'firebase'
import { Request, Response } from 'express'
import { CustomerInterface } from '../interface/Customer'


// * Create a new customer
export const addNewCustomer = async (req: Request, res: Response) => {
  const { regNum, name, phoneNumber, regDate, address, dob } = req.body

  try {
    await db.collection('customers').add({
      regNum,
      name,
      phoneNumber,
      regDate,
      address,
      dob,
    })
    res.status(200).json({ message: 'customer added successfully' })
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}

// * Retrieve a single customer
export const getCustomer = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const cusRef = await db.collection('customers').doc(id).get()
    const customer = { doc: cusRef.data(), id: cusRef.id }
    res.status(200).json(customer)
  } catch (err) {
     console.log(err)
    res.status(400).json(err)
  }
}

// * Retrieve all the customers from the database
export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers: firebase.firestore.QuerySnapshot<CustomerInterface> = await db.collection('customers').get()

    const customersArray: CustomerInterface[] = [];
    customers.forEach(customer => {
      customersArray.push({ doc: customer.data(), id: customer.id })
    })

    res.json(customersArray)
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}

// * Renders the edit page
export const renderEditCustomer = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const customerRef = await db.collection('customers').doc(id).get()
    const customer = { doc: customerRef.data(), id: customerRef.id }
    res.render('edit/customer', { customer })
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}

// * Edits the customer's info
export const editCustomer = async (req: Request, res: Response) => {
  const { id } = req.params
  const newInfo = req.body

  try {
    const cusRef = db.collection('customers').doc(id)
    await cusRef.update(newInfo)
    res.status(200).redirect('/dashboard/customers')
  } catch (err) {
    console.log(err)
    res.status(400).json(err.message)
  }
}

// * Delete A document
export const deleteCustomer = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const cusRef = db.collection('customers').doc(id)
    await cusRef.delete()
    res.redirect('/dashboard/customers')
  } catch (err) {
    console.log(err)
    res.status(400).json(err.message)
  }
}

export const getCustomersBirthday = async (req: Request, res: Response) => {
  const date = new Date();
  console.log(date)
  try {
    const cusRef = await db.collection('customers').get()
    const customers = cusRef.docs.map(doc => doc.data())
    customers.forEach(doc => console.log(doc))
  } catch (err) {
    console.log(err)
  }
}