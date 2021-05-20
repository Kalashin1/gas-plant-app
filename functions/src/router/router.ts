import * as express from "express";
import { signupUser, loginUser, signOut } from "../controller/auth";
import {
  makeEntry,
  renderEntry,
  fetchProductInfo,
  setGasPrice,
  getGasPrice,
} from "../controller/product-cont";

import { addNewCustomer, getAllCustomers } from "../controller/customer";
import { addStaff, getAllStaffs, renderStaffPage } from "../controller/staff";

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



// renders the customers page
router.get('/dashboard/customers', (req: express.Request, res: express.Response) => {
  res.render('dashboard/customers')
})

// create a new customer
router.post('/customer', addNewCustomer)

// retrieve all the customers
router.get('/customers/all', getAllCustomers)


// create a staff
router.post('/staff/create', addStaff)

router.get('/dashboard/staffs', renderStaffPage)

router.get('/staff/all', getAllStaffs)
export { router };
