// //Spinner 컴포넌트의 렌더링 여부를 결정

// import React, { useState, createContext } from 'react';

// const ProgressContext = createContext({
//     inProgress: false,
//     spinner: { start: () => {}, stop: () => {} },
// });

// const ProgressProvider = ({ children }) => {
//     const [inProgress, setInProgress] = useState(false);
//     const spinner = {
//         start: () => setInProgress(true),
//         stop: () => setInProgress(false),
//     };
//     const value = { inProgress, spinner };
//     return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
// };

// export { ProgressContext, ProgressProvider };

import { atom } from 'recoil';

const spinnerAtom = atom({
    key: 'spinnerAtom',
    default: false,
});

export { spinnerAtom };
