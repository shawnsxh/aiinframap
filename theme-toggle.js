// ================================================================
// THEME SWITCHER — light / dark (shared by all chapters)
// Works together with nav.js for mobile panel sync
// ================================================================
;
var themes = ['light', 'dark'];
var themeLabels = { light: '浅色', dark: '深色' };

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('aiinfra-theme', theme); } catch(e) {}

  // Update desktop switcher buttons
  document.querySelectorAll('.theme-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
  });

  // Update mobile nav theme buttons (injected by nav.js)
  document.querySelectorAll('.mobile-nav-theme-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
  });

  // Update mobile label if exists
  var mobileLabel = document.getElementById('mobileThemeLabel');
  if (mobileLabel) mobileLabel.textContent = themeLabels[theme] || theme;
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

  // Mobile nav theme buttons (also handled by nav.js, but kept here for resilience)
  document.querySelectorAll('.mobile-nav-theme-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var t = btn.getAttribute('data-theme');
      if (typeof setTheme === 'function') setTheme(t);
    });
  });
});
