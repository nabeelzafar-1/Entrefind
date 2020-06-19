import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }
  init = () => {
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: 'AIzaSyC-dSIE0YCLaVb5yBTP1W_CItyk22jQqjU',
        authDomain: 'entrefind-690a5.firebaseapp.com',
        databaseURL: 'https://entrefind-690a5.firebaseio.com',
        projectId: 'entrefind-690a5',
        storageBucket: 'entrefind-690a5.appspot.com',
        messagingSenderId: '254971791525',
        appId: '1:254971791525:web:3c572334b006b03de8254c',
        measurementId: 'G-4T0X2BZZ5R',
      };
      firebase.initializeApp(firebaseConfig);
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };
      this.db.push(message);
    });
  };

  parse = (message) => {
    const {user, text, timestamp} = message.val();
    const {key: _id} = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback) => {
    this.db.on('child_added', (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref('messages');
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
