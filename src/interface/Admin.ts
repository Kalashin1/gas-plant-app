// eslint-disable-next-line import/no-extraneous-dependencies
import firebase from 'firebase'

export interface Admin extends firebase.User  {
  email: string,
  password?: string
}