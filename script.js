// ==================== UTILITY FUNCTIONS ====================

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function updateCurrentTime() {
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const dateString = now.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        timeElement.textContent = `${dateString} ${timeString}`;
    }
}

// ==================== DASHBOARD NAVIGATION ====================

function initDashboardNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.dashboard-section');
    const sectionTitle = document.getElementById('section-title');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked item
            item.classList.add('active');

            // Get section to show
            const sectionId = item.getAttribute('data-section');

            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));

            // Show selected section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Update title
            const titles = {
                'overview': 'Dashboard Overview',
                'network': 'Análisis de Redes',
                'data': 'Procesamiento de Datos',
                'predictive': 'Inteligencia Predictiva',
                'reports': 'Generación de Reportes',
                'alerts': 'Centro de Alertas'
            };

            if (sectionTitle) {
                sectionTitle.textContent = titles[sectionId] || 'Dashboard';
            }
        });
    });
}

// ==================== METRICS ANIMATION ====================

function animateMetrics() {
    const activeAnalysis = document.getElementById('activeAnalysis');
    const dataProcessed = document.getElementById('dataProcessed');
    const alerts = document.getElementById('alerts');

    if (activeAnalysis) {
        animateValue(activeAnalysis, 0, 127, 2000);
    }
    if (dataProcessed) {
        animateValue(dataProcessed, 0, 45, 2000);
    }
    if (alerts) {
        animateValue(alerts, 0, 3, 1500);
    }
}

// ==================== STATS COUNTER ANIMATION ====================

function animateStatsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        if (target) {
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }

                if (target % 1 !== 0) {
                    stat.textContent = current.toFixed(1);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        }
    });
}

// ==================== EVENTS LIST ====================

function populateEventsList() {
    const eventsList = document.getElementById('eventsList');
    if (!eventsList) return;

    const events = [
        {
            time: 'Hace 2 min',
            message: 'Análisis de red completado: 234 nodos procesados'
        },
        {
            time: 'Hace 8 min',
            message: 'Nueva conexión detectada en sector financiero'
        },
        {
            time: 'Hace 15 min',
            message: 'Reporte ejecutivo generado exitosamente'
        },
        {
            time: 'Hace 23 min',
            message: 'Patrón anómalo identificado en base de datos'
        },
        {
            time: 'Hace 45 min',
            message: 'Actualización del sistema completada'
        }
    ];

    eventsList.innerHTML = events.map(event => `
        <div class="event-item">
            <div class="event-time">${event.time}</div>
            <div class="event-message">${event.message}</div>
        </div>
    `).join('');
}

// ==================== NETWORK VISUALIZATION ====================

function initNetworkVisualization() {
    const svg = document.getElementById('networkSvg');
    if (!svg) return;

    const width = svg.clientWidth || 800;
    const height = svg.clientHeight || 500;

    // Clear existing content
    svg.innerHTML = '';

    // Create nodes
    const nodes = [
        { x: width * 0.5, y: height * 0.5, r: 20, label: 'Central' },
        { x: width * 0.3, y: height * 0.3, r: 15, label: 'A-7' },
        { x: width * 0.7, y: height * 0.3, r: 15, label: 'B-3' },
        { x: width * 0.2, y: height * 0.6, r: 12, label: 'D-9' },
        { x: width * 0.8, y: height * 0.6, r: 12, label: 'G-12' },
        { x: width * 0.4, y: height * 0.8, r: 10, label: 'X-4' },
        { x: width * 0.6, y: height * 0.8, r: 10, label: 'Y-8' }
    ];

    // Create connections
    const connections = [
        [0, 1], [0, 2], [0, 3], [0, 4], [1, 3], [2, 4], [3, 5], [4, 6]
    ];

    // Draw connections
    connections.forEach(([i, j]) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', nodes[i].x);
        line.setAttribute('y1', nodes[i].y);
        line.setAttribute('x2', nodes[j].x);
        line.setAttribute('y2', nodes[j].y);
        line.setAttribute('stroke', '#00ffff33');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);
    });

    // Draw nodes
    nodes.forEach((node, i) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', node.r);
        circle.setAttribute('fill', i === 0 ? '#00ffff' : '#0099ff');
        circle.setAttribute('opacity', '0.7');
        circle.style.cursor = 'pointer';

        circle.addEventListener('mouseenter', () => {
            circle.setAttribute('opacity', '1');
            circle.setAttribute('r', node.r * 1.2);
        });

        circle.addEventListener('mouseleave', () => {
            circle.setAttribute('opacity', '0.7');
            circle.setAttribute('r', node.r);
        });

        svg.appendChild(circle);

        // Add label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y - node.r - 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#ffffff');
        text.setAttribute('font-size', '12');
        text.textContent = node.label;
        svg.appendChild(text);
    });
}

