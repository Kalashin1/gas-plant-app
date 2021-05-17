import { Request, Response} from 'express'
// import { Admin } from '../interface/Admin'
import { auth, db } from '../firebase-settings'

export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
 
  try{
    await auth.createUserWithEmailAndPassword(email, password)
    res.status(200).end()
  }
  catch (err) {
    res.status(404).json({ errorCode: err.code, errorMessage: err.message})
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  
  try{
    await auth.signInWithEmailAndPassword(email, password)
    res.status(200).end()
  }
  catch (err) {
    res.status(400).json({ errorCode: err.code, errorMessage: err.message})
  }
}

export const signOut = async (req: Request, res: Response) => {

  try {
    await auth.signOut()
    res.status(200).redirect('/login')
  } catch (err) {
    res.status(400).json({ errorCode: err.code, errMessage: err.message})
  }
}

