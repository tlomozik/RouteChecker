const analyzeAccelerometer = accelArray => {
  let array = accelArray.slice(-3);

  //  console.log(array);
  let avg = 0;
  let sum = 0;
  for (let a = 0; a < 3; a++) {
    sum += array[a];
  }

  avg = sum / 3;
  // console.log('Z analyze:', accelArray.length);
  // console.log(avg);

  return [chooseColor(avg), avg];
};

const chooseColor = accelAvg => {
  if (accelAvg > 7) {
    return 'red';
  }
  if (accelAvg < 3) {
    return 'yellow';
  }
  if (accelAvg > 3 && accelAvg < 7) {
    return 'green';
  }
};

const createPolylines = (counter, coordsArray, accelColor, accelAvg) => {
  let polyline = [
    {
      id: counter,
      color: accelColor,
      tab: coordsArray.slice(-4),
      avg: accelAvg,
    },
  ];

  return polyline;
};

export default combineAccelWithCoords = (counter, coordsArray, accelArray) => {
  const [accelColor, accelAvg] = analyzeAccelerometer(accelArray);
  const createdPolyline = createPolylines(
    counter,
    coordsArray,
    accelColor,
    accelAvg,
  );

  return createdPolyline;
};
