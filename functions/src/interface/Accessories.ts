// eslint-disable-next-line
import firebase from 'firebase'
export interface AccessoriesInterface extends firebase.firestore.DocumentData {
  name? : string,
  price? : number,
  category? : string,
  productQuantity? : number,
  productDescription? : number
}