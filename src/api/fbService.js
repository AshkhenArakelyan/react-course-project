import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig';

import postMockup from 'data-mockup/postMockup'

class FbService {
    constructor() {
        if(firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    initializePosts = () => {
        firebase.database()
        .ref('posts')
        .set(postMockup)
    }

    getAllPosts = async () => {
        const res = await firebase.database().ref('posts').get();
        const data = res.toJSON();
        return Object.values(data);
    }
    getPosts = async (startAt = 0, endAt = 3) => {
        const res = await firebase.database()
        .ref('posts')
        .orderByKey()
        .startAt(startAt.toString())
        .endAt(endAt.toString())
        .get();
        const data = res.toJSON();
        // console.log(data);
        return Object.values(data);
    }
    getPost = async (id) => {
        const res = await firebase.database()
        .ref(`posts/${id}`)
        .get()
        return res.val()
    }

    updatePost = async (data) => {
        const postRef = await firebase.database().ref(`posts/${data.id}`);
        postRef.update(data);
        const res = await postRef.get();
        return res.val();
    }
    removePost = async (id) => {
        const postRef = await firebase.database().ref(`posts/${id}`);
        postRef.remove();
        
        const posts = await this.getAllPosts();
        const newPosts = posts.map((el, idx) => {
            return {
                ...el,
                id: idx
            }
        })
        await firebase.database().ref('posts')
        .set(newPosts);
        return newPosts;
        
    }
    createPost = async (data) => {
        const res = await firebase.database()
        .ref('posts')
        .orderByKey()
        .limitToLast(1)
        .get();
        const lastItemJson = res.toJSON();
        const lastItem  = Object.values(lastItemJson)[0];
        const { id } = lastItem;

        const newItem = {
            ...data,
            id: id + 1
        }
        await firebase.database()
        .ref(`posts/${id + 1}`)
        .set(newItem);

        console.log(lastItem);
        return newItem;
    }
    fromResToUser = (res) => {
        const {uid, email, displayName, photoURL} = res.user;
        return {uid, email, displayName, photoURL};
    }
    login = async (credentials) => {
        const res = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
        return this.fromResToUser(res);
        
    }
    signup = async (credentials) => {
        const res = await firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password);
        const user = firebase.auth().currentUser;
        await user.updateProfile({
            displayName: credentials.name,
        })
        console.log(res)
        return this.fromResToUser(res);
    }
    logout = async () => {
        await firebase.auth().signOut()
    }
}

const fbService = new FbService;
export default fbService;