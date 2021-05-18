import { Request, Response } from "express";
// import { Admin } from '../interface/Admin'
import { auth, db } from "../firebase-settings";

export const makeEntry = async (req: Request, res: Response) => {
  const {
    date,
    entryVolume,
    cost,
    logistics,
    landing,
    supplier,
    remark,
  } = req.body;

  try {
    // update the gas-entry collection with the data sent from the frontend
    await db.collection("gas-entry").add({
      date,
      entryVolume,
      cost,
      logistics,
      landing,
      supplier,
      remark,
    });

    // update the product-info collection with some data
    await db.collection("product-info").add({
      quantityBought: entryVolume,
      quantityLeft: entryVolume,
      totalSold: 0,
      AmountSold: 0,
    });

    res.status(200).json({ message: "document added" });
  } catch (err) {
    console.log(err);
    const { errorCode, errorMessage } = err;
    res.status(400).json({ errorCode: errorCode, errorMessage: errorMessage });
  }
};

export const renderEntry = (req: Request, res: Response) => {
  res.render("dashboard/make-entry");
};
