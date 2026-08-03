// =============================
// Roblox Account Manager
// Bagian 1
// =============================

let accounts = JSON.parse(localStorage.getItem("robloxAccounts")) || [];
let editIndex = -1;
let detailIndex = -1;

const modal = document.getElementById("modal");
const detailModal = document.getElementById("detailModal");

function saveData() {
    localStorage.setItem("robloxAccounts", JSON.stringify(accounts));
}

function updateTotal() {
    document.getElementById("totalAccount").textContent = accounts.length;
}

function maskEmail(email) {
    const parts = email.split("@");
    if (parts.length !== 2) return email;

    const name = parts[0];
    const domain = parts[1];

    if (name.length <= 3) {
        return name + "***@" + domain;
    }

    return name.substring(0, 3) +
        "*".repeat(name.length - 3) +
        "@" + domain;
}

function openModal() {
    modal.style.display = "flex";
}

function closeModal() {

    modal.style.display = "none";

    document.getElementById("username").value = "";
    document.getElementById("gmail").value = "";
    document.getElementById("password").value = "";

    editIndex = -1;
}

function togglePassword() {

    const input = document.getElementById("password");
    const eye = document.getElementById("eye");

    if (input.type === "password") {
        input.type = "text";
        eye.className = "fa-solid fa-eye-slash";
    } else {
        input.type = "password";
        eye.className = "fa-solid fa-eye";
    }

}

function saveAccount() {

    const username = document.getElementById("username").value.trim();
    const gmail = document.getElementById("gmail").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !gmail || !password) {
        alert("Lengkapi semua data.");
        return;
    }

    const account = {
        username,
        gmail,
        password
    };

    if (editIndex === -1) {
        accounts.push(account);
    } else {
        accounts[editIndex] = account;
        editIndex = -1;
    }

    saveData();
    renderAccounts();
    closeModal();
}

// =============================
// Roblox Account Manager
// Bagian 2
// =============================

function renderAccounts(list = accounts) {

    const accountList = document.getElementById("accountList");

    accountList.innerHTML = "";

    updateTotal();

    if (list.length === 0) {
        accountList.innerHTML = `
        <div class="card">
            <h3>Belum ada akun</h3>
        </div>`;
        return;
    }

    list.forEach((acc, index) => {

        accountList.innerHTML += `
        <div class="card">

            <h3>👤 ${acc.username}</h3>

            <p>📧 ${maskEmail(acc.gmail)}</p>

            <p>🔒 ************</p>

            <div class="actions">

                <button class="detailBtn"
                onclick="showDetail(${index})">
                📄 Detail
                </button>

                <button class="editBtn"
                onclick="editAccount(${index})">
                ✏ Edit
                </button>

                <button class="deleteBtn"
                onclick="deleteAccount(${index})">
                🗑 Hapus
                </button>

            </div>

        </div>
        `;

    });

}

function editAccount(index){

    const acc = accounts[index];

    document.getElementById("username").value = acc.username;
    document.getElementById("gmail").value = acc.gmail;
    document.getElementById("password").value = acc.password;

    editIndex = index;

    openModal();

}

function deleteAccount(index){

    if(confirm("Hapus akun ini?")){

        accounts.splice(index,1);

        saveData();

        renderAccounts();

    }

}

function searchAccount(){

    const key = document
        .getElementById("search")
        .value
        .toLowerCase();

    const result = accounts.filter(acc =>

        acc.username.toLowerCase().includes(key)

    );

    renderAccounts(result);

}

renderAccounts();

// =============================
// Roblox Account Manager
// Bagian 3
// =============================


let editIndex = -1;


// =============================
// Tambah / Simpan Akun
// =============================

function saveAccount(){

    const username =
    document.getElementById("username").value.trim();

    const gmail =
    document.getElementById("gmail").value.trim();

    const password =
    document.getElementById("password").value.trim();


    if(username === "" || gmail === "" || password === ""){

        alert("Isi semua data akun!");

        return;

    }


    const data = {

        username: username,
        gmail: gmail,
        password: password

    };


    if(editIndex === -1){

        accounts.push(data);

    }else{

        accounts[editIndex] = data;

        editIndex = -1;

    }


    saveData();

    renderAccounts();

    closeModal();

    clearForm();

}



// =============================
// Detail Akun
// =============================

function showDetail(index){

    const acc = accounts[index];


    alert(
`
👤 Username:
${acc.username}

📧 Gmail:
${acc.gmail}

🔑 Password:
${acc.password}
`
    );

}



// =============================
// Local Storage
// =============================

function saveData(){

    localStorage.setItem(
        "robloxAccounts",
        JSON.stringify(accounts)
    );

}



// =============================
// Load Data
// =============================

function loadData(){

    const data = localStorage.getItem(
        "robloxAccounts"
    );


    if(data){

        accounts = JSON.parse(data);

    }else{

        accounts = [];

    }

}



// =============================
// Total Akun
// =============================

function updateTotal(){

    const total =
    document.getElementById("total");


    if(total){

        total.innerHTML =
        "Total Akun: " + accounts.length;

    }

}



// =============================
// Modal
// =============================

function openModal(){

    document
    .getElementById("modal")
    .style.display = "flex";

}


function closeModal(){

    document
    .getElementById("modal")
    .style.display = "none";

}



// =============================
// Bersihkan Form
// =============================

function clearForm(){

    document.getElementById("username").value = "";

    document.getElementById("gmail").value = "";

    document.getElementById("password").value = "";

}



// =============================
// Jalankan Saat Website Dibuka
// =============================

loadData();

renderAccounts();
