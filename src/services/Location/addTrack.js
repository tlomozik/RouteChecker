import {collection, addDoc} from 'firebase/firestore';
import {db} from '../../firebase/firebase';

export default () => {
  const addTrack = async (
    receivedCoordsArray,
    recievedAccelArray,
    trackName,
  ) => {
    const coordsArray = receivedCoordsArray.map(({latitude, longitude}) => ({
      latitude: latitude,
      longitude: longitude,
    }));

    try {
      let subscriber = await addDoc(collection(db, 'tracks'), {
        name: trackName,
        coordsArray,
        accelArray: recievedAccelArray,
      });
      console.log('Document written with ID: ', subscriber.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return [addTrack];
};
