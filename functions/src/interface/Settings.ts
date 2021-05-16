import Document from 'firebase'

export interface SettingsInterface extends Document {
  companyName: string,
  companyAddress: string,
  companyPhone: number,
  companySlogan: string,
  companyLogo: string
}