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
    //전달된 URI가 HTTPS로 시작하면 업로드 할 필요가 없다.
    if (uri.startsWith('https')) {
        return uri;
    }

    const response = await fetch(uri);
    const blob = await response.blob();

    //auth에 있는 currentUser라는 프로퍼티는 현재 로그인만 사용자의 유저정보를 갖고 있다.
    const { uid } = auth.currentUser;
    const storage = getStorage(app);
    const storageRef = ref(storage, `/profile/${uid}/photo.png`); //저장경로
    await uploadBytes(storageRef, blob, { contentType: 'image/png' });

    //작업이 완료되었을 시 저장된 이미지의 url 반환
    return await getDownloadURL(storageRef);
};

//signup 함수를 만들면서 업로드 이미지를 이용해서 유저의 정보를 수정
export const signup = async ({ name, email, password, photo }) => {
    // 먼저 유저를 생성하고 업로드 이미지 함수를 이용해서 사용자의 프로필 이미지 URL을 받아온다.
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    //생성된 유저의 업데이트 프로파일 함수를 이용해서 디스플레이 네임과 포토 URL을 수정
    const photoURL = await uploadImage(photo);
    await updateProfile(auth.currentUser, { displayName: name, photoURL });
    // 생성된 유저 반환
    return user;
};
