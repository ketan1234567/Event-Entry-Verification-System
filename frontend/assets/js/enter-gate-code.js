(function () {
  const params = new URLSearchParams(window.location.search);
  // Use employeeId from URL, or fetch from sessionStorage (e.g. after signup redirect)
  let employeeId = params.get('employeeId') || sessionStorage.getItem('eevs_employeeId') || null;

  const empNameEl = document.getElementById('empName');
  const empIdEl = document.getElementById('empId');
  const gateCodeInput = document.getElementById('gateCode');
  const btnSubmit = document.getElementById('btnSubmitCode');
  const timerEl = document.getElementById('timer');
  const messageEl = document.getElementById('message');

  let remainingSeconds = 20;
  let timerInterval = null;
  let expired = false;

  // 1) Fetch employee ID and name from backend (GET /get-employee-id) and display
  async function loadProfile() {
    if (!employeeId) {
      empNameEl.textContent = '—';
      empIdEl.textContent = 'Employee ID: —';
      return;
    }
    try {
      const res = await fetch(
        `/api/public/get-employee-id?employeeId=${encodeURIComponent(employeeId)}`
      );
      const data = await res.json();
      if (!res.ok) {
        empNameEl.textContent = '—';
        empIdEl.textContent = `Employee ID: ${employeeId}`;
        messageEl.textContent = data.error || 'Unable to load employee.';
        return;
      }
      empNameEl.textContent = data.name || '—';
      empIdEl.textContent = `Employee ID: ${data.employeeId}`;
      sessionStorage.setItem('eevs_employee_profile', JSON.stringify({
        employeeId: data.employeeId,
        fullName: data.name,
        selfiePath: null,
      }));
    } catch (err) {
      empNameEl.textContent = '—';
      empIdEl.textContent = employeeId ? `Employee ID: ${employeeId}` : 'Employee ID: —';
      messageEl.textContent = 'Network error while loading employee.';
    }
  }

  // 2) 20-second countdown — always runs
  function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      remainingSeconds -= 1;
      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        expired = true;
        remainingSeconds = 0;
        updateTimerDisplay();
        btnSubmit.disabled = true;
        gateCodeInput.disabled = true;
        messageEl.textContent = 'Code expired. Please request another code.';
        messageEl.className = 'small text-danger';
      } else {
        updateTimerDisplay();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const s = remainingSeconds.toString().padStart(2, '0');
    timerEl.textContent = `00:${s}`;
  }

  // 3) Submit gate code
  async function submitCode() {
    if (expired) {
      messageEl.textContent = 'Code expired. Please request another code.';
      messageEl.className = 'small text-danger';
      return;
    }

    if (!employeeId) {
      messageEl.textContent = 'Missing employee information.';
      messageEl.className = 'small text-warning';
      return;
    }

    const gateCode = gateCodeInput.value.trim();
    if (!gateCode) {
      messageEl.textContent = 'Please enter the gate code.';
      messageEl.className = 'small text-warning';
      return;
    }

    btnSubmit.disabled = true;
    messageEl.textContent = 'Verifying code...';
    messageEl.className = 'small text-light';

    try {
      const res = await fetch('/api/public/gate/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, gateCode }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'CODE_EXPIRED') {
          messageEl.textContent = 'Code expired. Please request another code.';
        } else if (data.error === 'INVALID_CODE') {
          messageEl.textContent = 'Invalid code. Please try again.';
        } else {
          messageEl.textContent = data.error || 'Unable to verify code.';
        }
        messageEl.className = 'small text-danger';
        btnSubmit.disabled = false;
        return;
      }

      window.location.href =
        `verify_successfully.html?employeeId=${encodeURIComponent(employeeId)}`;
    } catch (err) {
      messageEl.textContent = 'Network error. Please try again.';
      messageEl.className = 'small text-danger';
      btnSubmit.disabled = false;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    startTimer();
    btnSubmit.addEventListener('click', submitCode);
    gateCodeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitCode();
      }
    });
  });
})();