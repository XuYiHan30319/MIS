function isLogin() {
    return localStorage.getItem("isLogin") === "true";
}

function isAuthorize(menuName) {
    let menus = JSON.parse(localStorage.getItem("menus")) || [];
    let menu = menus.find(menu => menu.title === menuName);
    let privilege = localStorage.getItem("privilege");
    if (menu.allowUser.includes(privilege)) {
        return true;
    }
    return false;
}

export { isLogin, isAuthorize };