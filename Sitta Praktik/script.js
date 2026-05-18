// ============================================
// SCRIPT SITTA UT - FULLY INTEGRATED
// Universitas Terbuka Tracking System
// ============================================

let currentUser = null;
let debounceTimer = null;

// 🔥 DOM READY & INIT
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initAllEventListeners();
    loadCurrentPage();
});

// 1. 🔥 AUTHENTICATION SYSTEM
function checkAuth() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateUserDisplay();
        return true;
    }
    
    // Redirect to login if not authenticated (except index)
    if (!window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
    return false;
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email')?.value?.trim();
    const password = document.getElementById('password')?.value;
    const errorDiv = document.getElementById('loginError');
    
    if (!email || !password) {
        showMessage('error', 'Email dan password wajib diisi!');
        return;
    }
    
    const user = isUserValid(email, password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showMessage('success', `Selamat datang, ${user.nama}!`);
        setTimeout(() => window.location.href = 'dashboard.html', 1000);
    } else {
        showMessage('error', '❌ Email atau password salah!');
    }
}

function handleLogout() {
    if (confirm('Yakin ingin keluar dari sistem?')) {
        localStorage.removeItem('currentUser');
        currentUser = null;
        window.location.href = 'index.html';
    }
}

// 2. 🎯 EVENT LISTENERS
function initAllEventListeners() {
    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    
    // Logout
    document.querySelectorAll('#logoutBtn').forEach(btn => {
        btn.addEventListener('click', handleLogout);
    });
    
    // Search Stok (Debounced)
    const searchStok = document.getElementById('searchStok');
    if (searchStok) {
        searchStok.addEventListener('input', debounce(filterStokTable, 300));
    }
    
    // Tracking Search
    const searchTracking = document.getElementById('searchTracking');
    const trackBtn = document.getElementById('trackBtn');
    if (searchTracking) {
        searchTracking.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleTrackingSearch();
        });
        searchTracking.addEventListener('input', function() {
            document.getElementById('trackingResult').classList.add('loading');
        });
    }
    if (trackBtn) trackBtn.addEventListener('click', handleTrackingSearch);
}

// 3. 📊 PAGE LOADER
function loadCurrentPage() {
    const page = window.location.pathname.split('/').pop();
    switch(page) {
        case 'dashboard.html': loadDashboard(); break;
        case 'stok.html': loadStokTable(); break;
        case 'tracking.html': 
            updateTrackingStats();
            break;
    }
}

// 4. 📈 DASHBOARD
function loadDashboard() {
    // Stats Cards
    document.getElementById('totalBarang').textContent = appData.totalBarang;
    document.getElementById('stokTersedia').textContent = appData.totalStok.toLocaleString();
    document.getElementById('paketAktif').textContent = appData.paketAktif;
    
    // Recent Activity
    loadRecentActivity();
}

function loadRecentActivity() {
    const recentList = document.getElementById('recentList');
    if (!recentList) return;
    
    const recentHTML = Object.values(dataTracking)
        .slice(0, 5)
        .map(track => `
            <div class="recent-item">
                <div class="recent-left">
                    <div class="recent-no">${track.nomorDO}</div>
                    <div class="recent-name">${track.nama}</div>
                    <div class="recent-status ${getStatusClass(track.status)}">
                        ${track.status} • ${track.ekspedisi}
                    </div>
                </div>
                <div class="recent-right">
                    <div class="recent-date">${formatTanggal(track.tanggalKirim)}</div>
                    <div class="recent-total">${track.total}</div>
                </div>
            </div>
        `).join('');
    
    recentList.innerHTML = recentHTML || '<div class="empty-state">Belum ada aktivitas</div>';
}

// 5. 📦 STOK TABLE
function loadStokTable() {
    const tbody = document.querySelector('#stokTable tbody');
    if (!tbody) return;
    
    tbody.innerHTML = dataBahanAjar.map(item => createStokRow(item)).join('');
}

