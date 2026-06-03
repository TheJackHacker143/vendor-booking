async function loadDashboard() {
  try {
    const stats = await apiFetch('/inquiries/stats');
    document.getElementById('statVendors').textContent = stats.totalVendors;
    document.getElementById('statInquiries').textContent = stats.totalInquiries;
    document.getElementById('statPending').textContent = stats.pending;
    document.getElementById('statApproved').textContent = stats.approved;
    document.getElementById('statRejected').textContent = stats.rejected;

    const inquiries = await apiFetch('/inquiries?');
    const tbody = document.getElementById('recentInquiries');
    tbody.innerHTML = '';
    if (inquiries.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No inquiries yet</td></tr>';
      return;
    }
    inquiries.slice(0, 5).forEach(inq => {
      tbody.innerHTML += `<tr>
        <td>${inq.eventName}</td>
        <td>${inq.customerName}</td>
        <td>${inq.vendor ? inq.vendor.name : '—'}</td>
        <td>${inq.eventDate}</td>
        <td><span class="badge badge-${inq.status.toLowerCase()}">${inq.status}</span></td>
      </tr>`;
    });
  } catch (err) {
    console.error(err);
  }
}
