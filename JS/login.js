var Email = document.querySelector("#EmailFromLogin"),
    Password = document.querySelector("#PasswordFromLogin"),
    logBtn = document.querySelector("#logBtn");

logBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (localStorage.getItem("email") &&localStorage.getItem("email").toLowerCase() ===Email.value.trim().toLowerCase() &&localStorage.getItem("password") &&localStorage.getItem("password") === Password.value.trim() ) {
        localStorage.setItem("logged",'true')
    setTimeout(() => {
        location.href = "index.html";
    }, 300);
    } else alert("Wrong password or email address");
});
