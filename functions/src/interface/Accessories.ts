import Document from 'firebase'

export interface AccessoriesInterface extends Document {
  productName: string,
  productCost: number,
  productSell: number,
  productQuantity: number,
  productDescription: number
}