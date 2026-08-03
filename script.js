// LocalStorage Keys
const STORAGE_KEY = 'rbx_accounts_vault_v2';

let accounts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderAccounts();
  lucide.createIcons();
});

/* --- CRUD OPERATIONS --- */
function saveAccount(e) {
  e.preventDefault();
  const id = document.getElementById('accountId').value;
  const usn = document.getElementById('inputUsn').value.trim();
  const pw = document.getElementById('inputPw').value.trim();
  const gmail = document.getElementById('inputGmail').value.trim();
  const tag = document.getElementById('inputTag').value;
  const spec = document.getElementById('inputSpec').value.trim();

  if (id) {
    accounts = accounts.map(acc => acc.id === id ? { id, usn, pw, gmail, tag, spec } : acc);
  } else {
    accounts.push({
      id: Date.now().toString(),
      usn,
      pw,
      gmail,
      tag,
      spec
    });
  }

  saveToStorage();
  closeModal('accountModal');
  renderAccounts();
}

function deleteAccount(id) {
  if (confirm('Yakin ingin menghapus akun ini?')) {
    accounts = accounts.filter(acc => acc.id !== id);
    saveToStorage();
    renderAccounts();
  }
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

/* --- RENDERING --- */
function renderAccounts() {
  const grid = document.getElementById('accountGrid');
  const emptyState = document.getElementById('emptyState');
  const searchVal = document.getElementById('searchInput').value.toLowerCase();

  const filtered = accounts.filter(acc => 
    acc.usn.toLowerCase().includes(searchVal) || 
    acc.spec.toLowerCase().includes(searchVal)
  );

  document.getElementById('totalCount').innerText = `${accounts.length} Akun`;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  grid.innerHTML = filtered.map(acc => `
    <div class="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 flex flex-col justify-between transition group shadow-lg">
      <div>
        <div class="flex items-center justify-between pb-3 border-b border-gray-800/80 mb-3">
          <div class="flex items-center gap-2">
            ${getTagBadge(acc.tag)}
            <h3 class="font-bold text-base text-white truncate max-w-[140px]">${escapeHtml(acc.usn)}</h3>
          </div>
          <div class="flex items-center gap-1">
            <button onclick="editAccount('${acc.id}')" class="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-gray-800 transition">
              <i data-lucide="pencil" class="w-4 h-4"></i>
            </button>
            <button onclick="deleteAccount('${acc.id}')" class="p-1.5 text-gray-400 hover:text-red-400 rounded-md hover:bg-gray-800 transition">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <div class="space-y-2 mb-4 text-xs font-mono">
          <div class="flex justify-between items-center bg-gray-800/40 px-2.5 py-1.5 rounded border border-gray-800">
            <span class="text-gray-500">PW:</span>
            <span class="text-gray-400">••••••••••••</span>
          </div>
          <div class="flex justify-between items-center bg-gray-800/40 px-2.5 py-1.5 rounded border border-gray-800">
            <span class="text-gray-500">Gmail:</span>
            <span class="text-gray-400">${maskEmail(acc.gmail)}</span>
          </div>
        </div>

        <div class="mb-4">
          <span class="text-[10px] uppercase font-semibold text-gray-500 tracking-wider block mb-1">Spesifikasi</span>
          <p class="text-xs text-gray-300 line-clamp-2 bg-gray-950/50 p-2 rounded border border-gray-800/50">
            ${acc.spec ? escapeHtml(acc.spec) : '<span class="italic text-gray-600">Tidak ada spesifikasi</span>'}
          </p>
        </div>
      </div>

      <button 
        onclick="showDetail('${acc.id}')" 
        class="w-full bg-gray-800 hover:bg-red-600 hover:text-white text-gray-300 text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2 border border-gray-700/50 hover:border-red-600"
      >
        <i data-lucide="eye" class="w-4 h-4"></i> Lihat Detail
      </button>
    </div>
  `).join('');

  lucide.createIcons();
}

function getTagBadge(tag) {
  if (tag === 'Utama') {
    return `<span class="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded">UTAMA</span>`;
  } else if (tag === 'Sold') {
    return `<span class="bg-gray-500/10 border border-gray-500/20 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded">SOLD</span>`;
  }
  return `<span class="bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded">READY</span>`;
}

function showDetail(id) {
  const acc = accounts.find(a => a.id === id);
  if (!acc) return;

  document.getElementById('detailUsn').innerText = acc.usn;
  document.getElementById('detailPw').innerText = acc.pw;
  document.getElementById('detailGmail').innerText = acc.gmail;
  document.getElementById('detailSpec').innerText = acc.spec || '-';

  openModal('detailModal');
}

function openAddModal() {
  document.getElementById('accountForm').reset();
  document.getElementById('accountId').value = '';
  document.getElementById('modalTitle').innerText = 'Tambah Akun Roblox';
  openModal('accountModal');
}

function editAccount(id) {
  const acc = accounts.find(a => a.id === id);
  if (!acc) return;

  document.getElementById('accountId').value = acc.id;
  document.getElementById('inputUsn').value = acc.usn;
  document.getElementById('inputPw').value = acc.pw;
  document.getElementById('inputGmail').value = acc.gmail;
  document.getElementById('inputTag').value = acc.tag || 'Ready';
  document.getElementById('inputSpec').value = acc.spec;
  document.getElementById('modalTitle').innerText = 'Edit Akun Roblox';

  openModal('accountModal');
}

function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

function maskEmail(email) {
  if (!email) return '••••@••••.com';
  const parts = email.split('@');
  if (parts.length < 2) return '••••••••';
  return parts[0].substring(0, 2) + '••••@' + parts[1];
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function copyToClipboard(elementId) {
  const text = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(text);
  alert('Disalin ke clipboard!');
}