function createStokRow(item) {
    const lowStock = item.stok < 200 ? 'low-stock' : '';
    return `
        <tr>
            <td>${item.kodeLokasi}</td>
            <td><strong>${item.kodeBarang}</strong></td>
            <td>${item.namaBarang}</td>
            <td><span class="badge">${item.jenisBarang}</span></td>
            <td>Edisi ${item.edisi}</td>
            <td class="stok ${lowStock}">${item.stok.toLocaleString()}</td>
            <td><img src="${item.cover}" alt="${item.namaBarang}" class="cover-img" onerror="this.src='img/logo_ut.png'"></td>
        </tr>
    `;
}

function filterStokTable() {
    const term = document.getElementById('searchStok').value;
    const rows = document.querySelectorAll('#stokTable tbody tr');
    const filtered = filterStok(term);
    
    rows.forEach((row, i) => {
        if (i < filtered.length) {
            row.style.display = '';
            updateRowContent(row, filtered[i]);
        } else {
            row.style.display = 'none';
        }
    });
}

function updateRowContent(row, item) {
    row.cells[0].textContent = item.kodeLokasi;
    row.cells[1].textContent = item.kodeBarang;
    row.cells[2].textContent = item.namaBarang;
    row.cells[3].textContent = item.jenisBarang;
    row.cells[4].textContent = `Edisi ${item.edisi}`;
    row.cells[5].textContent = item.stok.toLocaleString();
    row.cells[5].className = `stok ${item.stok < 200 ? 'low-stock' : ''}`;
    row.cells[6].querySelector('img').src = item.cover;
}

// 6. 🚚 TRACKING SYSTEM (CORE)
function handleTrackingSearch() {
    const nomorDO = document.getElementById('searchTracking').value.trim();
    const resultDiv = document.getElementById('trackingResult');
    
    if (!nomorDO) {
        showTrackingEmpty();
        return;
    }
    
    resultDiv.classList.add('loading');
    
    setTimeout(() => {
        const data = getTracking(nomorDO);
        resultDiv.classList.remove('loading');
        
        if (data) {
            displayTrackingCard(data);
        } else {
            showTrackingNotFound(nomorDO);
        }
    }, 800);
}

function displayTrackingCard(data) {
    const resultDiv = document.getElementById('trackingResult');
    const statusClass = getStatusClass(data.status);
    
    resultDiv.innerHTML = `
        <div class="tracking-success">
            <div class="tracking-header">
                <h2>📦 ${data.nomorDO}</h2>
                <span class="status-badge large ${statusClass}">${data.status}</span>
            </div>
            
            <div class="tracking-details">
                <div class="detail-row">
                    <span>Penerima:</span>
                    <strong>${data.nama}</strong>
                </div>
                <div class="detail-row">
                    <span>Ekspedisi:</span>
                    <span class="ekspedisi">${data.ekspedisi}</span>
                </div>
                <div class="detail-row">
                    <span>Tgl Kirim:</span>
                    ${formatTanggal(data.tanggalKirim)}
                </div>
                <div class="detail-row">
                    <span>Paket:</span>
                    <code>${data.paket}</code>
                </div>
                <div class="detail-row highlight">
                    <span>Total:</span>
                    <strong>${data.total}</strong>
                </div>
            </div>
            
            <div class="timeline-container">
                <h3>📋 Riwayat Perjalanan (${data.perjalanan.length} langkah)</h3>
                <div class="timeline">
                    ${data.perjalanan.map((step, index) => createTimelineItem(step, index, data.perjalanan.length)).join('')}
                </div>
            </div>
        </div>
    `;
}

function createTimelineItem(step, index, total) {
    const isLast = index === total - 1;
    const statusIcon = getTimelineIcon(step.status || 'progress');
    
    return `
        <div class="timeline-item ${isLast ? 'last' : ''}">
            <div class="timeline-stepper">
                <div class="step-number">${index + 1}</div>
                ${!isLast ? '<div class="step-line"></div>' : ''}
            </div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <span class="time">${step.waktu}</span>
                    <span class="step-icon">${statusIcon}</span>
                </div>
                <div class="timeline-body">${step.keterangan}</div>
            </div>
        </div>
    `;
}

