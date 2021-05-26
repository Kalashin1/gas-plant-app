// import * as functions from 'firebase-functions';
import * as express from 'express'
import { router } from './router/router';

const app = express()

//  * middleware

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(router)

// exports.app = functions.https.onRequest(app)

app.listen(3000, () => console.log('app running on PORT 3000, visit http://localhost:3000'))
