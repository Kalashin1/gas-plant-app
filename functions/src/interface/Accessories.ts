// eslint-disable-next-line
import firebase from 'firebase'
export interface AccessoriesInterface extends firebase.firestore.DocumentData {
  productName: string,
  productCost: number,
  productSell: number,
  productQuantity: number,
  productDescription: number
}