(function () {
  // 1. Get elements
const empNameEl = document.getElementById('empName');
const empIdEl = document.getElementById('empId');
const gateCodeInput = document.getElementById('gateCode');
const btnSubmit = document.getElementById('btnSubmitCode');
const timerEl = document.getElementById('timer');
const messageEl = document.getElementById('message');

// 2. Get ID from URL (fallback) or LocalStorage (primary source)
const params = new URLSearchParams(window.location.search);

// FIX: Check 'localStorage' because that is where sign-in.html saved it
let employeeId = params.get('employeeId') || localStorage.getItem('employeeId') || null;

let remainingSeconds = 20;
let timerInterval = null;
let expired = false;

// 3. Function to fetch Name from Backend
async function loadProfile() {
    // Safety check: If elements missing, stop
    if (!empIdEl || !empNameEl) {
        console.error("HTML elements for ID or Name not found!");
        return;
    }

    if (!employeeId) {
        empNameEl.textContent = '—';
        empIdEl.textContent = 'Employee ID: —';
        messageEl.textContent = "No Employee ID found. Please sign in again.";
        return;
    }

    // Display the ID immediately (we already have it)
    empIdEl.textContent = `Employee ID: ${employeeId}`;

    try {
        // Fetch name from Node.js backend
        const res = await fetch(
            `/api/public/get-employee-id?employeeId=${encodeURIComponent(employeeId)}`
        );
        
        const data = await res.json();

        if (!res.ok) {
            empNameEl.textContent = 'Unknown';
            messageEl.textContent = data.error || 'Could not load profile.';
            return;
        }

        // Display the Name from Database
        empNameEl.textContent = data.name || 'Unknown';
        
        // Optional: Save profile to session for later use
        sessionStorage.setItem('eevs_employee_profile', JSON.stringify({
            employeeId: data.employeeId,
            fullName: data.name,
            selfiePath: null,
        }));

    } catch (err) {
        console.error("Network Error:", err);
        empNameEl.textContent = 'Error';
        messageEl.textContent = 'Network error loading profile.';
    }
}

// 4. Run the function when page loads


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