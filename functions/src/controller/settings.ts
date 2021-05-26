import { Request, Response } from 'express'
import { db } from "../firebase-settings";
import { SettingsInterface } from "../interface/Settings";

// * add a new setting
export const addSettings = async (req: Request<SettingsInterface>, res: Response) => {
  const settings = req.body
  
  try {
    await db.collection('settings').add(settings)
    res.status(200).end()
  } catch (err) {
    console.log(err)
    res.status(400).json(err.message)
  }
}

// * render the settings [age 
export const renderSettingsPage = (req: Request, res: Response) => {
  res.render('settings')
}

