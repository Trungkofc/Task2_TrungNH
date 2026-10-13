const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");
const errorMessage = document.getElementById("errorMessage");

document.getElementById("togglePassword").onclick = function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        this.textContent = "Show";
    }
};

const rememberedEmail = localStorage.getItem("rememberedEmail");

if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberMe.checked = true;
}

loginForm.onsubmit = function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    let validLogin = email === "java03@gmail.com" && password === "123456";

    if (registeredUser && email === registeredUser.email && password === registeredUser.password) {
        validLogin = true;
    }

    if (!validLogin) {
        errorMessage.textContent = "Invalid email or password.";
        return;
    }

    localStorage.setItem("isLoggedIn", "true");

    if (rememberMe.checked) {
        localStorage.setItem("rememberedEmail", email);
    } else {
        localStorage.removeItem("rememberedEmail");
    }

    alert("Login successful!");
    window.location.href = "home.html";
};

const signupModal = document.getElementById("signupModalBackdrop");
const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

document.getElementById("createAccount").onclick = function (event) {
    event.preventDefault();
    signupModal.classList.add("show");
};

document.getElementById("signupCloseX").onclick = closeSignup;
document.getElementById("signupCancelButton").onclick = closeSignup;

function closeSignup() {
    signupModal.classList.remove("show");
    signupForm.reset();
    signupMessage.textContent = "";
    signupMessage.className = "form-message";
}

signupForm.onsubmit = function (event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;

    if (!name || !email || !password || !confirmPassword) {
        signupMessage.textContent = "Please fill in all fields.";
        signupMessage.className = "form-message error";
        return;
    }

    if (password.length < 6) {
        signupMessage.textContent = "Password must contain at least 6 characters.";
        signupMessage.className = "form-message error";
        return;
    }

    if (password !== confirmPassword) {
        signupMessage.textContent = "Passwords do not match.";
        signupMessage.className = "form-message error";
        return;
    }

    const user = { name, email, password };
    localStorage.setItem("registeredUser", JSON.stringify(user));

    signupMessage.textContent = "Account created successfully!";
    signupMessage.className = "form-message success";
    emailInput.value = email;

    setTimeout(closeSignup, 1000);
};