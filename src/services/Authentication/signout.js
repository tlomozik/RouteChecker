import {signOut} from 'firebase/auth';
import {auth} from '../../firebase/firebase';
import {DELETE_USER} from '../../redux/slices/authSlice';
const signout = ({dispatch}) => {
  dispatch(DELETE_USER(auth.currentUser.displayName));
  signOut(auth)
    .then(() => {
      console.log('Signout succesful');
    })
    .catch(error => {
      console.log(error.code);
      console.log(error.message);
    });
};
export default signout;
