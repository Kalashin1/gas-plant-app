// eslint-disable-next-line
import firebase from 'firebase'

export interface GasPriceInterface extends firebase.firestore.DocumentData {
  price?: number,
  date?: Date
}