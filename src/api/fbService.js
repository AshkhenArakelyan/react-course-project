import firebase from 'firebase/app';
import 'firebase/database';

import firebaseConfig from './firebaseConfig';

class FbService {
    constructor() {
        firebase.initializeApp(firebaseConfig);
    }

    getAllPosts = async () => {
        const res = await firebase.database().ref('posts').get();
        return res.val();
    }
}

const fbService = new FbService;
export default fbService;