// ===================================
// Roblox Account Manager
// Local Storage
// ===================================

let accounts = JSON.parse(localStorage.getItem("robloxAccounts")) || [];
let editIndex = -1;
let currentDetail = -1;

const accountList = document.getElementById("accountList");
const totalAccount = document.getElementById("totalAccount");

function saveLocal() {
    localStorage.setItem("robloxAccounts", JSON.stringify(accounts));
}

function updateTotal() {
    totalAccount.textContent = accounts.length;
}

function maskEmail(email) {
    const parts = email.split("@");

    if (parts.length !== 2) return email;

    const name = parts[0];
    const domain = parts[1];

    if (name.length <= 3) {
        return name + "***@" + domain;
    }

    return name.substring(0,3) +
        "*".repeat(name.length-3) +
        "@" +
        domain;
}

function renderAccounts(data = accounts){

    accountList.innerHTML="";

    updateTotal();

    if(data.length===0){

        accountList.innerHTML=`
        <div class="card">
            <h3>Tidak ada akun.</h3>
        </div>`;

        return;
    }

    data.forEach((acc,index)=>{

        accountList.innerHTML+=`

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

✏️ Edit

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

function saveAccount(){

    const username=document.getElementById("username").value.trim();
    const gmail=document.getElementById("gmail").value.trim();
    const password=document.getElementById("password").value.trim();

    if(!username||!gmail||!password){

        alert("Lengkapi semua data.");

        return;

    }

    const obj={
        username,
        gmail,
        password
    };

    if(editIndex==-1){

        accounts.push(obj);

    }else{

        accounts[editIndex]=obj;

        editIndex=-1;

    }

    saveLocal();

    renderAccounts();

    closeModal();

}

renderAccounts();    const password = document.getElementById("password").value.trim();
    const display = document.getElementById("display").value.trim();
    const email = document.getElementById("email").value.trim();
    const tag = document.getElementById("tag").value.trim();
    const note = document.getElementById("note").value.trim();

    if (!username || !password) {
        alert("Username dan Password wajib diisi!");
        return;
    }

    const data = {
        username,
        password,
        display,
        email,
        tag,
        note
    };

    if (editIndex === -1) {
        accounts.push(data);
    } else {
        accounts[editIndex] = data;
        editIndex = -1;
    }

    saveData();
    clearForm();
    renderAccounts();
}

function editAccount(index) {
    const acc = accounts[index];

    document.getElementById("username").value = acc.username;
    document.getElementById("password").value = acc.password;
    document.getElementById("display").value = acc.display;
    document.getElementById("email").value = acc.email;
    document.getElementById("tag").value = acc.tag;
    document.getElementById("note").value = acc.note;

    editIndex = index;
}

function deleteAccount(index) {
    if (confirm("Hapus akun ini?")) {
        accounts.splice(index, 1);
        saveData();
        renderAccounts();
    }
}

function searchAccount() {
    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const result = accounts.filter(acc =>
        acc.username.toLowerCase().includes(keyword) ||
        acc.display.toLowerCase().includes(keyword) ||
        acc.email.toLowerCase().includes(keyword) ||
        acc.tag.toLowerCase().includes(keyword)
    );

    renderAccounts(result);
}

function clearForm() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("display").value = "";
    document.getElementById("email").value = "";
    document.getElementById("tag").value = "";
    document.getElementById("note").value = "";
}

renderAccounts();

const modal = document.getElementById("modal");

function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";

    document.getElementById("username").value = "";
    document.getElementById("gmail").value = "";
    document.getElementById("password").value = "";
}
