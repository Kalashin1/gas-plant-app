import * as express from "express";
import { signupUser, loginUser, signOut } from "../controller/auth";

const router = express.Router()

router.get('/home', (req: express.Request, res: express.Response) => {
  res.render('index')
})

router.get('/signup', (req: express.Request, res: express.Response) => {
  res.render('signup')
})

router.post('/signup', signupUser)

router.get('/login', (req: express.Request, res: express.Response) => {
  res.render('login')
})

router.post('/login', loginUser)


router.get('/dashboard/index', (req: express.Request, res: express.Response) => {
	res.render('dashboard/index')
})

router.get('/signout', signOut)
export { router }