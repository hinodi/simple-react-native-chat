import { GoogleSignin } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

class Fire {
  // static ErrorCode = {
  //   EmailUsed: 'auth/email-already-in-use',
  // }

  // auth
  // signIn = async (email, password) => {
  //   try {
  //     await firebase.auth().createUserWithEmailAndPassword(email, password)
  //     return this.signInWithEmailAndPassword(email, password)
  //   } catch (err) {
  //     if (err.code === Fire.ErrorCode.EmailUsed) {
  //       return this.signInWithEmailAndPassword(email, password)
  //     }
  //     throw new Error(err.message)
  //   }
  // }

  // signInWithEmailAndPassword = async (email, password) => {
  //   try {
  //     await firebase.auth().signInWithEmailAndPassword(email, password)
  //     this.saveUser(this.currentUser.email, this.currentUser.uid)
  //     return
  //   } catch (err) {
  //     throw new Error(err.message)
  //   }
  // }

  signInWithGoogle = async () => {
    try {
      GoogleSignin.configure()
      const { idToken } = await GoogleSignin.signIn()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)

      const res = await auth().signInWithCredential(googleCredential)
      const { uid, email, displayName: name } = res?.user ?? {}
      this.saveUser({ uid, email, name })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  signOut = async () => {
    try {
      await auth().signOut()
      return
    } catch (err) {
      throw new Error(err.message)
    }
  }

  get currentUser() {
    return auth().currentUser
  }

  // user
  get userCollection() {
    return firestore().collection('users')
  }

  saveUser = ({ uid, email, name }) => {
    this.userCollection.doc(uid).set({ uid, email, name })
  }

  getListUsers = async () => {
    try {
      // this.userCollection.doc().onSnapshot
      const querySnapshot = await this.userCollection.get()
      const listUsers = querySnapshot.docs.map((doc) => doc.data())
      return listUsers
    } catch (err) {
      return []
    }
  }

  searchUserByEmail = async (email) => {
    const querySnapshot = await this.userCollection
      .where('email', '==', email)
      .get()
    if (querySnapshot.docs.length > 0) {
      return querySnapshot.docs[0].data()
    }
    return null
  }

  // chat

  // getMessageRef(uid1) {
  //   const uid2 = this.currentUser.uid
  //   let refName = `messages_${uid1}_${uid2}`

  //   if (uid2.localeCompare(uid1) > 0) {
  //     refName = `messages_${uid2}_${uid1}`
  //   }

  //   return firebase.database().ref(refName)
  // }

  // parse = (snapshot) => {
  //   const { timestamp: numberStamp, text, user } = snapshot.val()
  //   const { key: _id } = snapshot
  //   const timestamp = new Date(numberStamp)
  //   const message = {
  //     _id,
  //     timestamp,
  //     text,
  //     user,
  //   }
  //   return message
  // }

  // on = (uid, callback) =>
  //   this.getMessageRef(uid)
  //     .limitToLast(20)
  //     .on('child_added', (snapshot) => callback(this.parse(snapshot)))

  // get timestamp() {
  //   return firebase.database.ServerValue.TIMESTAMP
  // }
  // // send the message to the Backend
  // send = (uid, messages) => {
  //   for (let i = 0; i < messages.length; i++) {
  //     const { text, user } = messages[i]
  //     const message = {
  //       text,
  //       user,
  //       timestamp: this.timestamp,
  //     }
  //     this.append(uid, message)
  //   }
  // }

  // append = (uid, message) => this.getMessageRef(uid).push(message)

  // // close the connection to the Backend
  // off(uid) {
  //   this.getMessageRef(uid).off()
  // }
}

export default new Fire()
