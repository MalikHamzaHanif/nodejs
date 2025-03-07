const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const username = document.getElementById("user-name-info").lastElementChild
const userid = document.getElementById("user-id-info").lastElementChild
const form = document.getElementsByTagName("form")[0]
const formSubmitButton = document.getElementsByTagName("form")[0].lastElementChild
const delete_btn = document.getElementById("delete-btn")


function fetchData() {

    fetch(`http://localhost:5000/api/v1/user/${id}`).
        then((data) => data.json()).
        then((data) => {
            if (Object.keys(data["data"]).length > 0) {
                username.innerHTML = data["data"].name
                userid.innerHTML = data["data"].id

            } else {
                username.innerHTML = "No User Found"
                userid.innerHTML = "No Id Found"
            }
        }).
        catch((e) => {
            console.log(e)
        }
        );
}



form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = document.getElementById('username').value
    if (!userName) {
        alert("Name can not be empty")
    } else {
        fetch(`http://localhost:5000/api/v1/user/${id}`, {
            body: JSON.stringify({
                name: userName,

            }),
            headers: {

                "Content-Type": "application/json",
            },
            method: "PUT"
        }).then((data) => {
            fetchData()
        }).catch((e) => {
            console.log(e);
        })
    }
})

delete_btn.onclick = () => {
    console.log("i am clicked");

    fetch(`http://localhost:5000/api/v1/user/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((data) => {
        console.log(data);
        window.location.href = "index.html"
    }).catch(e => console.log(e)
    )
}
console.log(delete_btn);



fetchData()