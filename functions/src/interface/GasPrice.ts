// eslint-disable-next-line
import firebase from 'firebase'

export interface GasPriceInterface extends firebase.database.DataSnapshot {
  price: number,
  date: Date
}