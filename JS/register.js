var fname=document.querySelector("#fname"),
    lname=document.querySelector("#lname"),
    email=document.querySelector("#Email"),
    password=document.querySelector("#Password"),
    regBtn=document.querySelector("#regBtn")

regBtn.addEventListener('click',function(event){
    event.preventDefault()
    if(fname.value==''||lname.value==''||email.value==''||password.value=='')
        alert('Please fill all the fields')
    else{
        localStorage.setItem("fname", fname.value.trim());
        localStorage.setItem("lname", lname.value.trim());
        localStorage.setItem("email", email.value.trim());
        localStorage.setItem("password", password.value.trim());
        setTimeout(() => {
            location.href='login.html'
        }, 300);
    }
})
