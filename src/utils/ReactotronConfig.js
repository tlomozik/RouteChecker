import Reactotron, { openInEditor } from "reactotron-react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

Reactotron.clear();

Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure()
  .use(openInEditor()) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
