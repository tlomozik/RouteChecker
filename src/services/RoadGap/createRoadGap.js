import {useSelector} from 'react-redux';
import {useEffect} from 'react';
const handleGapCreation = (coord, accel) => {
  let accelRecord = {...coord, ...accel};

  return {accelRecord};
};

// const identifyGapByAvg = (testedArray, arrayLength) => {
//   let identifiedGapsArray = [];

//   console.log(testedArray);
//   console.log(arrayLength);
//   let testedArrayZ = testedArray.map((item, key) => {
//     return item.z;
//   });
//   console.log(testedArrayZ);
//   let average = testedArrayZ.reduce((a, b) => a + b, 0) / 5;
//   console.log(average);

//   testedArrayZ.map((item, index) => {
//     if (
//       (item > average && item - average > 3) || //jeśli nierówność większa od średniej
//       (item < average && average - item > 3) //jeśli nierówność mniejsza
//     ) {
//       console.log(index + 1 + arrayLength - 5, 'duża nierówność');
//       identifiedGapsArray.push({id: index + 1 + arrayLength - 5, z: item});
//     }
//   });

//   console.log('nierówności', identifiedGapsArray);
// };

const identifyGapByMaxMin = testedArray => {
  // console.log(testedArray);

  let testedArrayZ = testedArray.map((item, key) => {
    return item.z;
  });
  let a = testedArrayZ[0];
  let b = testedArrayZ[1];
  let diff = 0;
  if (a > b) {
    diff = a - b;
  } else {
    diff = b - a;
  }

  if (diff > 2) console.log('Duża nierówność', a, b);
};

const createRoadGap = callback => {
  const {coords, roadGaps} = useSelector(state => state.coords);

  useEffect(() => {
    let sub = null;

    /////AVG
    //if (accelArray[accelArray.length] > 3) {
    // if (accelArray.length % 5 == 0 && accelArray.length != 0) {
    //   identifyGapByAvg(accelArray.slice(-5), accelArray.length);
    // }
    // }

    /////MaxMin
    // if (accelArray.length % 2 == 0 && accelArray.length != 0) {
    //   identifyGapByMaxMin(accelArray.slice(-2), accelArray.length);
    // }

    // if (
    //   coordsArray.length > 0 &&
    //   accelArray.length > 0 &&
    //   accelArray[accelArray.length - 1].z > 11
    // ) {
    //   sub = handleGapCreation(
    //     coordsArray[coordsArray.length - 1],
    //     accelArray[accelArray.length - 1],
    //   );

    //   callback(sub);
    // }

    // console.log('Nierówność', roadGaps.length, roadGaps);

    return () => {
      sub = null;
    };
  }, [coords, roadGaps]);
};

export default createRoadGap;
