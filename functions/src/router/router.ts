import * as express from "express";
//  * Auth functions
import { signupUser, loginUser, signOut } from "../controller/auth";

//  * Product Controller
import {
  makeGasEntry,
  renderEntry,
  fetchProductInfo,
  setGasPrice,
  getGasPrice,
  fetchProductPage,
  addNewProduct,
  getAllProducts,
} from "../controller/product-cont";

// * Customer functions
import { addNewCustomer, getAllCustomers } from "../controller/customer";

// * Staff functions
import { addStaff, getAllStaffs, renderStaffPage } from "../controller/staff";

// * Expenses functions
import {
  renderExpensesPage,
  makeExpenses,
  fetchAllExpenses,
} from '../controller/expenses'

// * Sales functions
import { renderSalesPage, makeSales } from '../controller/sales'

const router = express.Router();

// *  returns the home page
router.get("/home", (req: express.Request, res: express.Response) => {
  res.render("index");
});


//  * renders the home page on the dashboard
router.get(
  "/dashboard/index",
  (req: express.Request, res: express.Response) => {
    res.render("dashboard/index");
  }
);

//  * renders the signup page
router.get("/signup", (req: express.Request, res: express.Response) => {
  res.render("signup");
});

//  * signs the user up
router.post("/signup", signupUser);

//  * renders the login page
router.get("/login", (_req: express.Request, res: express.Response) => {
  res.render("login");
});

//  * logs the user in
router.post("/login", loginUser);



//  * logs the user out
router.get("/signout", signOut);






//  * get the product page
router.get('/dashboard/products', fetchProductPage)

//  *creates a new product
router.post('/product/add', addNewProduct)

// * gets all the products
router.get('/products/all', getAllProducts)






//  * renders the entry pages
router.get("/dashboard/entry", renderEntry);

//  * Makes a new gas entry
router.post("/entry", makeGasEntry);

// *  get the latest product info
router.get("/product/info", fetchProductInfo);

// *  renders the gas price page
router.get('/dashboard/price', (req: express.Request, res: express.Response) => {
  res.render('dashboard/gas-price')
})

// *  set the gas price
router.post('/gas/price', setGasPrice)

//  * get the gas price page
router.get('/gas/price', getGasPrice)



//  * renders the customers page
router.get('/dashboard/customers', (req: express.Request, res: express.Response) => {
  res.render('dashboard/customers')
})

// *  create a new customer
router.post('/customer', addNewCustomer)

//  * retrieve all the customers
router.get('/customers/all', getAllCustomers)


//  * create a staff
router.post('/staff/create', addStaff)

router.get('/dashboard/staffs', renderStaffPage)

router.get('/staff/all', getAllStaffs)




//  * EXPENSES
//  * render expenses page
router.get('/dashboard/expenses', renderExpensesPage)
// * Make a new expenses
router.post('/expenses/new', makeExpenses)
// * retrieve all the expenses
router.get('/expenses/all', fetchAllExpenses)


//  * SALES
// * render sales page
router.get('/dashboard/sales', renderSalesPage)
// * make a sale
router.post('/sales/new', makeSales)
export { router };
