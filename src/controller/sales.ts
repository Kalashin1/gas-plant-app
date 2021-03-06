import { Request, Response } from 'express'
import { db } from '../firebase-settings'
import firebase from 'firebase'

// import the serverSms function from sms
import { requestSMS } from './sms'

import { SalesInterface } from '../interface/Sales'
// import { GasEntryInterface } from '../interface/GasEntry'

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

      // * get the tank that the sale is being made from
      const TankdbRef = db.collection('tanks').doc(salesItem.tank)

      // * get the tank
      const tankRef = await TankdbRef.get()
      
      const tank = tankRef.data()

      // check if the gas volume in the tank is not empty

      if (tank.gasVolume > 0) {
        // check if the gas volume in the tank is more than the current quantity of gas being bought
        if (tank.gasVolume > salesItem.quantity) {
          // * Update the tank
          await TankdbRef.update({
            gasVolume: tank.gasVolume - salesItem.quantity,
          })

        } else {
          throw Error('Quantity of gas is not enough, select another tank')
        }

      } else {
        await TankdbRef.update({
            isEmpty: true,
          })
        throw Error('That tank is empty, select another tank')
      }

      

       // * get a reference to the customer from the customers collection
      const customerRef = db.collection('customers').doc(salesItem.customerId)
      const docRefs = await customerRef.get()
      // * get his phoneNumber
      let { phoneNumber: to, name, pointsTally } = docRefs.data()
      
      pointsTally = parseInt(pointsTally)

      const { quantity, item, total, pointAwarded } = salesItem

      // * update the customer's point tally
      await db.collection('customers').doc(customerRef.id).update({
        pointsTally: pointsTally + pointAwarded
      })

      pointsTally += pointAwarded

      // * Get a reference to the settings data
      const settingsRef = await db.collection('settings').get()

      // * map each data to the actual data
      const settings = settingsRef.docs.map(doc => doc.data())

      let companyNum:string = settings[0].phone

      // * Get the actual sms
      const text = eval('`'+settings[0].sms+'`')
      

      const obj = { destinations: [{ to }], text}
      // * Make a request to the infoBip Api to send a message
      const smsResponse = await requestSMS(obj)
      // * Add it to the sms collection
      // await db.collection('sms').add(smsResponse)
      console.log(smsResponse, obj)
      // * add the sales item to the sales collection
      await db.collection('sales').add(salesItem)

      res.status(200).json({ message: 'successful' })
    }
     
    // * if the product is not gas then get the product from the product collection using
    else {
      const docRef = db.collection('products').doc(salesItem.item)
      const productRef = await docRef.get()
      const product = productRef.data()

      // * update the product quantity
      await docRef.update({
        quantity: product.quantity - salesItem.quantity,
      })

      salesItem.item = product.name

      // * get a reference to the customer from the customers collection
      const customerRef = db.collection('customers').doc(salesItem.customerId)
      const docRefs = await customerRef.get()
      // * get his phoneNumber and his name
      let { phoneNumber: to, name, pointsTally } = docRefs.data()

      pointsTally = parseInt(pointsTally)

      // * Obtain the item bought, the quantity of item, the total and the point awarded for the item
      const { quantity, item, total, pointAwarded } = salesItem

       // * update the customer's point tally
      await db.collection('customers').doc(customerRef.id).update({
        pointsTally: pointsTally + pointAwarded
      })

      pointsTally += pointAwarded

     // * Get a reference to the settings data
      const settingsRef = await db.collection('settings').get()

      // * map each data to the actual data
      const settings = settingsRef.docs.map(doc => doc.data())
      
      let companyNum: string = settings[0].phone

      // * Get the actual sms
      let text: string = eval('`'+settings[0].sms+'`')
      
      text = text.replace('kg', '')

      const obj = { destinations: [{ to }], text}
      // * Make a request to the infoBip Api to send a message
      const smsResponse = await requestSMS(obj)
      // * Add it to the sms collection
      await db.collection('sms').add(smsResponse)
      console.log(smsResponse)
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

// * Get all the sales made
export const getAllSales = async (req: Request, res: Response) => {
  const { start, end } = req.params
  // console.log(start, end)
  try {
    type Sales = firebase.firestore.QuerySnapshot<SalesInterface>
    const docRef:Sales = await db.collection('sales').orderBy('date', 'desc').get()

    const sales: SalesInterface[] = []
    docRef.forEach(doc => sales.push({ doc: doc.data(), id: doc.id }))
    if (end && start) {
      res.status(200).json(sales.slice(parseInt(start), parseInt(end)))
    } else {
      res.status(200).json(sales)
    }
    
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}