import { Router } from "express";
import * as express from 'express'

const router = Router()

router.get('/home', (req: express.Request, res: express.Response) => {
  res.render('index')
})

export { router }