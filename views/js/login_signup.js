const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signUpButtonClicked = document.getElementById('index-signup-button');
const signInButtonClicked = document.getElementById('index-signin-button');
const container = document.getElementById('container');

//create function for signout
async function requestSignout(){
    var url = "http://localhost:5000/api/signout";
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }
    });
    const users = await response.json();
    console.log(users);
    if (response.status == 200 || response.status == 201) {
        console.table(users);
        //openStackOverflow();
        window.location.href = "/";
    } else {
        console.error(users);
    }
}


async function requestSignin(email, password){
    var url = "http://localhost:5000/api/signin";
    var data = {
        "email": email,
        "password": password
    };
    var json = JSON.stringify(data);
    console.log(json);
    const response = await fetch(url, {
        method: 'POST',
        body: json,
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }
    });
    const users = await response.json();
    console.log(users);
    if (response.status == 200 || response.status == 201) {
        console.table(users);
        //openStackOverflow();
        window.location.href = "/homepage";
    } else {
        console.error(users);
    }
}

//create function to request signup
async function requestSignup(email, password, firstName, lastName){
    var url = "http://localhost:5000/api/signup";
    var data = {
        "email": email,
        "password": password,
        "firstName": firstName,
        "lastName": lastName
    };
    var json = JSON.stringify(data);
    console.log(json);
    const response = await fetch(url, {
        method: 'POST',
        body: json,
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }
    });
    const users = await response.json();
    console.log(users);
    if (response.status == 201 || response.status == 200) {
        console.table(users);
        //openStackOverflow();
        window.location.href = "/homepage";
    } else {
        console.error(users);
    }
}


signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    console.log("sign in button clicked");
	container.classList.remove("right-panel-active");
});

signUpButtonClicked.addEventListener('click', (e) => {
    e.preventDefault();
    
    var email = document.getElementById("index-signup-email").value;
    var password = document.getElementById("index-signup-password").value;
    var firstName = document.getElementById("index-signup-firstname").value;
    var lastName = document.getElementById("index-signup-lastname").value;

    requestSignup(email, password, firstName, lastName);
});

signInButtonClicked.addEventListener('click', (e) => {
    e.preventDefault();

    var email = document.getElementById("index-signin-email").value;
    var password = document.getElementById("index-signin-password").value;

    requestSignin(email, password);

});