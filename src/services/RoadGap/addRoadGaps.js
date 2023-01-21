import {setDoc, doc, updateDoc, arrayUnion} from 'firebase/firestore';
import {db} from '../../firebase/firebase';

export default () => {
  const addRoadGaps = async roadGapsArray => {
    const array = roadGapsArray.map((item, index) => {
      return {
        latitude: item.coords.latitude,
        longitude: item.coords.longitude,
        z: item.accelRecord.z,
        timestamp: item.accelRecord.timestamp,
        id: item.accelRecord.id,
      };
    });

    console.log(array);
    const documentRef = doc(db, 'roadGaps', 'gaps');

    await updateDoc(documentRef, {
      gaps: arrayUnion(...array),
    })
      .then(() => {
        console.log('Updated/merged!');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return [addRoadGaps];
};
