// 로그인 혹은 회원가입을 통해 인증을 받으면 해당 정보를 저장하고 그 값에 따라
// 상황에 맞는 네비게이션이 나오도록 만들기로...

// import React, { useState, createContext } from 'react';

// const UserContext = createContext({
//     user: { uid: null },
//     setUser: () => {},
// });

// const UserProvider = ({ children }) => {
//     const [user, setUserInfo] = useState({});
//     const setUser = ({ uid }) => {
//         console.log({ uid });
//         setUserInfo({ uid });
//     };
//     const value = { user, setUser };
//     return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };

// export { UserContext, UserProvider };

import { atom } from 'recoil';

const userAtom = atom({
    key: 'userAtom',
    default: { uid: null },
});

export { userAtom };
