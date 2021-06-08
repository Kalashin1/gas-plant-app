// eslint-disable-next-line
import firebase from 'firebase'

export interface ExpensesInterface extends firebase.firestore.DocumentData {
  itemBought?: string,
  quantity?: number,
  amount?: number,
  seller?: any,
  phoneNumber?: number,
  boughtBy?: string,
  date?: Date,
  remark?: string
}