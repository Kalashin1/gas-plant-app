import { Request, Response, Router } from "express";

//  * Auth functions
import {
  signupUser,
  loginUser,
  signOut,
  isUserLoggedIn,
  isUserAdmin,
  getLoggedInUser,
  getSettings,
} from "../controller/auth";

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
  getProduct,
  renderEditProdcutPage,
  editProduct,
  deleteProduct,
} from "../controller/product-cont";

// * Customer functions
import {
  addNewCustomer,
  deleteCustomer,
  editCustomer,
  getAllCustomers,
  getCustomer,
  getCustomersBirthday,
  renderEditCustomer,
} from "../controller/customer";

// * Staff functions
import {
  addStaff,
  deleteStaff,
  editStaff,
  getAllStaffs,
  getStaff,
  renderEditStaffPage,
  renderStaffPage,
} from "../controller/staff";

// * Expenses functions
import {
  renderExpensesPage,
  makeExpenses,
  fetchAllExpenses,
} from "../controller/expenses";

// * Sales functions
import { renderSalesPage, makeSales, getAllSales } from "../controller/sales";
import { addSettings, renderSettingsPage } from "../controller/settings";
import { renderSmsPage, sendSms } from "../controller/sms";
import { addGasTank, getAllTanks, getOneTank } from "../controller/tank";

const router = Router();

// *  returns the home page
router.get("/home", (req: Request, res: Response) => {
  res.render("index");
});

//  * renders the home page on the dashboard
router.get("/dashboard/index", isUserAdmin, (req: Request, res: Response) => {
  res.render("dashboard/index");
});

//  * renders the signup page
router.get("/signup", (req: Request, res: Response) => {
  res.render("signup");
});

//  * signs the user up
router.post("/signup", signupUser);

//  * renders the login page
router.get("/login", (_req: Request, res: Response) => {
  res.render("login");
});

// * Make a User a chashier
router.get("/make-cashier", isUserAdmin, (_req: Request, res: Response) => {
  res.render("edit/make-cashier");
});

// * Get the current Logged In User
router.get("/user", getLoggedInUser);

//  * logs the user in
router.post("/login", loginUser);

//  * logs the user out
router.get("/signout", signOut);





// * SETTINGS
// * render the settings page
router.get("/settings/:edit", isUserAdmin, renderSettingsPage);
// * upload the settings
router.post("/settings/:option", isUserAdmin, addSettings);
// * get the settings
router.get("/settings", getSettings);







//  * get the product page
router.get("/dashboard/products", isUserLoggedIn, fetchProductPage);

//  * creates a new product
router.post("/product/add", isUserLoggedIn, addNewProduct);

// * get a single product
router.get("/product/id/:id", isUserLoggedIn, getProduct);

// * gets all the products
router.get("/products/all", isUserLoggedIn, getAllProducts);
// * renders the edit product page
router.get("/product/edit/:id", isUserLoggedIn, renderEditProdcutPage);
// * edit the post
router.post("/product/edit/:id", isUserLoggedIn, editProduct);
// * delete a product
router.get("/product/delete/:id", isUserAdmin, deleteProduct);




//  * renders the entry pages
router.get("/dashboard/entry", isUserLoggedIn, renderEntry);

//  * Makes a new gas entry
router.post("/entry", isUserAdmin, makeGasEntry);

// *  get the latest product info
router.get("/product/info", isUserLoggedIn, fetchProductInfo);

// *  renders the gas price page
router.get(
  "/dashboard/price",
  isUserLoggedIn,
  (req: Request, res: Response) => {
    res.render("dashboard/gas-price");
  }
);

// *  set the gas price
router.post("/gas/price", isUserLoggedIn, setGasPrice);

//  * get the gas price page
router.get("/gas/price", isUserLoggedIn, getGasPrice);



// * Tank Routes
// * Create a gas tank
router.post('/tanks/create', isUserAdmin, addGasTank)
// * get all the gas tank
router.get('/tanks/all', isUserLoggedIn, getAllTanks)
// * Get an individual tank
router.get('/tanks/id/:id', isUserLoggedIn, getOneTank)




//  * renders the customers page
router.get(
  "/dashboard/customers",
  isUserLoggedIn,
  (req: Request, res: Response) => {
    res.render("dashboard/customers");
  }
);

// *  create a new customer
router.post("/customer", isUserLoggedIn, addNewCustomer);
//  * retrieve all the customers with pagination
router.get("/customers/all/:start/:end", isUserLoggedIn, getAllCustomers);
// * retrieve all the customers without pagination
router.get("/customers/all", isUserLoggedIn, getAllCustomers)
// * get a single customer
router.get("/customer/id/:id", isUserLoggedIn, getCustomer);
// * render edit customer page
router.get("/customer/edit/:id", isUserLoggedIn, renderEditCustomer);
// * edit a single customer
router.post("/customer/edit/:id", isUserLoggedIn, editCustomer);
// * delete a customer
router.get("/customer/delete/:id", isUserAdmin, deleteCustomer);
// * Retrieve Customers whose birthday is today
router.get('/customers/birthday', getCustomersBirthday)





//  * create a staff
router.post("/staff/create", isUserAdmin, addStaff);

// * render the staff page
router.get("/dashboard/staffs", isUserLoggedIn, renderStaffPage);
// * Gets all the staffs
router.get("/staff/all", isUserLoggedIn, getAllStaffs);
// * Gets the staff with a particular id
router.get("/staff/id/:id", isUserLoggedIn, getStaff);
// * render edit staff page
router.get("/staff/edit/:id", isUserAdmin, renderEditStaffPage);
// * edit the staff
router.post("/staff/edit/:id", isUserAdmin, editStaff);
// * delete a staff
router.get("/staff/delete/:id", isUserAdmin, deleteStaff);





//  * EXPENSES
//  * render expenses page
router.get("/dashboard/expenses", isUserLoggedIn, renderExpensesPage);
// * Make a new expenses
router.post("/expenses/new", isUserLoggedIn, makeExpenses);
// * Retrieve all the expenses based on pagination
router.get('/expenses/all/:start/:end', isUserLoggedIn, fetchAllExpenses)
// * retrieve all the expenses
router.get("/expenses/all", isUserLoggedIn, fetchAllExpenses);





//  * SALES
// * render sales page
router.get("/dashboard/sales", isUserLoggedIn, renderSalesPage);
// * make a sale
router.post("/sales/new", isUserLoggedIn, makeSales);
// * retrieve all sales with pagination
router.get("/sales/all/:start/:end", isUserLoggedIn, getAllSales);
// * retrieve all sales without pagination
router.get("/sales/all", isUserLoggedIn, getAllSales)



// * SMS
// * Render sms page
router.get('/dashboard/sms', isUserLoggedIn, renderSmsPage)
router.post('/sms/send', sendSms)
export { router };
