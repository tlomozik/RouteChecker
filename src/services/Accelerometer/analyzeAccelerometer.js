export default analyzeAccelerometer = accelArray => {
  let counter = 0;
  // const [arrayToSum, setArrayToSum] = useState([{id: 0}, {record: null}]);

  function calculateSum(arrayToSum) {
    console.log(arrayToSum, 'z sumy');
  }

  accelArray.map((record, index) => {
    if (index % 10 == 0 && index != 0) {
      console.log('Przekroczono 10 pomiarów');
      counter = 0;
      // accelArray = [];
    }
    counter++;
    if (record > 10.0) {
      console.log(counter, ' ', record, ' większa niż 10');
    } else console.log(counter, record, ' nie jest wyższa od 10');
  });
  console.log('Wielkość tablicy', accelArray.length);
};
