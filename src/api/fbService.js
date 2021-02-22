import firebase from 'firebase/app';
import 'firebase/database';

import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);
class FbService {
    constructor() {
    }

    getAllPosts = async () => {
        const res = await firebase.database().ref('posts').get();
        return res.val();
    }
}

const fbService = new FbService;
export default fbService;