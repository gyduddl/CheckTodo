//**채널 화면 */

import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { createMessage, getCurrentUser, app } from '../firebase';
import { getFirestore, collection, onSnapshot, query, doc, orderBy } from 'firebase/firestore';
import { GiftedChat, Send, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

const SendIcon = styled(MaterialIcons).attrs(({ theme, text }) => ({
    name: 'send',
    size: 24,
    color: text ? theme.sendBtnActive : theme.sendBtnInactive,
}))``;

//전송 버튼 디자인
const SendButton = (props) => {
    return (
        <Send
            {...props}
            containerStyle={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 10,
            }}
            disabled={!props.text} //**text 빈배열일때 disabled */
        >
            <SendIcon text={props.text} />
        </Send>
    );
};

//메세지 디지인
const MessageBox = (theme, props) => {
    return (
        <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: theme.main,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 15,
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    marginBottom: 8,
                    padding: 5,
                },
                left: {
                    borderBottomRightRadius: 15,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    marginBottom: 8,
                    padding: 5,
                },
            }}
        />
    );
};

//메세지 창 디자인
const InputBar = (props) => {
    return (
        <InputToolbar
            {...props}
            containerStyle={{
                marginTop: 2,
                padding: 5,
            }}
        />
    );
};

const Channel = ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);
    //현재 로그인한 유저의 정보
    const { uid, name, photo } = getCurrentUser();
    const theme = useContext(ThemeContext);
    const db = getFirestore(app);

    //헤더 타이틀 변경
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.title || 'Channel',
        });
    });

    //메세지 화면에 렌더링
    useEffect(() => {
        const docRef = doc(db, 'channels', route.params.id);
        const collectionQuery = query(collection(db, `${docRef.path}/messages`), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(collectionQuery, (snapshot) => {
            const list = [];
            snapshot.forEach((doc) => {
                list.push(doc.data());
            });
            setMessages(list);
        });
        return () => unsubscribe();
    }, []);

    //메세지 전달
    const _handleMessageSend = async (messageList) => {
        const message = messageList[0]; //배열로 들어오기 때문에
        try {
            await createMessage({ channelId: route.params.id, message });
        } catch (e) {
            Alert.alert('Message Error', e.message);
        }
    };

    return (
        <Container>
            <GiftedChat
                placeholder='Enter a message ...'
                messages={messages}
                showUserAvatar={true}
                user={{ _id: uid, name, avatar: photo }}
                onSend={_handleMessageSend}
                renderBubble={(props) => MessageBox(theme, props)}
                renderInputToolbar={(props) => InputBar(props)}
                renderSend={(props) => <SendButton {...props} />}
                scrollToBottom={true} //**가장 아래로 이동하는 버튼 */
                renderUsername={() => true} //**유저 이름 표시 */
                alwaysShowSend={true} //**send 버튼이 항상 보이도록 */
                multiline={false} //**textaline에서 여러줄 허용 설정 */
            />
        </Container>
    );
};

export default Channel;
