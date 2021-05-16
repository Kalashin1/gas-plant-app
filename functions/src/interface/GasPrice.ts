import Document from 'firebase'

export interface GasPriceInterface extends Document {
  price: number,
  date: Date
}