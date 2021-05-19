import { db } from '../firebase-settings'
import { Request, Response } from 'express'

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