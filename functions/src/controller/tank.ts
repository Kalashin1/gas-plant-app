// import firebase from 'firebase'
import { db } from '../firebase-settings'
import { Response, Request } from 'express'


// add a Gas Tank
export const addGasTank = async (req: Request, res: Response) => {
  const obj = req.body

  try {
    obj.gasVolume = 0
    obj.isEmpty = true
    // add the new Tank to the Tank Db
    await db.collection('tanks').add(obj)
    res.status(200).json({ message: 'successful' })
  }
  catch(err) {
    console.log(err)
    res.status(400).json({ message: 'failed' })
  }
}

export const getAllTanks = async (req: Request, res: Response) => {
  try{
    type gasObj = { doc: any, id: string}
    const gasRef = await db.collection('tanks').get()
    const gases: gasObj[] = []
    gasRef.forEach(_doc => gases.push({ doc: _doc.data(), id: _doc.id}))
    res.status(200).json(gases)
  }
  catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message})
  }
}

export const getOneTank = async (req: Request, res: Response) => {
  const id = req.params.id
  try{
    const gasRef = await db.collection('tanks').doc(id).get()
    const gas = gasRef.data()
    res.status(200).json(gas)
  }
  catch (err) {
    console.log(err)
    res.status(400).json({ message: 'failed' })
  }
}