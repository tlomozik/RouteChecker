import { useSelector } from "react-redux";

export const isLoggedIn = () => {
  const { user } = useSelector((state) => state.user);
  if (user?.email) {
    return true;
  } else {
    return false;
  }
};
