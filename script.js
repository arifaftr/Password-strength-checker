const passwordInput = document.getElementById('password');
const strengthText = document.getElementById('strengthText');
const tips = document.getElementById('tips');
const toggleBtn = document.getElementById('toggleBtn');
const copyBtn = document.getElementById('copyBtn');
const progressBar = document.getElementById('progressBar');
const darkModeToggle = document.getElementById('darkModeToggle');

toggleBtn.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleBtn.textContent = 'Hide';
  } else {
    passwordInput.type = 'password';
    toggleBtn.textContent = 'Show';
  }
});

copyBtn.addEventListener('click', () => {
  const pwd = passwordInput.value;
  if (!pwd) {
    alert('Password is empty!');
    return;
  }
  navigator.clipboard.writeText(pwd).then(() => {
    alert('Password copied to clipboard!');
  }).catch(() => {
    alert('Failed to copy password.');
  });
});

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  let strength = 0;
  let tipsMessages = [];

  if (password.length >= 8) strength++;
  else tipsMessages.push('Use at least 8 characters.');

  if (/[A-Z]/.test(password)) strength++;
  else tipsMessages.push('Add uppercase letters.');

  if (/[a-z]/.test(password)) strength++;
  else tipsMessages.push('Add lowercase letters.');

  if (/\d/.test(password)) strength++;
  else tipsMessages.push('Include numbers.');

  if (/[\W_]/.test(password)) strength++;
  else tipsMessages.push('Include symbols.');

  // Update progress bar and color
  const percent = (strength / 5) * 100;
  progressBar.style.width = percent + '%';

  if (strength === 0) {
    strengthText.textContent = '';
    progressBar.style.backgroundColor = '#eee';
    tips.textContent = '';
    return;
  } else if (strength <= 2) {
    strengthText.textContent = 'Weak';
    strengthText.className = 'strength weak';
    progressBar.style.backgroundColor = 'red';
  } else if (strength === 3 || strength === 4) {
    strengthText.textContent = 'Medium';
    strengthText.className = 'strength medium';
    progressBar.style.backgroundColor = 'orange';
  } else if (strength === 5) {
    strengthText.textContent = 'Strong';
    strengthText.className = 'strength strong';
    progressBar.style.backgroundColor = 'green';
  }

  tips.textContent = 'Tips: ' + tipsMessages.join(' ');
});

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
