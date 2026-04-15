const tabLogin  = document.getElementById('tab-login');
const tabSignup = document.getElementById('tab-signup');
const form      = document.getElementById('auth-form');
const emailEl   = document.getElementById('auth-email');
const passwordEl= document.getElementById('auth-password');
const submitBtn = document.getElementById('auth-submit');
const errorEl   = document.getElementById('auth-error');

let mode = 'login'; // 'login' | 'signup'

// --- Tab switching ---

tabLogin.addEventListener('click', () => setMode('login'));
tabSignup.addEventListener('click', () => setMode('signup'));

function setMode(newMode) {
  mode = newMode;
  tabLogin.classList.toggle('active', mode === 'login');
  tabSignup.classList.toggle('active', mode === 'signup');
  submitBtn.textContent = mode === 'login' ? 'Log In' : 'Create Account';
  passwordEl.autocomplete = mode === 'login' ? 'current-password' : 'new-password';
  hideError();
}

// --- Error display ---

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.add('visible');
}

function hideError() {
  errorEl.textContent = '';
  errorEl.classList.remove('visible');
}

function friendlyError(code) {
  const messages = {
    'auth/invalid-email':            'That doesn\'t look like a valid email address.',
    'auth/user-not-found':           'No account found with that email.',
    'auth/wrong-password':           'Incorrect password. Please try again.',
    'auth/invalid-credential':       'Incorrect email or password. Please try again.',
    'auth/email-already-in-use':     'An account with that email already exists.',
    'auth/weak-password':            'Password must be at least 6 characters.',
    'auth/too-many-requests':        'Too many attempts. Please wait a moment and try again.',
    'auth/network-request-failed':   'Network error. Check your connection and try again.',
  };
  return messages[code] || 'Something went wrong. Please try again.';
}

// --- Form submit ---

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideError();

  const email    = emailEl.value.trim();
  const password = passwordEl.value;

  if (!email || !password) {
    showError('Please enter your email and password.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = mode === 'login' ? 'Logging in…' : 'Creating account…';

  try {
    if (mode === 'login') {
      await auth.signInWithEmailAndPassword(email, password);
    } else {
      await auth.createUserWithEmailAndPassword(email, password);
    }
    window.location.href = 'admin.html';
  } catch (err) {
    showError(friendlyError(err.code));
    submitBtn.disabled = false;
    submitBtn.textContent = mode === 'login' ? 'Log In' : 'Create Account';
  }
});

// --- Redirect if already signed in, otherwise reveal the form ---

auth.onAuthStateChanged((user) => {
  if (user) {
    window.location.href = 'admin.html';
    return;
  }
  document.querySelector('.login-wrapper').style.visibility = '';
});
