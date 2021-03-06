// eslint-disable-next-line
import firebase from 'firebase'

export interface GasEntryInterface extends firebase.firestore.DocumentData {
  date: Date,
  volume: number,
  cost: number,
  logistics: any,
  landing: any,
  supplier: string,
  remark: string
}