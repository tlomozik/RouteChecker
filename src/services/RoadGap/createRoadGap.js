import {useSelector} from 'react-redux';
import {useEffect} from 'react';
const handleGapCreation = (coord, accel) => {
  let accelRecord = {...coord, ...accel};

  return {accelRecord};
};

const createRoadGap = callback => {
  const {coordsArray} = useSelector(state => state.coords);
  const {accelArray} = useSelector(state => state.accel);

  useEffect(() => {
    let sub = null;

    if (
      coordsArray.length > 0 &&
      accelArray.length > 0 &&
      accelArray[accelArray.length - 1].z > 10
    ) {
      sub = handleGapCreation(
        coordsArray[coordsArray.length - 1],
        accelArray[accelArray.length - 1],
      );

      callback(sub);
    }

    return () => {
      sub = null;
    };
  }, [coordsArray]);
};

export default createRoadGap;
