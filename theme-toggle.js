// ================================================================
// THEME SWITCHER — light / dark (shared by all chapters)
// Works together with nav.js for mobile panel sync
// ================================================================
;
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('aiinfra-theme', theme); } catch(e) {}

  // Update desktop switcher buttons
  document.querySelectorAll('.theme-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
  var saved = 'light';
  try { saved = localStorage.getItem('aiinfra-theme') || 'light'; } catch(e) {}
  setTheme(saved);

  // Desktop switcher clicks
  document.querySelectorAll('.theme-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { setTheme(btn.getAttribute('data-theme')); });
  });
});
