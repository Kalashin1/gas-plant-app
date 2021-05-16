import Document from 'firebase'

export interface StaffInterface extends Document {
  firstName: string,
  lastName: string,
  designation: string,
  position: string,
  username: string,
  password: string,
  phoneNumber: number,
  email: string,
  address: string,
  lga: string,
  state: string,
  bloodgroup: 'A'| 'AB' | 'B' | 'O',
  dob: Date,
  genotype: 'AA' | 'AS' | 'SS',
  allergies: string[],
  bankName: string,
  accountName: string,
  accountNumber: number,
  loginTime: Date,
  logoutTime: Date,
  image: string  
}