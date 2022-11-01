import {auth} from '../../firebase/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';

export default (user, callback) => {
  signInWithEmailAndPassword(auth, user.email, user.password)
    .then(userCredentials => {
      callback({
        email: userCredentials.user.email,
        displayName: userCredentials.user.displayName,
      });
    })
    .catch(error => {
      console.log(error.code);
      console.log(error.message);
    });
};
