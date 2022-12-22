import {arrayUnion, doc, setDoc, updateDoc} from 'firebase/firestore';
import {db} from '../../firebase/firebase';

export default () => {
  const addRoadGaps = async roadGapsArray => {
    try {
      // subscriber = await setDoc(
      //   doc(db, 'roadGaps', 'LktUXssoLA9QiKU9Uc2y'),
      //   {
      //     roadGapsArray,
      //   },
      //   {merge: false},
      // );
      // //    console.log('Document written with ID: ', subscriber.id);

      console.log(Object.assign({}, roadGapsArray));

      const roadGapRef = doc(db, 'roadGaps', 'array');
      setDoc(roadGapRef, Object.assign({}, roadGapsArray), {merge: true});
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return [addRoadGaps];
};
