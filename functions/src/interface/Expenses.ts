// eslint-disable-next-line
import firebase from 'firebase'

export interface ExpensesInterface extends firebase.database.DataSnapshot {
  itemBought: string,
  quantity: number,
  amount: number,
  seller: any,
  phoneNumber: number,
  boughtBy: any,
  date: Date,
  remark: string
}