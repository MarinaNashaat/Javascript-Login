//sign in variables
var emailSignInInput = document.getElementById("emailSignInInput");
var passwordSignInInput = document.getElementById("passwordSignInInput");
var signInBtn = document.getElementById("signInBtn");
//sign up variables
var signUpBtn = document.getElementById("signUpBtn");
var nameSignUpInput = document.getElementById("nameSignUpInput");
var emailSignUpInput = document.getElementById("emailSignUpInput");
var passwordSignUpInput = document.getElementById("passwordSignUpInput");

// home page welcome msg
var homeName = document.getElementById("userName");
if (homeName != null) {
    var username = JSON.parse(localStorage.getItem("usersNameList"));
    if (username != "") {
        homeName.innerHTML = "Welcome " + username;
    }
}


//array of data
var usersList;
if (localStorage.getItem("usersInfoList") != null) {
    usersList = JSON.parse(localStorage.getItem("usersInfoList"));
}
else {
    usersList = [];
}

function signup() {
    if (checkInput() && checkExistance() && validName() && validEmail()) {
        var userInfo = {
            userName: nameSignUpInput.value,
            userEmail: emailSignUpInput.value,
            password: passwordSignUpInput.value
        }
        usersList.push(userInfo);
        localStorage.setItem("usersInfoList", JSON.stringify(usersList));
        document.getElementById("alert").style.display = "block";
        document.getElementById("alert").innerHTML = "success";
        document.getElementById("alert").classList.replace("text-danger", "text-success")

        clearForm()

    }
}

function checkInput() {
    if (nameSignUpInput.value == "" && emailSignUpInput.value == "" && passwordSignUpInput.value == "") {
        document.getElementById("alert").style.display = "block";

        return false;
    }
    else {
        document.getElementById("alert").style.display = "none";
        return true
    }
}
function checkExistance() {
    if (usersList == []) {
        return true
    }
    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].userEmail.toLowerCase() == emailSignUpInput.value.toLowerCase()) {
            document.getElementById("alert").style.display = "block";
            document.getElementById("alert").innerHTML = "email already exists";
            document.getElementById("alert").classList.replace("text-success", "text-danger")
            return false;
        }
    }
    document.getElementById("alert").style.display = "none";
    return true
}
function validEmail() {
    var regexEmail = /^\S+@\S+\.\S+$/;
    if (regexEmail.test(emailSignUpInput.value)) {
        document.getElementById("emailAlert").style.display = "none";
        return true;
    }
    else {
        document.getElementById("emailAlert").style.display = "block";
        return false;
    }

}
function validName() {
    var regexName = /^\S+$/;
    if (regexName.test(nameSignUpInput.value)) {
        document.getElementById("nameAlert").style.display = "none";
        return true;
    }
    else {
        document.getElementById("nameAlert").style.display = "block";
        return false;
    }

}

function clearForm() {
    nameSignUpInput.value = "";
    emailSignUpInput.value = "";
    passwordSignUpInput.value = "";
}
if (signUpBtn!=null) {
    signUpBtn.addEventListener("click", signup);
}


function searchForLogIn() {
    if (emailSignInInput.value == "" && passwordSignInInput.value == "") {
        document.getElementById("logInAlert").style.display = "block";
        document.getElementById("logInAlert").innerHTML = "All inputs are required";

        return false;
    }
    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].userEmail.toLowerCase() == emailSignInInput.value.toLowerCase()
            && passwordSignInInput.value.toLowerCase() == usersList[i].password.toLowerCase()) {
            document.getElementById("logInAlert").style.display = "none";
            localStorage.setItem("usersNameList", JSON.stringify(usersList[i].userName));
            return true;
        }
    }


    document.getElementById("logInAlert").style.display = "block";
    return false;
}

function signIn() {
    if (searchForLogIn()) {

        document.getElementById("signInBtn").setAttribute("href", "home.html");


        //   window.location.href = "home.html"
    }
}
if (signInBtn) {
    signInBtn.addEventListener("click", signIn);
}

function logOut() {
    localStorage.removeItem("usersNameList");
}



