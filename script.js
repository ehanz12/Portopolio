
// Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Menutup menu saat link diklik
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Menutup menu saat klik di luar menu
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});




// ============== VALIDASI FORMULIR KONTAK ==============
// Fungsi untuk validasi email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fungsi untuk menampilkan error
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Fungsi untuk membersihkan error
function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// Fungsi untuk menangani submit form
function handleSubmit(event) {
    event.preventDefault();
    clearErrors();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const successMessage = document.getElementById('success-message');
    
    let isValid = true;

    // Validasi nama
    if (!name) {
        showError('name-error', 'Nama tidak boleh kosong');
        isValid = false;
    }

    // Validasi email
    if (!email) {
        showError('email-error', 'Email tidak boleh kosong');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email-error', 'Format email tidak valid');
        isValid = false;
    }

    // Validasi pesan
    if (!message) {
        showError('message-error', 'Pesan tidak boleh kosong');
        isValid = false;
    }

    if (isValid) {
        // Konfigurasi EmailJS
        const templateParams = {
            from_name: name,  // Nama pengirim
            from_email: email, // Email pengirim
            message: message,  // Pesan
            reply_to: email   // Email untuk balasan
        };

        // Inisialisasi dengan Public Key Anda
        emailjs.init("x-vLtMYf9CmvsVxV5");

        // Service ID dan Template ID dari dashboard EmailJS
        emailjs.send("service_k4vz9fg", "template_57lta1t", templateParams)
            .then(function(response) {
                successMessage.textContent = "Pesan berhasil dikirim!";
                successMessage.style.display = 'block';
                document.getElementById('contact-form').reset();
            }, function(error) {
                showError('message-error', 'Gagal mengirim pesan. Silakan coba lagi.');
            });
    }

    return false;
}

