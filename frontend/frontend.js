const username = document.getElementById('username');
const password = document.getElementById('password');
const submit = document.getElementById('submit');

submit.addEventListener("click", (e) => {
    e.preventDefault()
    signup(password, username);
})

async function signup(password, username) {
    const backend = await fetch("http://localhost:5000/api/v1/register", {
        method: "POST",
        mode: "cors", 
        body: JSON.stringify({
            username: username.value,
            password: password.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
})
    const response = await backend.json();
    console.log(response);
    if (response.success) {
        window.location.href = "http://localhost:3000/login";
    } else {
        console.log("Something went wrong")
    }
}