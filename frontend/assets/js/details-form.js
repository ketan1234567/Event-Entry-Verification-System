(function () {
  const form = document.getElementById('detailsForm');
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token') || 'DEMO_TOKEN';

  // Prefill from employee info if available
  const storedEmployee = sessionStorage.getItem('eevs_employee');
  if (storedEmployee) {
    try {
      const emp = JSON.parse(storedEmployee);
      const fullNameInput = document.getElementById('fullName');
      if (emp.first_name || emp.last_name) {
        fullNameInput.value = `${emp.first_name || ''} ${emp.last_name || ''}`.trim();
      }
      const deptInput = document.getElementById('department');
      if (emp.department) {
        deptInput.value = emp.department;
      }
    } catch (e) {
      // ignore parse errors
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const department = document.getElementById('department').value.trim();

    // Store locally for demo; you can instead POST to backend
    const details = { fullName, email, department, token };
    sessionStorage.setItem('eevs_details', JSON.stringify(details));

    // Go to processing screen
    window.location.href = `processing.html?token=${encodeURIComponent(token)}`;
  });
})();
