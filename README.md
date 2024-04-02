<div align="center">
  
## ✔️ 프로젝트명
<img  src="https://github.com/gyduddl/CheckTodo/assets/104330521/380e5b40-e9b4-49d7-a4dd-0cfe2f89f8c5" width="300" height="300"/>
<h3>CheckTodo</h3>
</div>

<br>

## ✨ 소개
실시간 채팅과 TodoList가 겸비된 앱 플랫폼입니다. 실시간으로 다른 사용자와 채팅을 할 수 있으며, TodoList를 작성할 수 있는 기능을 가졌습니다.

<br>

## 🖥️ 시연 영상



💡 누르면 유튜브로 연결됩니다!

[![시연 영상 바로가기](https://github.com/gyduddl/CheckTodo/assets/104330521/93dd9cb1-cdc7-4e1a-9bdc-e1cfa083be17)](https://www.youtube.com/watch?v=TEFs-hkH25A)

https://www.youtube.com/watch?v=TEFs-hkH25A
<br>

## 📦 사용 스택
### Front-end
<div>
  <img src="https://img.shields.io/badge/reacnative-003E54.svg?style=for-the-badge&logo=react&logoColor=61DAFB" />&nbsp
<img src="https://img.shields.io/badge/react-20232a.svg?style=for-the-badge&logo=react&logoColor=61DAFB" />&nbsp
<img src="https://img.shields.io/badge/reactnavigatiom-9999FF.svg?style=for-the-badge&logo=reactnavigation&logoColor=61DAFB" />&nbsp
<img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=ffd35b" />&nbsp
<img src="https://img.shields.io/badge/expo-DAA449?style=for-the-badge&logo=expo&logoColor=000020" />&nbsp
</div>

### Back-end

<img src="https://img.shields.io/badge/firebase-AB2B28?style=for-the-badge&logo=firebase&logoColor=ffd35b" />

<br>


## 📝 각 페이지 구현 방법
+ React Navigation에서 Stack Navigation과 Tab Navigation을 활용한 화면 관리

<br>

### 로그인 화면
![image](https://github.com/gyduddl/CheckTodo/assets/104330521/f1a84277-318e-4670-8cc2-5f5e65e25086)

<br>

+ firebase Authenticaion를 사용하여 로그인, 회원가입 구현 및 인증 화면 구현 (링크)
+ Expo ImagePicker를 활용하여 기기 사진 접근 및 firebase Storage에 저장 (링크)
+ react-native-keyboard-aware-scroll-view라이브러리에서 제공하는 keyboard-aware-scrollview를 이용하여 키보드가 input 창 가리는 이슈 해결 (링크)
+ 로그인 통신 시 사용자가 다른 행동을 못하도록 Spinner 컴포넌트 구현 (링크)

<br>


### Channel 화면
![image](https://github.com/gyduddl/CheckTodo/assets/104330521/2bfabfe2-b2d6-4e44-ade9-4da657d0c1ca)

<br>

+ 데이터 리스트 렌더링시 FlatList 컴포넌트를 활용하여 스크롤 형태로 데이터 렌더링 및 React.memo를 활용하여 불필요한 데이터 리렌더링을 줄여 성능 최적화 진행 (링크)
+ Gifted Chat 라이브러리를 활용하여 Cloud Firestore와 연동하여 채팅 앱 구현 (링크)

<br>

### Todo 화면
![image](https://github.com/gyduddl/CheckTodo/assets/104330521/8bd60d8d-38fa-4f05-8610-6fab8dedcc5a)

<br>

+ 새로고침 시 데이터가 reset되는 것을 방지하기 위해 AsyncStorage를 이용해 로컬에 데이터를 저장 (링크)


<br>

## 💻 개발 블로그

React Native를 공부하면서 프로젝트를 진행했고 블로그에 기록해두었습니다.

[https://velog.io/@st4889/series/React-Native-TIL](url)


<br>


## 🛠️ 라이브러리
React Navigation : https://reactnavigation.org/

expo-image-picker : https://docs.expo.io/versions/latest/sdk/imagepicker/

expo/vector-icon : https://docs.expo.io/guides/icons/

firebase : https://docs.expo.io/guides/using-firebase/

react-native-keyboard-aware-scroll-view : https://github.com/APSL/react-native-keyboard-aware-scroll-view

moment : https://momentjs.com/

react-native-gifted-chat : https://github.com/FaridSafi/react-native-gifted-chat

prop-types : https://github.com/facebook/prop-types

styled-components : https://styled-components.com/

async-storage (AsyncStorage) :

- https://docs.expo.io/versions/v40.0.0/sdk/async-storage/

- https://react-native-async-storage.github.io/async-storage/docs/install/

expo-app-loading (AppLoading) : https://docs.expo.io/versions/v40.0.0/sdk/app-loading/
