import Document from 'firebase'

import { CustomerInterface } from './Customer'

export interface SalesInterface extends Document {
  item: string,
  price: number,
  quantity: number,
  total: number,
  paymentMethod: string,
  amountPaid: number,
  customerChange: number,
  pointAwarded: number,
  vat: number,
  customer: CustomerInterface,
  date: Date,
  cashier: string,
  totalSales: number,
  totalKilo: number,
  totalBottles: number
}