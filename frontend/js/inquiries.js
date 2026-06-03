let editingInquiryId = null;

async function loadInquiries() {
  const search = document.getElementById('inquirySearch').value.trim();
  const status = document.getElementById('inquiryStatusFilter').value;
  let url = '/inquiries?';
  if (search) url += `search=${encodeURIComponent(search)}&`;
  if (status) url += `status=${status}`;
  try {
    const inquiries = await apiFetch(url);
    renderInquiries(inquiries);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderInquiries(inquiries) {
  const tbody = document.getElementById('inquiryTableBody');
  tbody.innerHTML = '';
  if (inquiries.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7"><div class="empty-state"><b>No inquiries found</b><p>Add an inquiry to get started</p></div></td></tr>';
    return;
  }
  inquiries.forEach(inq => {
    tbody.innerHTML += `<tr>
      <td><b>${inq.eventName}</b></td>
      <td>${inq.customerName}</td>
      <td>${inq.vendor ? inq.vendor.name : '—'}</td>
      <td>${inq.eventDate}</td>
      <td>₹${Number(inq.budget).toLocaleString()}</td>
      <td><span class="badge badge-${inq.status.toLowerCase()}">${inq.status}</span></td>
      <td><div class="actions">
        <button class="btn btn-sm btn-outline" onclick="openEditInquiry(${inq.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteInquiry(${inq.id})">Delete</button>
      </div></td>
    </tr>`;
  });
}

async function openAddInquiry() {
  editingInquiryId = null;
  document.getElementById('inquiryModalTitle').textContent = 'Add Inquiry';
  document.getElementById('inquiryForm').reset();
  await loadVendorOptions();
  document.getElementById('inquiryModal').classList.add('open');
}

async function openEditInquiry(id) {
  try {
    const inq = await apiFetch(`/inquiries/${id}`);
    editingInquiryId = id;
    document.getElementById('inquiryModalTitle').textContent = 'Edit Inquiry';
    await loadVendorOptions(inq.vendorId);
    document.getElementById('iEventName').value = inq.eventName;
    document.getElementById('iCustomerName').value = inq.customerName;
    document.getElementById('iEventDate').value = inq.eventDate;
    document.getElementById('iBudget').value = inq.budget;
    document.getElementById('iStatus').value = inq.status;
    document.getElementById('inquiryModal').classList.add('open');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function loadVendorOptions(selectedId = null) {
  const select = document.getElementById('iVendorId');
  select.innerHTML = '<option value="">Select Vendor</option>';
  try {
    const vendors = await apiFetch('/vendors?');
    vendors.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.id;
      opt.textContent = `${v.name} (${v.category})`;
      if (selectedId && v.id === selectedId) opt.selected = true;
      select.appendChild(opt);
    });
  } catch (err) {}
}

function closeInquiryModal() {
  document.getElementById('inquiryModal').classList.remove('open');
}

document.getElementById('inquiryForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    eventName: document.getElementById('iEventName').value.trim(),
    customerName: document.getElementById('iCustomerName').value.trim(),
    eventDate: document.getElementById('iEventDate').value,
    vendorId: parseInt(document.getElementById('iVendorId').value),
    budget: parseFloat(document.getElementById('iBudget').value),
    status: document.getElementById('iStatus').value,
  };
  if (!data.vendorId) return showToast('Please select a vendor', 'error');
  try {
    if (editingInquiryId) {
      await apiFetch(`/inquiries/${editingInquiryId}`, { method: 'PUT', body: JSON.stringify(data) });
      showToast('Inquiry updated');
    } else {
      await apiFetch('/inquiries', { method: 'POST', body: JSON.stringify(data) });
      showToast('Inquiry added');
    }
    closeInquiryModal();
    loadInquiries();
  } catch (err) {
    showToast(err.message, 'error');
  }
});

async function deleteInquiry(id) {
  if (!confirm('Delete this inquiry?')) return;
  try {
    await apiFetch(`/inquiries/${id}`, { method: 'DELETE' });
    showToast('Inquiry deleted');
    loadInquiries();
  } catch (err) {
    showToast(err.message, 'error');
  }
}
