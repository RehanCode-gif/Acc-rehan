let accounts = JSON.parse(localStorage.getItem("robloxAccounts")) || [];
let editIndex = -1;

function saveData() {
    localStorage.setItem("robloxAccounts", JSON.stringify(accounts));
}

function renderAccounts(list = accounts) {
    const accountList = document.getElementById("accountList");
    accountList.innerHTML = "";

    if (list.length === 0) {
        accountList.innerHTML = "<p>Tidak ada akun tersimpan.</p>";
        return;
    }

    list.forEach((acc, index) => {
        accountList.innerHTML += `
        <div class="card">
            <h3>${acc.username}</h3>
            <p><b>Password:</b> ${acc.password}</p>
            <p><b>Display:</b> ${acc.display}</p>
            <p><b>Email:</b> ${acc.email}</p>
            <p><b>Tag:</b> ${acc.tag}</p>
            <p><b>Catatan:</b> ${acc.note}</p>

            <div class="actions">
                <button class="edit" onclick="editAccount(${index})">Edit</button>
                <button class="delete" onclick="deleteAccount(${index})">Hapus</button>
            </div>
        </div>`;
    });
}

function saveAccount() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
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
