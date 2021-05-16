import Document from 'firebase'

export interface CustomerInterface extends Document {
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