//**채널 목록 화면 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { app } from '../firebase';
import { getFirestore, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import moment from 'moment';

//날짜,시간을 반환하는 함수
const getDateOrTime = (ts) => {
    const now = moment().startOf('day');
    const target = moment(ts).startOf('day');
    //현재 시간과 전달된 시간을 이용해 날짜가 다르면 월일, 같으면 시분 출력
    return moment(ts).format(now.diff(target, 'day') > 0 ? 'MM/DD' : 'HH:mm');
};

const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.itemBorder};
    padding: 15px 20px;
`;

const ItemTextContainer = styled.View`
    flex: 1;
    flex-direction: column;
`;

const ItemTitle = styled.Text`
    font-size: 20px;
    margin-top: 5px;
    color: ${({ theme }) => theme.text2};
`;

const ItemDesc = styled.Text`
    font-size: 16px;
    margin-top: 5px;
    color: ${({ theme }) => theme.itemDesc};
`;

const ItemTime = styled.Text`
    font-size: 12px;
    color: ${({ theme }) => theme.itemTime};
`;

const ItemIcon = styled(MaterialIcons).attrs(({ theme }) => ({
    name: 'keyboard-arrow-right',
    size: 24,
    color: theme.ItemIcon,
}))``;

const Item = React.memo(({ item: { id, title, description, createdAt }, onPress }) => {
    return (
        <ItemContainer onPress={() => onPress({ id, title })}>
            <ItemTextContainer>
                <ItemTitle>{title}</ItemTitle>
                <ItemDesc>{description}</ItemDesc>
            </ItemTextContainer>
            <ItemTime>{getDateOrTime(createdAt)}</ItemTime>
            <ItemIcon />
        </ItemContainer>
    );
});

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

const ChannelList = ({ navigation }) => {
    const [channels, setChannels] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
        const collectionQuery = query(collection(db, 'channels'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(collectionQuery, (snapshot) => {
            const list = [];
            snapshot.forEach((doc) => {
                list.push(doc.data());
            });
            setChannels(list);
        });
        return () => unsubscribe();
    }, []);

    return (
        <Container>
            <FlatList
                // 렌더링할 데이터를 갖고 있는 배열을 data에 전달
                data={channels}
                //항목을 렌더링하기 위해 컴포넌트를 반환하는 함수 전달
                renderItem={({ item }) => (
                    <Item item={item} onPress={(params) => navigation.navigate('Channel', params)} />
                )}
                //키 지정.keyExtractor은 함수로 전달해야 함
                keyExtractor={(item) => item['id'].toString()}
                windowSize={5}
            />
        </Container>
    );
};

export default ChannelList;
