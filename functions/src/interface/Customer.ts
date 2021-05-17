// eslint-disable-next-line
import firebase from 'firebase'

export interface CustomerInterface extends firebase.database.DataSnapshot {
  cusReg: any,
  regDate: Date,
  name: string,
  phoneNumber: number,
  address: {
    street: string,
    zip: number | string,
    state?: string,
    province?: string,
    country: string
  },
  dob: Date
}