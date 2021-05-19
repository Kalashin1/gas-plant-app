import { Request, Response } from "express";
// import { Admin } from '../interface/Admin'
import { auth, db, firebase } from "../firebase-settings";
import { GasPriceInterface } from "../interface/GasPrice";

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
      createdAt: date,
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

// render the make-entry page
export const renderEntry = (req: Request, res: Response) => {
  res.render("dashboard/make-entry");
};

// fetch the latest information
export const fetchProductInfo = async (req: Request, res: Response) => {
  try {
    const docRef = await db
      .collection("product-info")
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();
    docRef.docs.forEach((doc) => res.json(doc.data()));
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};


export const setGasPrice = async (req: Request, res: Response) => {
  const  price:number  = req.body.price
  console.log(req.body)
  try {
    await db.collection('gas-price').add({
      price,
      date: new Date(),
    })
    res.status(200).json({ message: 'successful' })
  } catch (err) {
    console.log(err)
    res.json(err)
  }
}

export const getGasPrice = async (req: Request, res: Response) => {
  const docRef: firebase.firestore.QuerySnapshot<GasPriceInterface> = await db.collection('gas-price').orderBy('date', 'desc').limit(1).get()
  let data: GasPriceInterface;
  docRef.forEach( (doc) => data = doc.data())
  res.json({ price: data.price})
}