// ==================== REPORT FORM HANDLER ====================

function initReportForm() {
    const reportForm = document.getElementById('reportForm');
    if (!reportForm) return;

    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const reportType = document.getElementById('reportType').value;
        const reportPeriod = document.getElementById('reportPeriod').value;
        const reportFormat = document.getElementById('reportFormat').value;
        const reportName = document.getElementById('reportName').value;

        // Simulate report generation
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00ffff 0%, #0099ff 100%);
            color: #000;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 700;
            z-index: 10000;
            box-shadow: 0 5px 20px rgba(0, 255, 255, 0.4);
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = `Reporte "${reportName}" generado exitosamente!`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);

        // Reset form
        reportForm.reset();
    });
}

// ==================== ALERT FILTERS ====================

function initAlertFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Show/hide items based on filter
            timelineItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'flex';
                } else {
                    if (item.classList.contains(filter)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

// ==================== SIMPLE CHARTS SIMULATION ====================

function createSimpleChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 153, 255, 0.05)');

    // Generate random data points
    const points = 20;
    const data = [];
    for (let i = 0; i < points; i++) {
        data.push(Math.random() * 0.6 + 0.2);
    }

    // Draw area chart
    ctx.beginPath();
    ctx.moveTo(0, height);

    const stepX = width / (points - 1);
    data.forEach((value, i) => {
        const x = i * stepX;
        const y = height - (value * height);
        if (i === 0) {
            ctx.lineTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    data.forEach((value, i) => {
        const x = i * stepX;
        const y = height - (value * height);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw points
    data.forEach((value, i) => {
        const x = i * stepX;
        const y = height - (value * height);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00ffff';
        ctx.fill();
    });
}

function createPieChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    const data = [
        { value: 35, color: '#00ffff', label: 'Redes' },
        { value: 25, color: '#0099ff', label: 'Datos' },
        { value: 20, color: '#00aaff', label: 'Predictivo' },
        { value: 20, color: '#00ccff', label: 'Otros' }
    ];

    let currentAngle = -Math.PI / 2;

    data.forEach(segment => {
        const sliceAngle = (segment.value / 100) * 2 * Math.PI;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = segment.color;
        ctx.fill();

        currentAngle += sliceAngle;
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = '#111111';
    ctx.fill();
}

function initCharts() {
    createSimpleChart('activityChart');
    createPieChart('distributionChart');
    createSimpleChart('dataVolumeChart');
    createSimpleChart('predictiveChart');
}

// ==================== SMOOTH SCROLL ====================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.startsWith('#!')) return;

            const target = document.querySelector(href);
            if (target && !this.classList.contains('nav-item')) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== INITIALIZE ON LOAD ====================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize common features
    initSmoothScroll();

    // Check if we're on the dashboard page
    if (document.querySelector('.dashboard-body')) {
        initDashboardNavigation();
        animateMetrics();
        populateEventsList();
        initNetworkVisualization();
        initReportForm();
        initAlertFilters();
        initCharts();

        // Update time every second
        updateCurrentTime();
        setInterval(updateCurrentTime, 1000);

        // Refresh metrics every 30 seconds
        setInterval(() => {
            animateMetrics();
        }, 30000);
    } else {
        // Landing page animations
        animateStatsCounters();
    }
});

// ==================== WINDOW RESIZE HANDLER ====================

window.addEventListener('resize', () => {
    if (document.querySelector('.dashboard-body')) {
        initCharts();
        initNetworkVisualization();
    }
});

// ==================== CSS ANIMATIONS ====================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .feature-card,
    .stat-card,
    .metric-card {
        animation: fadeIn 0.6s ease-out forwards;
    }

    .feature-card:nth-child(1) { animation-delay: 0.1s; }
    .feature-card:nth-child(2) { animation-delay: 0.2s; }
    .feature-card:nth-child(3) { animation-delay: 0.3s; }
    .feature-card:nth-child(4) { animation-delay: 0.4s; }
    .feature-card:nth-child(5) { animation-delay: 0.5s; }
    .feature-card:nth-child(6) { animation-delay: 0.6s; }
`;
document.head.appendChild(style);
