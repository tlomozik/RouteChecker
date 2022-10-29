import {collection, addDoc} from 'firebase/firestore';
import {db} from '../firebase/firebase';

export default () => {
  const addTrack = async (array, trackName) => {
    const coordsArray = array.map(({latitude, longitude}) => ({
      latitude: latitude,
      longitude: longitude,
    }));

    try {
      subscriber = await addDoc(collection(db, 'tracks'), {
        name: trackName,
        coordsArray,
      });
      console.log('Document written with ID: ', subscriber.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return [addTrack];
};