function showTrackingNotFound(nomorDO) {
    document.getElementById('trackingResult').innerHTML = `
        <div class="tracking-error">
            <div class="error-emoji">🔍</div>
            <h3>Nomor DO Tidak Ditemukan</h3>
            <p><strong>${nomorDO}</strong> tidak terdaftar dalam sistem</p>
            <div class="quick-actions">
                <button class="quick-btn" onclick="quickTrack('2023001234')">Coba 2023001234</button>
                <button class="quick-btn" onclick="quickTrack('2023005678')">Coba 2023005678</button>
            </div>
        </div>
    `;
}

function showTrackingEmpty() {
    document.getElementById('trackingResult').innerHTML = `
        <div class="empty-tracking">
            <div class="empty-icon">📦</div>
            <h3>Masukkan Nomor DO</h3>
            <p>Ketik nomor DO 10 digit untuk tracking</p>
        </div>
    `;
}

// 7. 📊 TRACKING STATS
function updateTrackingStats() {
    const stats = {
        total: Object.keys(dataTracking).length,
        dalamPerjalanan: Object.values(dataTracking).filter(t => t.status === 'Dalam Perjalanan').length,
        dikirim: Object.values(dataTracking).filter(t => t.status === 'Dikirim').length,
        selesai: Object.values(dataTracking).filter(t => t.status === 'Selesai').length
    };
    
    const totalEl = document.getElementById('totalPaket');
    const dalamEl = document.getElementById('dalamPerjalanan');
    const selesaiEl = document.getElementById('selesai');
    
    if (totalEl) totalEl.textContent = stats.total;
    if (dalamEl) dalamEl.textContent = stats.dalamPerjalanan;
    if (selesaiEl) selesaiEl.textContent = stats.selesai;
}

// 8. 🛠️ UTILITY FUNCTIONS
function updateUserDisplay() {
    document.querySelectorAll('#userName').forEach(el => {
        el.textContent = currentUser?.nama || 'Guest';
    });
    document.querySelectorAll('.user-role').forEach(el => {
        el.textContent = currentUser?.role || '';
    });
}

function showMessage(type, text) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = text;
        errorDiv.className = `message ${type}`;
        errorDiv.style.display = 'block';
        setTimeout(() => errorDiv.style.display = 'none', 4000);
    }
}

function debounce(fn, ms) {
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => fn.apply(this, args), ms);
    };
}

function getTimelineIcon(status) {
    const icons = {
        received: '📥',
        arrived: '🏢',
        forwarded: '🚚',
        delivering: '📦',
        delivered: '✅',
        progress: '⏳'
    };
    return icons[status] || icons.progress;
}

function quickTrack(nomorDO) {
    document.getElementById('searchTracking').value = nomorDO;
    handleTrackingSearch();
}

// 9. 🔗 DATA FUNCTIONS (Wrappers)
function isUserValid(email, password) {
    return dataPengguna?.find(user => 
        user.email.toLowerCase() === email.toLowerCase() && 
        user.password === password
    ) || null;
}

function getTracking(nomorDO) {
    return dataTracking?.[nomorDO] || null;
}

function filterStok(term) {
    if (!dataBahanAjar) return [];
    if (!term) return dataBahanAjar;
    return dataBahanAjar.filter(item =>
        item.namaBarang.toLowerCase().includes(term.toLowerCase()) ||
        item.kodeBarang.includes(term) ||
        item.kodeLokasi.includes(term)
    );
}

function formatTanggal(dateStr) {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'short'
        });
    } catch {
        return 'Tanggal tidak valid';
    }
}

function getStatusClass(status) {
    const map = {
        'dalam perjalanan': 'warning',
        'dikirim': 'info',
        'selesai': 'success',
        default: 'pending'
    };
    return `status-${map[status?.toLowerCase()] || 'pending'}`;
}

// 🔔 INIT COMPLETE
console.log('🚀 SITTA Script Fully Loaded!');
console.log('✅ Auth:', !!currentUser);
console.log('📱 Page:', window.location.pathname);