const email = localStorage.getItem('user');
const userPara = document.getElementById('user');

userPara.innerHTML = `<h4>${email} </h4>`

const logout = () => {
    localStorage.removeItem('user');
    window.location.replace("./register.html");

}