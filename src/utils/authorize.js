function isLogin() {
    return localStorage.getItem("isLogin") === "true";
}

function isAuthorize() {
    console.log(localStorage.getItem("privilege"))
    return localStorage.getItem("privilege") === "管理员";
}

export { isLogin, isAuthorize };