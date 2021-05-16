import * as functions from 'firebase-functions';
import * as express from 'express'
import * as cookieParser from 'cookie-parser'

import { router } from './router/router';

const app = express()

//  * middleware
app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookieParser())
app.use(router)

exports.app = functions.https.onRequest(app)
