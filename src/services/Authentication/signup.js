import {auth} from '../../firebase/firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

export default (user, callback) => {
  createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(userCredentials => {
      updateProfile(auth.currentUser, {
        displayName: user.name,
      });
      callback({
        email: userCredentials.user.email,
        displayName: user.name,
      });
    })
    .catch(error => {
      console.log(error.code);
      console.log(error.message);
    });
};
