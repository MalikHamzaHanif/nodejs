async function loginUser() {
    const name = document.getElementById("name").value;
    const password = document.getElementById("pass").value;



    try {
        const res = await fetch("http://localhost:5000/api/v1/user/login", {
            method: "POST",
            body: JSON.stringify({
                name, password
            }),
            headers: {
                "Content-Type": "application/json; Charset=UTF-8"
            }
        })
        const data = await res.json()
        localStorage.clear()
        localStorage.setItem("token", `Bearer ${data.token}`)

    } catch (e) {
        alert(e)
    }

}

document.getElementById("login-btn").addEventListener("click", loginUser);


async function getData() {
    const token = localStorage.getItem("token")
    try {
        const res = await fetch("http://localhost:5000/api/v1/user/dashboard", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; Charset=UTF-8",
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log(data);
        const div = document.getElementById("random-data")
        div.innerHTML = `${data.name} and your lucky number is : ${data.random}`
    } catch (e) {
        console.log(e);

    }


}



document.getElementById('get-data-btn').addEventListener("click", getData);