import { db } from '../firebase-settings'
import firebase from 'firebase'
import { Request, Response } from 'express'
import { CustomerInterface } from '../interface/Customer'

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