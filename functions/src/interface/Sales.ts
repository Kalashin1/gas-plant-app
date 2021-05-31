// eslint-disable-next-line
import firebase from 'firebase'


export interface SalesInterface extends firebase.firestore.DocumentData {
  item?: string,
  price?: number,
  quantity?: number,
  total?: number,
  paymentMethod?: string,
  amountPaid?: number,
  balance?: number,
  pointAwarded?: number,
  vat?: number,
  customerId?: string,
  date?: Date,
  cashier?: string
}