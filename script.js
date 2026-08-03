alert("script.js aktif") ;
let accounts = JSON.parse(localStorage.getItem("robloxAccounts")) || [];


// Tambah akun
function addAccount(){

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let gmail = document.getElementById("gmail").value;


    if(username === "" || password === "" || gmail === ""){
        alert("Semua data wajib diisi!");
        return;
    }


    let data = {
        username: username,
        password: password,
        gmail: gmail
    };


    accounts.push(data);


    localStorage.setItem(
        "robloxAccounts",
        JSON.stringify(accounts)
    );


    alert("Akun berhasil ditambahkan");


    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("gmail").value = "";


    renderAccounts();

}



// Sensor Gmail
function sensorGmail(gmail){

    return gmail.substring(0,3) + "***";
}



// Menampilkan akun
function renderAccounts(){

    let list = document.getElementById("accountList");

    list.innerHTML = "";


    accounts.forEach((acc,index)=>{


        list.innerHTML += `

        <div class="card">

            <h3>${acc.username}</h3>

            <p>
            Gmail: ${sensorGmail(acc.gmail)}
            </p>


            <button class="detail"
            onclick="detailAccount(${index})">
            Detail
            </button>


            <button class="edit"
            onclick="editAccount(${index})">
            Edit
            </button>


            <button class="delete"
            onclick="deleteAccount(${index})">
            Hapus
            </button>


        </div>

        `;


    });


}



// Detail akun
function detailAccount(index){

    let acc = accounts[index];


    alert(
`Username : ${acc.username}

Password : ${acc.password}

Gmail : ${acc.gmail}`
    );

}



// Edit akun
function editAccount(index){

    let acc = accounts[index];


    let username = prompt(
        "Username baru:",
        acc.username
    );


    let password = prompt(
        "Password baru:",
        acc.password
    );


    let gmail = prompt(
        "Gmail baru:",
        acc.gmail
    );


    if(username && password && gmail){

        accounts[index] = {
            username,
            password,
            gmail
        };


        localStorage.setItem(
            "robloxAccounts",
            JSON.stringify(accounts)
        );


        renderAccounts();

    }

}



// Hapus akun
function deleteAccount(index){


    let yakin = confirm(
        "Hapus akun ini?"
    );


    if(yakin){

        accounts.splice(index,1);


        localStorage.setItem(
            "robloxAccounts",
            JSON.stringify(accounts)
        );


        renderAccounts();

    }

}



// Jalankan saat website dibuka
renderAccounts();
