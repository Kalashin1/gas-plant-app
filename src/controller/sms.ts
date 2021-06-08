import { db } from '../firebase-settings'
// import firebase from 'firebase'
import fetch from 'node-fetch'
import { Response, Request } from 'express'
require('dotenv').config()

// * render the sms page
export const renderSmsPage = (req: Request, res: Response) => {
  res.render('dashboard/sms')
}

// send an sms
export const sendSms = async (req: Request, res: Response) => {
  const { msg: text, customerNum } = req.body
  
  const destinations = customerNum.map((num:any) => ({ to : num }))

  try {
    const _res = await fetch('https://mp83k4.api.infobip.com/sms/2/text/advanced', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': process.env.SMS_KEY,
      },
      body: JSON.stringify({
        messages: [
          {
            from: 'uptrax Tech',
            text,
            destinations,
          },
        ],
      }),
    })

     if (_res.ok ) {
      const data = await _res.json()
      await db.collection('sms').add(data)   
      res.json(await _res.json())
    }
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}

export interface severSms {
  destinations: any[],
  text: string
}

export const requestSMS = async (obj: severSms) => {
  try {
    const _res = await fetch('https://mp83k4.api.infobip.com/sms/2/text/advanced', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': process.env.SMS_KEY,
      },
      body: JSON.stringify({
        messages: [
          {
            from: 'uptrax Tech',
            text: obj.text,
            destinations: obj.destinations,
          },
        ],
      }),
    })

    if (_res.ok) {
      return (await _res.json())
    } 

  }
  catch (err) {
    console.log(err)
    return { status: err.status, error: err.message}
  }
}