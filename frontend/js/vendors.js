let editingVendorId = null;

async function loadVendors() {
  const search = document.getElementById('vendorSearch').value.trim();
  const category = document.getElementById('vendorCategoryFilter').value;
  let url = '/vendors?';
  if (search) url += `search=${encodeURIComponent(search)}&`;
  if (category) url += `category=${category}`;
  try {
    const vendors = await apiFetch(url);
    renderVendors(vendors);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderVendors(vendors) {
  const tbody = document.getElementById('vendorTableBody');
  tbody.innerHTML = '';
  if (vendors.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><b>No vendors found</b><p>Add a vendor to get started</p></div></td></tr>';
    return;
  }
  vendors.forEach(v => {
    tbody.innerHTML += `<tr>
      <td><b>${v.name}</b></td>
      <td>${v.email}</td>
      <td>${v.phone}</td>
      <td><span class="badge badge-${v.category.toLowerCase()}">${v.category}</span></td>
      <td>${v.address}</td>
      <td><div class="actions">
        <button class="btn btn-sm btn-outline" onclick="openEditVendor(${v.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteVendor(${v.id})">Delete</button>
      </div></td>
    </tr>`;
  });
}

function openAddVendor() {
  editingVendorId = null;
  document.getElementById('vendorModalTitle').textContent = 'Add Vendor';
  document.getElementById('vendorForm').reset();
  document.getElementById('vendorModal').classList.add('open');
}

async function openEditVendor(id) {
  try {
    const v = await apiFetch(`/vendors/${id}`);
    editingVendorId = id;
    document.getElementById('vendorModalTitle').textContent = 'Edit Vendor';
    document.getElementById('vName').value = v.name;
    document.getElementById('vEmail').value = v.email;
    document.getElementById('vPhone').value = v.phone;
    document.getElementById('vCategory').value = v.category;
    document.getElementById('vAddress').value = v.address;
    document.getElementById('vendorModal').classList.add('open');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function closeVendorModal() {
  document.getElementById('vendorModal').classList.remove('open');
}

document.getElementById('vendorForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('vName').value.trim(),
    email: document.getElementById('vEmail').value.trim(),
    phone: document.getElementById('vPhone').value.trim(),
    category: document.getElementById('vCategory').value,
    address: document.getElementById('vAddress').value.trim(),
  };
  try {
    if (editingVendorId) {
      await apiFetch(`/vendors/${editingVendorId}`, { method: 'PUT', body: JSON.stringify(data) });
      showToast('Vendor updated');
    } else {
      await apiFetch('/vendors', { method: 'POST', body: JSON.stringify(data) });
      showToast('Vendor added');
    }
    closeVendorModal();
    loadVendors();
  } catch (err) {
    showToast(err.message, 'error');
  }
});

async function deleteVendor(id) {
  if (!confirm('Delete this vendor?')) return;
  try {
    await apiFetch(`/vendors/${id}`, { method: 'DELETE' });
    showToast('Vendor deleted');
    loadVendors();
  } catch (err) {
    showToast(err.message, 'error');
  }
}
