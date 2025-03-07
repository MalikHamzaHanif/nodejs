const all_users = document.getElementById("all-users");


async function getUsers() {
    all_users.innerHTML="";
    try {
        const res = await fetch("http://localhost:5000/api/v1/user")
        console.log("here");
        const data = await res.json();
        console.log("here");
        console.log(data);
        const dbUser=data["data"]
        if (dbUser.length > 0) {
        for(let i of dbUser){

            const liOne=document.createElement("li")
            const liTwo=document.createElement("li")
            const div=document.createElement("div")
            const btn=document.createElement("button")
            btn.classList.add("my-click-btn");
            div.classList.add("ind-user")
            liOne.innerHTML=i.id;
            liTwo.innerHTML=i.name;
            btn.innerHTML="Edit/Delete"
            btn.onclick=()=>{
                window.location.href = `singleuser.html?id=${i.id}`;
            }
            div.appendChild(liOne)
            div.appendChild(liTwo)
            div.appendChild(btn)
            all_users.appendChild(div)
        }

        } else {

            all_users.innerHTML = "No user found in the database"
        }
    } catch (e) {
        all_users.innerHTML = "Something went wrong while fetching users"
        console.log(e);

    }

}

getUsers()