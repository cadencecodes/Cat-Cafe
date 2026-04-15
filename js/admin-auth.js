auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = 'login.html';
    return;
  }
  // User is authenticated — reveal the page
  document.querySelector('main').style.visibility = '';
});

document.getElementById('logout-btn').addEventListener('click', () => {
  auth.signOut().then(() => {
    window.location.href = 'login.html';
  });
});
