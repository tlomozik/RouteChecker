function handleColor() {
  return (
    'rgb(' +
    Math.round(Math.random() * 255) +
    ',' +
    Math.round(Math.random() * 255) +
    ',' +
    Math.round(Math.random() * 255) +
    ')'
  );
}

export default coordsArray => {
  // const array = coordsArray.map((item, index) => {
  //   return {latitude: item.latitude, longitude: item.longitude};
  // });
  let polylinesTab = [];

  for (let index = 0; index <= coordsArray.length; index++) {
    // if (index % 3 == 0) {
    //   console.log(index);
    polylinesTab.push({
      id: index,
      color: item => {
        if (item % 3 == 0) return 'red';
        else return 'yellow';
      },
      tab: coordsArray.splice(0, 3),
    });

    //}
  }

  return [polylinesTab];
};
