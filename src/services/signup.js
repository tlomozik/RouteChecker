import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ADD_USER } from "../redux/slices/authSlice";

export default ({ email, password, name, navigation, dispatch }) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      dispatch(ADD_USER(userCredentials.user));
      navigation.navigate("Home");
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
};
