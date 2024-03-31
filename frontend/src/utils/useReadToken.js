const readToken = () => {
    const user = JSON.parse(localStorage.getItem('userToken'));
    return user;
};

export default readToken;