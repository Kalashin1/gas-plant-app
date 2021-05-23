// eslint-disable-next-line
import firebase from 'firebase'

import { CustomerInterface } from './Customer'

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
  customer?: CustomerInterface,
  date?: Date,
  cashier?: string
}