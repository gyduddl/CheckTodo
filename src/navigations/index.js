import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import Auth from './Auth';
import { UserContext, ProgressContext } from '../contexts';
import Main from './Main';
/**어떤 화면이든 가리도록 navigations의 index.js에서 스피너 컴포넌트 사용 */
import { Spinner } from '../components';

const Navigation = () => {
    const { user } = useContext(UserContext);
    const { inProgress } = useContext(ProgressContext);

    return (
        <NavigationContainer>
            {/* user의 정보에 따라 특정 내비게이션이 렌더링 되도록 수정 */}
            {user.uid ? <Main /> : <Auth />}
            {inProgress && <Spinner />}
        </NavigationContainer>
    );
};

export default Navigation;
