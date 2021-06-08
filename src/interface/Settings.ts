// eslint-disable-next-line
import firebase from 'firebase'

export interface SettingsInterface extends firebase.firestore.DocumentData {
  companyName?: string,
  companyAddress?: string,
  companyPhone?: number,
  companySlogan?: string,
  companyLogo?: string
}