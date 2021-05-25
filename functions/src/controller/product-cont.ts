import firebase from 'firebase'

import { Request, Response } from "express";
// import { Admin } from '../interface/Admin'
import { db } from "../firebase-settings";
import { GasPriceInterface } from "../interface/GasPrice";
import { AccessoriesInterface } from '../interface/Accessories';
// import

// making a product entry
export const fetchProductPage = async (req: Request, res: Response) => {
  res.render('dashboard/products')
}

//  * Add a new product or accessory
export const addNewProduct = async (req: Request<AccessoriesInterface>, res: Response) => {
  const product: AccessoriesInterface = req.body
  let message: string
  try {
    await db.collection('products').add(product)
    message = 'successful'
    res.status(200).json({message})
  } catch (err) {
    console.log(err)
    message = 'failed'
    res.status(400).json({ message, error: err})
  }
} 

// * Get a particular product
export const getProduct = async (req: Request, res: Response) => {
  const productId = req.params.id

  try {
    const product = await db.collection('products').doc(productId).get()
    res.status(200).json({ doc: product.data(), id: product.id })
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}

// * Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    type Product = firebase.firestore.QuerySnapshot<AccessoriesInterface>
    const productRef: Product  = await db.collection('products').get()
    const products: AccessoriesInterface[] = []
    productRef.forEach(d => products.push({ doc: d.data(), id: d.id}))
    res.status(200).json(products)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'succesful' })
  }
}

//  * edit a product
export const editProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  const product = req.body

  try {
    const productRef = db.collection('products').doc(id)
    await productRef.update(product)
    res.status(200).json({ message: 'successful'})
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
} 

export const renderEditProdcutPage = async (req: Request, res: Response) => {
  console.log(req.params)
  try {
    const { id } = req.params

    const productRef = await db.collection('products').doc(id).get()
    const product = { doc: productRef.data(), id: productRef.id }
    // console.log(productRef.data())
    res.render('edit/edit-product.ejs', { product })
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}









export const makeGasEntry = async (req: Request, res: Response) => {
  const {
    date,
    entryVolume,
    cost,
    logistics,
    landing,
    supplier,
    remark,
  } = req.body;   //  * extracting the properties from the form

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

    // update the product-info collection with some data, create a new
    await db.collection("product-info").add({
      quantityBought: entryVolume,
      createdAt: date,
      quantityLeft: entryVolume,
      totalSold: 0,
      AmountSold: 0,
      category: 'gas',
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

// set the gas price
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

// gets the current gas prie
export const getGasPrice = async (req: Request, res: Response) => {
  const docRef: firebase.firestore.QuerySnapshot<GasPriceInterface> = await db.collection('gas-price').orderBy('date', 'desc').limit(1).get()
  let data: GasPriceInterface;
  docRef.forEach( doc => data = doc.data())
  res.json({ price: data.price})
}
