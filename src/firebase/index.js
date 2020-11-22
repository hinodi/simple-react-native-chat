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

  // auth
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

  // user
  get userCollection() {
    return firebase.firestore().collection('users')
  }

  saveUser = (email, uid) => {
    this.userCollection.doc(uid).set({ email, uid })
  }

  getListUsers = async () => {
    try {
      const querySnapshot = await this.userCollection.get()
      const listUsers = querySnapshot.docs.map((doc) => doc.data())
      return listUsers
    } catch (err) {
      return []
    }
  }

  // chat
  getMessageRef(uid1) {
    const uid2 = this.currentUser.uid
    let refName = `messages_${uid1}_${uid2}`

    if (uid2.localeCompare(uid1) > 0) {
      refName = `messages_${uid2}_${uid1}`
    }

    return firebase.database().ref(refName)
  }

  parse = (snapshot) => {
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

  on = (uid, callback) =>
    this.getMessageRef(uid)
      .limitToLast(20)
      .on('child_added', (snapshot) => callback(this.parse(snapshot)))

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP
  }
  // send the message to the Backend
  send = (uid, messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i]
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      }
      this.append(uid, message)
    }
  }

  append = (uid, message) => this.getMessageRef(uid).push(message)

  // close the connection to the Backend
  off(uid) {
    this.getMessageRef(uid).off()
  }
}

export default new Fire()
