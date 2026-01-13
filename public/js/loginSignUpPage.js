

const login = document.getElementById("login")
const signUp = document.getElementById("signUp")

const loginPage = document.getElementById("loginPage")
const signUpPage = document.getElementById("signUpPage")

login.addEventListener("click", () => {
    loginPage.style.display = "initial"
    signUpPage.style.display = "none"
})

signUp.addEventListener("click", () => {
    signUpPage.style.display = "initial"
    loginPage.style.display = "none"
})

const button1 = document.querySelector("button1")
button1.addEventListener("click", async (e) => {
    e.preventDefault()

})

const button2 = document.querySelector("button2")
button2.addEventListener("click", async (e) => {
    e.preventDefault()

})


