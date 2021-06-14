"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as functions from 'firebase-functions';
const express = require("express");
const router_1 = require("./router/router");
const app = express();
//  * middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(router_1.router);
// exports.app = functions.https.onRequest(app)
app.listen(process.env.PORT, () => console.log(`app running on PORT ${process.env.PORT}`));
//# sourceMappingURL=index.js.map
