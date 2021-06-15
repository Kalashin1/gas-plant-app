"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//  * Auth functions
const auth_1 = require("../controller/auth");
//  * Product Controller
const product_cont_1 = require("../controller/product-cont");
// * Customer functions
const customer_1 = require("../controller/customer");
// * Staff functions
const staff_1 = require("../controller/staff");
// * Expenses functions
const expenses_1 = require("../controller/expenses");
// * Sales functions
const sales_1 = require("../controller/sales");
const settings_1 = require("../controller/settings");
const sms_1 = require("../controller/sms");
const tank_1 = require("../controller/tank");
const router = express_1.Router();
exports.router = router;
// *  returns the home page
router.get("/home", (req, res) => {
    res.render("index");
});
//  * renders the home page on the dashboard
router.get("/dashboard/index", auth_1.isUserAdmin, (req, res) => {
    res.render("dashboard/index");
});
//  * renders the signup page
router.get("/signup", (req, res) => {
    res.render("signup");
});
//  * signs the user up
router.post("/signup", auth_1.signupUser);
//  * renders the login page
router.get("/login", (_req, res) => {
    res.render("login");
});
// * Make a User a chashier
router.get("/make-cashier", auth_1.isUserAdmin, (_req, res) => {
    res.render("edit/make-cashier");
});
// * Get the current Logged In User
router.get("/user", auth_1.getLoggedInUser);
//  * logs the user in
router.post("/login", auth_1.loginUser);
//  * logs the user out
router.get("/signout", auth_1.signOut);
// * SETTINGS
// * render the settings page
router.get("/settings/:edit", auth_1.isUserAdmin, settings_1.renderSettingsPage);
// * upload the settings
router.post("/settings/:option", auth_1.isUserAdmin, settings_1.addSettings);
// * get the settings
router.get("/settings", auth_1.getSettings);
//  * get the product page
router.get("/dashboard/products", auth_1.isUserLoggedIn, product_cont_1.fetchProductPage);
//  * creates a new product
router.post("/product/add", auth_1.isUserLoggedIn, product_cont_1.addNewProduct);
// * get a single product
router.get("/product/id/:id", auth_1.isUserLoggedIn, product_cont_1.getProduct);
// * gets all the products
router.get("/products/all", auth_1.isUserLoggedIn, product_cont_1.getAllProducts);
// * renders the edit product page
router.get("/product/edit/:id", auth_1.isUserLoggedIn, product_cont_1.renderEditProdcutPage);
// * edit the post
router.post("/product/edit/:id", auth_1.isUserLoggedIn, product_cont_1.editProduct);
// * delete a product
router.get("/product/delete/:id", auth_1.isUserAdmin, product_cont_1.deleteProduct);
//  * renders the entry pages
router.get("/dashboard/entry", auth_1.isUserLoggedIn, product_cont_1.renderEntry);
//  * Makes a new gas entry
router.post("/entry", auth_1.isUserAdmin, product_cont_1.makeGasEntry);
// *  get the latest product info
router.get("/product/info", auth_1.isUserLoggedIn, product_cont_1.fetchProductInfo);
// *  renders the gas price page
router.get("/dashboard/price", auth_1.isUserLoggedIn, (req, res) => {
    res.render("dashboard/gas-price");
});
// *  set the gas price
router.post("/gas/price", auth_1.isUserLoggedIn, product_cont_1.setGasPrice);
//  * get the gas price page
router.get("/gas/price", auth_1.isUserLoggedIn, product_cont_1.getGasPrice);
// * Tank Routes
// * Create a gas tank
router.post('/tanks/create', auth_1.isUserAdmin, tank_1.addGasTank);
// * get all the gas tank
router.get('/tanks/all', auth_1.isUserLoggedIn, tank_1.getAllTanks);
// * Get an individual tank
router.get('/tanks/id/:id', auth_1.isUserLoggedIn, tank_1.getOneTank);
//  * renders the customers page
router.get("/dashboard/customers", auth_1.isUserLoggedIn, (req, res) => {
    res.render("dashboard/customers");
});
// *  create a new customer
router.post("/customer", auth_1.isUserLoggedIn, customer_1.addNewCustomer);
//  * retrieve all the customers with pagination
router.get("/customers/all/:start/:end", auth_1.isUserLoggedIn, customer_1.getAllCustomers);
// * retrieve all the customers without pagination
router.get("/customers/all", auth_1.isUserLoggedIn, customer_1.getAllCustomers);
// * get a single customer
router.get("/customer/id/:id", auth_1.isUserLoggedIn, customer_1.getCustomer);
// * render edit customer page
router.get("/customer/edit/:id", auth_1.isUserLoggedIn, customer_1.renderEditCustomer);
// * edit a single customer
router.post("/customer/edit/:id", auth_1.isUserLoggedIn, customer_1.editCustomer);
// * delete a customer
router.get("/customer/delete/:id", auth_1.isUserAdmin, customer_1.deleteCustomer);
// * Retrieve Customers whose birthday is today
router.get('/customers/birthday', customer_1.getCustomersBirthday);
//  * create a staff
router.post("/staff/create", auth_1.isUserAdmin, staff_1.addStaff);
// * render the staff page
router.get("/dashboard/staffs", auth_1.isUserLoggedIn, staff_1.renderStaffPage);
// * Gets all the staffs
router.get("/staff/all", auth_1.isUserLoggedIn, staff_1.getAllStaffs);
// * Gets the staff with a particular id
router.get("/staff/id/:id", auth_1.isUserLoggedIn, staff_1.getStaff);
// * render edit staff page
router.get("/staff/edit/:id", auth_1.isUserAdmin, staff_1.renderEditStaffPage);
// * edit the staff
router.post("/staff/edit/:id", auth_1.isUserAdmin, staff_1.editStaff);
// * delete a staff
router.get("/staff/delete/:id", auth_1.isUserAdmin, staff_1.deleteStaff);
//  * EXPENSES
//  * render expenses page
router.get("/dashboard/expenses", auth_1.isUserLoggedIn, expenses_1.renderExpensesPage);
// * Make a new expenses
router.post("/expenses/new", auth_1.isUserLoggedIn, expenses_1.makeExpenses);
// * Retrieve all the expenses based on pagination
router.get('/expenses/all/:start/:end', auth_1.isUserLoggedIn, expenses_1.fetchAllExpenses);
// * retrieve all the expenses
router.get("/expenses/all", auth_1.isUserLoggedIn, expenses_1.fetchAllExpenses);
//  * SALES
// * render sales page
router.get("/dashboard/sales", auth_1.isUserLoggedIn, sales_1.renderSalesPage);
// * make a sale
router.post("/sales/new", auth_1.isUserLoggedIn, sales_1.makeSales);
// * retrieve all sales with pagination
router.get("/sales/all/:start/:end", auth_1.isUserLoggedIn, sales_1.getAllSales);
// * retrieve all sales without pagination
router.get("/sales/all", auth_1.isUserLoggedIn, sales_1.getAllSales);
// * SMS
// * Render sms page
router.get('/dashboard/sms', auth_1.isUserLoggedIn, sms_1.renderSmsPage);
router.post('/sms/send', sms_1.sendSms);
//# sourceMappingURL=router.js.map