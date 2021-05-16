import Document from 'firebase'

export interface GasEntryInterface extends Document {
  date: Date,
  volume: number,
  cost: number,
  logistics: any,
  landing: any,
  supplier: string,
  remark: string
}