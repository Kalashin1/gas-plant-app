import Document from 'firebase'

export interface ExpensesInterface extends Document {
  itemBought: string,
  quantity: number,
  amount: number,
  seller: any,
  phoneNumber: number,
  boughtBy: any,
  date: Date,
  remark: string
}