import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import Auth from './Auth';
import Main from './Main';
/**어떤 화면이든 가리도록 navigations의 index.js에서 스피너 컴포넌트 사용 */
import { Spinner } from '../components';
import { useRecoilState } from 'recoil';
import { spinnerAtom } from '../contexts/Progress';
import { userAtom } from '../contexts/User';

const Navigation = () => {
    const [inProgress] = useRecoilState(spinnerAtom);
    const [userState, setUserState] = useRecoilState(userAtom);

    return (
        <NavigationContainer>
            {/* user의 정보에 따라 특정 내비게이션이 렌더링 되도록 수정 */}
            {userState.uid ? <Main /> : <Auth />}
            {inProgress && <Spinner />}
        </NavigationContainer>
    );
};

export default Navigation;
