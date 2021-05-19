import * as express from "express";
import { signupUser, loginUser, signOut } from "../controller/auth";
import {
  makeEntry,
  renderEntry,
  fetchProductInfo,
  setGasPrice,
  getGasPrice,
} from "../controller/product-cont";

import { addNewCustomer } from "../controller/customer";

const router = express.Router();

// returns the home page
router.get("/home", (req: express.Request, res: express.Response) => {
  res.render("index");
});

// renders the signup page
router.get("/signup", (req: express.Request, res: express.Response) => {
  res.render("signup");
});

// signs the user up
router.post("/signup", signupUser);

// renders the login page
router.get("/login", (_req: express.Request, res: express.Response) => {
  res.render("login");
});

// logs the user in
router.post("/login", loginUser);

// renders the home page on the dashboard
router.get(
  "/dashboard/index",
  (req: express.Request, res: express.Response) => {
    res.render("dashboard/index");
  }
);

// logs the user out
router.get("/signout", signOut);

// renders the entry pages
router.get("/dashboard/entry", renderEntry);

// Makes a new entry
router.post("/entry", makeEntry);

// get the latest product info
router.get("/product/info", fetchProductInfo);

// renders the gas price page
router.get('/dashboard/price', (req: express.Request, res: express.Response) => {
  res.render('dashboard/gas-price')
})

// set the gas price
router.post('/gas/price', setGasPrice)

// get the gas price page
router.get('/gas/price', getGasPrice)


router.get('/dashboard/customers', (req: express.Request, res: express.Response) => {
  res.render('dashboard/customers')
})

router.post('/customer', addNewCustomer)
export { router };
