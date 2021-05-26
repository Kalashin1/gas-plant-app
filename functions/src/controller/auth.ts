import { Request, Response, NextFunction } from 'express'
// import { Admin } from '../interface/Admin'
import { auth, db } from '../firebase-settings'

// * Sign the user up with firebase auth
export const signupUser = async (req: Request, res: Response) => {
  const { email, password, adminStatus } = req.body
 
  try{
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    await db.collection('user').doc(user.uid).set({email, adminStatus})
    res.status(200).end()
  }
  catch (err) {
    res.status(400).json({ errorCode: err.code, errorMessage: err.message})
  }
}

// * Log the user in with firebase auth
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

// * Sign the user out
export const signOut = async (req: Request, res: Response) => {

  try {
    await auth.signOut()
    res.status(200).redirect('/login')
  } catch (err) {
    res.status(400).json({ errorCode: err.code, errMessage: err.message})
  }
}

//  * Get the current logged in user
export const isUserLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  const user = auth.currentUser

  if (user) {
    next()
  } else {
    res.redirect('/login')
  }

  next()
}

// * Check if the user is and admin
export const isUserAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = auth.currentUser

  if (user) {
    const docRef = await db.collection('users').doc(user.uid).get()
    const userDoc = docRef.data()

    userDoc.isAdmin ? next() : res.redirect('/dashboard/index')
  } else {
    res.redirect('/login')
  }

  next()
}