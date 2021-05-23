import { Request, Response } from 'express'
import * as fetch from 'node-fetch'
import { db } from '../firebase-settings'

import { SalesInterface } from '../interface/Sales'
import { GasEntryInterface } from '../interface/GasEntry'


export const renderSalesPage = (req: Request, res: Response) => {
  res.render('dashboard/sales')
}

export const makeSales = async (req: Request<SalesInterface>, res: Response) => {
  const salesItem: SalesInterface = req.body
  try {
    console.log(salesItem)
    if (salesItem.item == 'gas') {

      let gasInfo: any

      const docRef = await db
      .collection("product-info")
      .orderBy("createdAt", "desc")
      .limit(1)
        .get();
      
      docRef.docs.forEach((doc) => {
        gasInfo = doc.data()
        gasInfo.id = doc.id
      });

      console.log(gasInfo)

      const gasDocRef = db.collection('product-info').doc(gasInfo.id)

      await gasDocRef.update({
        quantityLeft: gasInfo.quantityLeft - salesItem.quantity,
        totalSold: gasInfo.totalSold + salesItem.quantity,
        AmountSold: gasInfo.AmountSold + salesItem.total
      })

      await db.collection('sales').add(salesItem)

      res.status(200).json({ message: 'successful' })
    }
     
    else {
      const docRef = db.collection('products').doc(salesItem.item)
      const productRef = await docRef.get()
      const product = productRef.data()
      docRef.update({
        quantity: product.quantity - salesItem.quantity
      })

      await db.collection('sales').add(salesItem)

      res.status(200).json({ message: 'successful' })
    }
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}