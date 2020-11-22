import firebase from 'firebase'
import firebaseConfig from '../config/secret.json'

class Fire {
  static ErrorCode = {
    EmailUsed: 'auth/email-already-in-use',
  }

  constructor() {
    this.init()
  }

  init = () => firebase.initializeApp(firebaseConfig)

  signIn = async (email, password) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      return this.signInWithEmailAndPassword(email, password)
    } catch (err) {
      if (err.code === Fire.ErrorCode.EmailUsed) {
        return this.signInWithEmailAndPassword(email, password)
      }
      throw new Error(err.message)
    }
  }

  signInWithEmailAndPassword = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      console.log('hinodi user', this.currentUser)
      this.saveUser(this.currentUser.email, this.currentUser.uid)
      return
    } catch (err) {
      throw new Error(err.message)
    }
  }

  observeAuth = (listener = () => {}) =>
    firebase.auth().onAuthStateChanged(listener)

  get currentUser() {
    return firebase.auth().currentUser
  }

  //
  get userDocument() {
    return firebase.firestore().collection('chat').doc('user')
  }

  saveUser = (email, uid) => {
    this.userDocument.set({ email, uid })
  }

  getListUsers = async () => {
    try {
      const doc = await this.userDocument.get()
      console.log('hinodi ------- 01', doc.data())
    } catch (err) {
      console.log('get list users failed', err)
    }
  }

  //

  get ref() {
    return firebase.database().ref(`messages_${this.currentUser.uid}`)
  }

  get users() {
    return firebase
      .firestore()
      .collection('user')
      .doc('OfBAVYoIrWkjWl5w5W5G')
      .get()
  }

  parse = (snapshot) => {
    console.log('hinodi snapshot', snapshot.val())
    const { timestamp: numberStamp, text, user } = snapshot.val()
    const { key: _id } = snapshot
    const timestamp = new Date(numberStamp)
    const message = {
      _id,
      timestamp,
      text,
      user,
    }
    return message
  }

  on = (callback) =>
    this.ref
      .limitToLast(20)
      .on('child_added', (snapshot) => callback(this.parse(snapshot)))

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP
  }
  // send the message to the Backend
  send = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i]
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      }
      this.append(message)
    }
  }

  append = (message) => this.ref.push(message)

  // close the connection to the Backend
  off() {
    this.ref.off()
  }
}

export default new Fire()
