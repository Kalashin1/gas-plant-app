import { Request, Response } from 'express'
import { db } from '../firebase-settings'
import firebase from 'firebase'

import { SalesInterface } from '../interface/Sales'
import { GasEntryInterface } from '../interface/GasEntry'

// render the sales page
export const renderSalesPage = (req: Request, res: Response) => {
  res.render('dashboard/sales')
}

// * make a sale 
export const makeSales = async (req: Request<SalesInterface>, res: Response) => {
  // * extract the body of the request
  const salesItem: SalesInterface = req.body
  try {
    // * if the sales item is gas 
    if (salesItem.item === 'gas') {

      let gasInfo: any

      // * retrieve the latest gas entry
      const docRef = await db
      .collection("product-info")
      .orderBy("createdAt", "desc")
      .limit(1)
        .get();
      
      docRef.docs.forEach((doc) => {
        gasInfo = doc.data()
        gasInfo.id = doc.id
      });

      // * get the entry that has an id equal to the entry we pulled out earlier
      const gasDocRef = db.collection('product-info').doc(gasInfo.id)

      // * update that entry with details from the salesItem
      await gasDocRef.update({
        quantityLeft: gasInfo.quantityLeft - salesItem.quantity,
        totalSold: gasInfo.totalSold + salesItem.quantity,
        AmountSold: gasInfo.AmountSold + salesItem.total,
      })

      // * add the sales item to the sales collection
      await db.collection('sales').add(salesItem)

      res.status(200).json({ message: 'successful' })
    }
     
    // * if it is not gas then get the product from the product collection using
    else {
      const docRef = db.collection('products').doc(salesItem.item)
      const productRef = await docRef.get()
      const product = productRef.data()

      // * update the product quantity
      await docRef.update({
        quantity: product.quantity - salesItem.quantity,
      })

      salesItem.item = product.name

      //  * add the sales item to the sales collection
      await db.collection('sales').add(salesItem)

      res.status(200).json({ message: 'successful' })
    }
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}

export const getAllSales = async (req: Request, res: Response) => {
  try {
    type Sales = firebase.firestore.QuerySnapshot<SalesInterface>
    const docRef:Sales = await db.collection('sales').get()

    const sales: SalesInterface[] = []
    docRef.forEach(doc => sales.push({ doc: doc.data(), id: doc.id }))
    res.status(200).json(sales)
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}