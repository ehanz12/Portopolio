document.addEventListener('DOMContentLoaded', function() {
    const apiBaseUrl = 'http://localhost:8000/api'; // Sesuaikan dengan URL API Laravel Anda
    let mahasiswaData = [];
    let editModal = new bootstrap.Modal(document.getElementById('editModal'));

    // DOM Elements
    const mahasiswaForm = document.getElementById('mahasiswaForm');
    const mahasiswaTable = document.getElementById('mahasiswaTable');
    const searchInput = document.getElementById('searchInput');
    const editForm = document.getElementById('editForm');
    const saveEditBtn = document.getElementById('saveEditBtn');

    // Load data saat halaman dimuat
    loadMahasiswaData();

    // Event Listeners
    mahasiswaForm.addEventListener('submit', handleFormSubmit);
    searchInput.addEventListener('input', filterMahasiswa);
    saveEditBtn.addEventListener('click', handleEditSubmit);

    // Fungsi untuk memuat data mahasiswa
    function loadMahasiswaData() {
        showLoading(true);
        
        fetch(`${apiBaseUrl}/mahasiswas`, {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal memuat data');
            }
            return response.json();
        })
        .then(data => {
            mahasiswaData = data.data;
            renderMahasiswaTable(mahasiswaData);
            showLoading(false);
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
            showLoading(false);
        });
    }

    // Fungsi untuk menangani form submit (tambah data)
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = {
            nim: document.getElementById('nim').value,
            nama: document.getElementById('nama').value,
            jurusan: document.getElementById('jurusan').value,
            email: document.getElementById('email').value,
            no_hp: document.getElementById('no_hp').value
        };

        showLoading(true);
        
        fetch(`${apiBaseUrl}/mahasiswas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message || 'Gagal menambahkan data'); });
            }
            return response.json();
        })
        .then(data => {
            alert('Data berhasil ditambahkan');
            mahasiswaForm.reset();
            loadMahasiswaData();
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
            showLoading(false);
        });
    }

    // Fungsi untuk menampilkan data dalam tabel
    function renderMahasiswaTable(data) {
        mahasiswaTable.innerHTML = '';
        
        if (data.length === 0) {
            mahasiswaTable.innerHTML = '<tr><td colspan="6" class="text-center">Tidak ada data mahasiswa</td></tr>';
            return;
        }
        
        data.forEach(mahasiswa => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${mahasiswa.nim}</td>
                <td>${mahasiswa.nama}</td>
                <td>${mahasiswa.jurusan}</td>
                <td>${mahasiswa.email}</td>
                <td>${mahasiswa.no_hp}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-2 btn-action edit-btn" data-id="${mahasiswa.id}">Edit</button>
                    <button class="btn btn-sm btn-danger btn-action delete-btn" data-id="${mahasiswa.id}">Hapus</button>
                </td>
            `;
            mahasiswaTable.appendChild(row);
        });

        // Tambahkan event listener untuk tombol edit dan delete
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                showEditModal(id);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                deleteMahasiswa(id);
            });
        });
    }

    // Fungsi untuk menampilkan modal edit
    function showEditModal(id) {
        const mahasiswa = mahasiswaData.find(m => m.id == id);
        if (!mahasiswa) return;

        document.getElementById('editId').value = mahasiswa.id;
        document.getElementById('editNim').value = mahasiswa.nim;
        document.getElementById('editNama').value = mahasiswa.nama;
        document.getElementById('editJurusan').value = mahasiswa.jurusan;
        document.getElementById('editEmail').value = mahasiswa.email;
        document.getElementById('editNoHp').value = mahasiswa.no_hp;
        editModal.show();
    }

    // Fungsi untuk menangani edit data
    function handleEditSubmit() {
        const id = document.getElementById('editId').value;
        const formData = {
            nim: document.getElementById('editNim').value,
            nama: document.getElementById('editNama').value,
            jurusan: document.getElementById('editJurusan').value,
            email: document.getElementById('editEmail').value,
            no_hp: document.getElementById('editNoHp').value
        };

        showLoading(true);
        
        fetch(`${apiBaseUrl}/mahasiswas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message || 'Gagal mengupdate data'); });
            }
            return response.json();
        })
        .then(data => {
            alert('Data berhasil diupdate');
            editModal.hide();
            loadMahasiswaData();
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
            showLoading(false);
        });
    }

    // Fungsi untuk menghapus data
    function deleteMahasiswa(id) {
        if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
        showLoading(true);
        
        fetch(`${apiBaseUrl}/mahasiswas/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal menghapus data');
            }
            return response.json();
        })
        .then(data => {
            alert('Data berhasil dihapus');
            loadMahasiswaData();
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
            showLoading(false);
        });
    }

    // Fungsi untuk filter/pencarian
    function filterMahasiswa() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = mahasiswaData.filter(mahasiswa => 
            mahasiswa.nim.toLowerCase().includes(searchTerm) ||
            mahasiswa.nama.toLowerCase().includes(searchTerm) ||
            mahasiswa.jurusan.toLowerCase().includes(searchTerm) ||
            mahasiswa.email.toLowerCase().includes(searchTerm) ||
            mahasiswa.no_hp.toLowerCase().includes(searchTerm)
        );
        renderMahasiswaTable(filteredData);
    }

    // Fungsi untuk menampilkan/menyembunyikan loading
    function showLoading(show) {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.disabled = show;
            if (show && !btn.querySelector('.loading')) {
                const loading = document.createElement('span');
                loading.className = 'loading';
                btn.insertBefore(loading, btn.firstChild);
            } else if (!show) {
                const loading = btn.querySelector('.loading');
                if (loading) loading.remove();
            }
        });
    }
});