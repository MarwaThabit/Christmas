var logout=document.querySelector('.logout')
logout.addEventListener('click',()=>{
    localStorage.clear()
    setTimeout(() => {
        location.href='login.html'
    }, 2000);
})