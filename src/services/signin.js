import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ADD_USER } from "../redux/slices/authSlice";

export default ({ email, password, navigation, dispatch }) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      dispatch(ADD_USER(userCredentials.user));

      navigation.navigate("Home");
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
};
