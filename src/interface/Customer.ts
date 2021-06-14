// eslint-disable-next-line
import firebase from 'firebase'

export interface CustomerInterface extends firebase.firestore.DocumentData {
  cusReg?: any,
  regDate?: Date,
  name?: string,
  phoneNumber?: number,
  address?: string,
  dob?: Date,
  pointsTally?: number,
}