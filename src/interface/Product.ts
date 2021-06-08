// eslint-disable-next-line
import firebase from "firebase";
export interface AccessoriesInterface extends firebase.database.DataSnapshot {
  quantityBought: Number;
  quantityLeft: Number;
  totalSold: Number;
  AmountSold: Number;
}
