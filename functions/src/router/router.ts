import * as express from "express";
import { signupUser, loginUser, signOut } from "../controller/auth";
import { makeEntry, renderEntry } from "../controller/product-cont";

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

// returns the entry pages
router.get("/dashboard/entry", renderEntry);

// Makes a new entry
router.post("/entry", makeEntry);
export { router };
