let akun = JSON.parse(localStorage.getItem("akunRoblox")) || [];

tampilkanAkun();


function tambahAkun() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let gmail = document.getElementById("gmail").value;
    let keterangan = document.getElementById("keterangan").value;


    if(username == "" || password == "") {
        alert("Username dan Password Roblox wajib diisi!");
        return;
    }


    let data = {
        username: username,
        password: password,
        gmail: gmail,
        keterangan: keterangan
    };


    akun.push(data);

    localStorage.setItem("akunRoblox", JSON.stringify(akun));


    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("gmail").value = "";
    document.getElementById("keterangan").value = "";


    tampilkanAkun();
}



function sensorGmail(gmail){

    if(!gmail.includes("@")){
        return gmail;
    }

    let bagian = gmail.split("@");

    let nama = bagian[0];

    if(nama.length <= 2){
        return nama + "*****@" + bagian[1];
    }

    return nama.substring(0,2) + "*****@" + bagian[1];

}



function sensorPassword(){

    return "********";
}



function tampilkanAkun(){

    let list = document.getElementById("listAkun");

    list.innerHTML = "";


    akun.forEach((item,index)=>{


        list.innerHTML += `

        <div class="card">

            <h3>🎮 ${item.username}</h3>

            <div class="info">

            <p>Password : ********</p>

            <p>Gmail : ${sensorGmail(item.gmail)}</p>

            <p>Keterangan : ${item.keterangan}</p>

            </div>


            <div class="action">

            <button class="detail" onclick="detailAkun(${index})">
            Detail
            </button>


            <button class="copy" onclick="copyAkun(${index})">
            Copy
            </button>


            <button class="edit" onclick="editAkun(${index})">
            Edit
            </button>


            <button class="delete" onclick="hapusAkun(${index})">
            Hapus
            </button>

            </div>

        </div>

        `;


    });

}




function detailAkun(index){

    let item = akun[index];


    alert(
`Username : ${item.username}

Password : ${item.password}

Gmail : ${item.gmail}

Keterangan : ${item.keterangan}`
    );

}




function copyAkun(index){

    let item = akun[index];


    navigator.clipboard.writeText(
`Username : ${item.username}
Password : ${item.password}
Gmail : ${item.gmail}`
    );


    alert("Data berhasil dicopy!");

}




function editAkun(index){

    let item = akun[index];


    let username = prompt("Username Roblox:", item.username);
    let password = prompt("Password Roblox:", item.password);
    let gmail = prompt("Gmail:", item.gmail);
    let ket = prompt("Keterangan:", item.keterangan);


    if(username){

        akun[index] = {

            username: username,
            password: password,
            gmail: gmail,
            keterangan: ket

        };


        localStorage.setItem("akunRoblox", JSON.stringify(akun));

        tampilkanAkun();

    }

}




function hapusAkun(index){

    if(confirm("Hapus akun ini?")){

        akun.splice(index,1);

        localStorage.setItem("akunRoblox", JSON.stringify(akun));

        tampilkanAkun();

    }

}
