import { db } from '../firebase-settings'

import firebase from 'firebase'

import { StaffInterface } from '../interface/Staffs'
  
import { Request, Response} from 'express'

export const addStaff = async (req: Request, res: Response) => {
  const staffObj: StaffInterface = req.body
  let message: string
  try {
    staffObj.dob = new Date(staffObj.dob)
    await db.collection('staffs').add(staffObj)
    message = 'staff added successfully'
    res.status(200).json({ message })
  } catch (err) {
    console.log(err)
    message = 'failed, staff not added'
    res.status(400).json({ message })
  }
}

export const renderStaffPage = (req: Request, res: Response) => {
  res.render('dashboard/staff')
}

export const getAllStaffs = async (req: Request, res: Response) => {
  try {
    const staffRef: firebase.firestore.QuerySnapshot<StaffInterface> = await db.collection('staffs')
                                                                                .get()
    const staffs: StaffInterface[] = []
    staffRef.forEach(doc => staffs.push({ doc: doc.data(), id: doc.id }))
    res.json(staffs)
  } catch (err) {
    console.log(err)
    res.status(err)
  }
}