import { Request, Response } from 'express'
import { db } from "../firebase-settings";
import { SettingsInterface } from "../interface/Settings";

// * add a new setting
export const addSettings = async (req: Request<SettingsInterface>, res: Response) => {
  const settings = req.body
  const option = req.params.option

  console.log(option, settings)

  if (option === 'add') {
    try {
      await db.collection('settings').add(settings)
      res.status(200).end()
    } catch (err) {
      console.log(err)
      res.status(400).json(err.message)
    }
  } 
  
  else if (option === 'edit') {
     try {
      await db.collection('settings').doc(settings.id).update(settings)
      res.status(200).end()
    } catch (err) {
      console.log(err)
      res.status(400).json(err.message)
    }
  }
  
}

// * render the settings [age 
export const renderSettingsPage = async (req: Request, res: Response) => {
  let edit: string | boolean = req.params.edit

  const stringToBoolean = (str: string) =>{
    switch(str.toLowerCase().trim()){
      case "true":
        return true;
      case "false":
        return false;
        default: return Boolean(str);
    }
  }

  edit = stringToBoolean(edit)
  console.log(edit)
  // * if the request is made with an edit variable that is set to true render the settings page with some data
  if (edit === true) {
    const settingsRef = await db.collection('settings').get()
    const settingsArr = settingsRef.docs.map(doc => doc.data())
    const settings = settingsArr[0]
    settingsRef.forEach(data => settings.id = data.id)
    console.log(settings)
    res.render('settings', { settings })
  } else {        // * else just render only the settings page without any data
    res.render('settings')
  }
  
}

