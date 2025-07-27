document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initCharts();

    // Add animation class to cards
    document.querySelectorAll('.card').forEach((card, index) => {
        card.classList.add('animate-fadeIn');
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

function initCharts() {
    // Monthly Chart (Line Chart)
    const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');
    const monthlyChart = new Chart(monthlyCtx, {
        type: 'line',
        data: {
            labels: ['1 Jul', '5 Jul', '10 Jul', '15 Jul', '20 Jul', '25 Jul', '30 Jul'],
            datasets: [
                {
                    label: 'Pemasukan',
                    data: [0, 750000, 750000, 5250000, 5250000, 5250000, 5250000],
                    borderColor: '#198754',
                    backgroundColor: 'rgba(25, 135, 84, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Pengeluaran',
                    data: [0, 50000, 200000, 200000, 750000, 3750000, 3750000],
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': Rp ' + context.raw.toLocaleString('id-ID');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'Rp ' + value.toLocaleString('id-ID');
                        }
                    }
                }
            }
        }
    });

    // Category Chart (Doughnut Chart)
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    const categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Makanan', 'Transportasi', 'Hiburan', 'Belanja', 'Lainnya'],
            datasets: [{
                data: [1200000, 800000, 500000, 750000, 500000],
                backgroundColor: [
                    '#dc3545',
                    '#fd7e14',
                    '#ffc107',
                    '#0dcaf0',
                    '#6c757d'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: Rp ${value.toLocaleString('id-ID')} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

// Add transaction modal (example functionality)
document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
    button.addEventListener('click', function() {
        // In a real app, this would open a modal for adding transactions
        console.log('Add transaction button clicked');
    });
});


// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun me-1"></i> Mode Terang';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon me-1"></i> Mode Gelap';
    }
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun me-1"></i> Mode Terang';
}

// Quick Add Transaction
document.querySelectorAll('.quick-add-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.dataset.type;
        const modalId = type === 'income' ? 'tambahPemasukanModal' : 'tambahPengeluaranModal';
        const modal = new bootstrap.Modal(document.getElementById(modalId));
        modal.show();
    });
});

// Currency Formatting
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Update all currency elements on page
document.querySelectorAll('.currency').forEach(el => {
    const amount = parseFloat(el.textContent);
    el.textContent = formatCurrency(amount);
});
