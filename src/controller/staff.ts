import { db } from '../firebase-settings'

import firebase from 'firebase'

import { StaffInterface } from '../interface/Staffs'
  
import { Request, Response} from 'express'


// * add a new staff
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

// * render the staff page
export const renderStaffPage = (req: Request, res: Response) => {
  res.render('dashboard/staff')
}

// * Get a single staff
export const getStaff = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const docRef = await db.collection('staffs').doc(id).get()
    const staff = { doc: docRef.data(), id: docRef.id }
    res.status(200).json(staff)
  } catch (err) {
    console.log(err)
    res.status(400).json(err.message)
  }
}

// * Get all the staffs from the staff collection
export const getAllStaffs = async (req: Request, res: Response) => {
  try {
    type Staff = firebase.firestore.QuerySnapshot<StaffInterface>
    const staffRef:Staff  = await db.collection('staffs').get()
    const staffs: StaffInterface[] = []
    staffRef.forEach(doc => staffs.push({ doc: doc.data(), id: doc.id }))
    res.json(staffs)
  } catch (err) {
    console.log(err)
    res.status(err)
  }
}

// * render the edit staff page
export const renderEditStaffPage = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const docRef = await db.collection('staffs').doc(id).get()
    const staff = { doc: docRef.data(), id: docRef.id }
    res.render('edit/staff', { staff })
  } catch (err) {
    console.log(err)
    res.status(400).json(err.message)
  }
}

// * edit a staff
export const editStaff = async (req: Request, res: Response) => {
  const { id } = req.params
  const docUpdate = req.body

  try {
    const docRef = db.collection('staffs').doc(id)
    await docRef.update(docUpdate)
    res.redirect('/dashboard/staffs')
  } catch (err) {
    console.log(err)
    res.status(400).json(err.message)
  }
}

// * delete a staff
export const deleteStaff = async (req: Request, res: Response) => {
  const { id } = req.params
  
  try {
    const docRef = db.collection('staffs').doc(id)
    await docRef.delete()
    res.redirect('/dashboard/staffs')
  } catch (err) {
    console.log(err)
    res.status(400).json(err.message)
  }
}