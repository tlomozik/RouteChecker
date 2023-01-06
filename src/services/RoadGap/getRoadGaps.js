import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../firebase/firebase';
export default async () => {
  let roadGaps = null;
  try {
    const docRef = doc(db, 'roadGaps', 'gaps');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      roadGaps = docSnap.data();
      //   console.log(roadGaps);
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  } catch (error) {
    console.log(error);
  }

  return [roadGaps];
};
