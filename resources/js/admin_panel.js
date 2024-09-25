import Admin from "./Admin";

let ADMIN = null;
document.addEventListener("DOMContentLoaded", () => {
    console.log("admin panel loaded");
    ADMIN = new Admin();
});
