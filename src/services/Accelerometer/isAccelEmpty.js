import {useSelector} from 'react-redux';

export const isAccellEmpty = () => {
  const {accelArray} = useSelector(state => state.accel);
  if (accelArray.length > 0) {
    return false;
  } else {
    return true;
  }
};
