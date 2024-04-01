import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import config from '../firebase.json';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

const app = initializeApp(config);

const auth = getAuth(app);

export const signin = async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
};

// 기기에서 선택된 사진을 Storage로 업로드하는 함수
const uploadImage = async (uri) => {
    if (uri.startsWith('https')) {
        return uri;
    }

    const response = await fetch(uri);
    const blob = await response.blob();

    const { uid } = auth.currentUser;
    const storage = getStorage(app);
    const storageRef = ref(storage, `/profile/${uid}/photo.png`);
    await uploadBytes(storageRef, blob, { contentType: 'image/png' });

    return await getDownloadURL(storageRef);
};

//signup 함수를 만들면서 업로드 이미지를 이용해서 유저의 정보를 수정
export const signup = async ({ name, email, password, photo }) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const photoURL = await uploadImage(photo);
    await updateProfile(auth.currentUser, { displayName: name, photoURL });
    return user;
};

// 로그인한 사람의 정보를 받아오는 함수
export const getCurrentUser = () => {
    const { uid, displayName, email, photoURL } = auth.currentUser;
    return { uid, name: displayName, email, photo: photoURL };
};

//profile 화면에서 Image update 함수
export const updateUserInfo = async (photo) => {
    const photoURL = await uploadImage(photo);
    await updateProfile(auth.currentUser, { photoURL });
    return photoURL;
};

export const signout = async () => {
    await signOut(auth);
    return {};
};

//채널을 생성하는 함수
const db = getFirestore(app);

export const createChannel = async ({ title, desc }) => {
    const channelCollection = collection(db, 'channels');
    const newChannelRef = doc(channelCollection);
    const id = newChannelRef.id;
    const newChannel = {
        id,
        title,
        description: desc,
        createdAt: Date.now(),
    };
    await setDoc(newChannelRef, newChannel);
    return id;
};

//메세지 생성하는 함수
export const createMessage = async ({ channelId, message }) => {
    const docRef = doc(db, `channels/${channelId}/messages`, message._id);
    await setDoc(docRef, { ...message, createdAt: Date.now() });
};
