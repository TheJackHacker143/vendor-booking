function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`page-${name}`).classList.add('active');
  document.querySelector(`[data-page="${name}"]`)?.classList.add('active');

  const titles = { dashboard: 'Dashboard', vendors: 'Vendors', inquiries: 'Inquiries' };
  document.getElementById('pageTitle').textContent = titles[name] || name;

  if (name === 'dashboard') loadDashboard();
  if (name === 'vendors') loadVendors();
  if (name === 'inquiries') loadInquiries();

  // close sidebar on mobile
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarBackdrop').classList.remove('open');
  }
}

function initApp() {
  const user = getUser();
  if (!user) {
    document.getElementById('authPage').classList.add('active');
    document.getElementById('appPage').style.display = 'none';
    return;
  }

  document.getElementById('authPage').classList.remove('active');
  document.getElementById('appPage').style.display = 'flex';

  document.getElementById('sidebarUserName').textContent = user.name;
  document.getElementById('sidebarUserEmail').textContent = user.email;
  document.getElementById('sidebarAvatar').textContent = user.name.charAt(0).toUpperCase();

  showPage('dashboard');
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  clearAuth();
  document.getElementById('appPage').style.display = 'none';
  document.getElementById('authPage').classList.add('active');
});

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarBackdrop').classList.toggle('open');
});

document.getElementById('sidebarBackdrop').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarBackdrop').classList.remove('open');
});

window.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initApp();
});
