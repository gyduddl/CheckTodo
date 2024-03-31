// 이메일의 유효성을 검사하는 정규표현식
export const validateEmail = (email) => {
    const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
    return regex.test(email);
};

// 공백을 제거하는 함수
export const removeWhitespace = (text) => {
    const regex = /\s/g;
    return text.replace(regex, '');
};
