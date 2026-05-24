// ================================================================
// NAV.JS — Shared Navigation Selector + Grid Overlay + Theme Sync
// AIinfra Map · Replaces old navigation bar with unified header selector
// ================================================================

(function () {
  'use strict';

  var NAV_LINKS = [
    { href: 'index.html',              label: '全部章节' },
    { href: 'ch01-overview.html',      label: '全景图' },
    { href: 'ch02-semiconductor.html', label: '半导体制造' },
    { href: 'ch03-eda.html',           label: 'EDA与软件' },
    { href: 'ch04-upstream.html',      label: '上游材料' },
    { href: 'ch05-chips.html',         label: 'AI芯片' },
    { href: 'ch06-memory.html',        label: '存储' },
    { href: 'ch07-packaging.html',     label: '先进封装' },
    { href: 'ch08-optical.html',       label: '光模块' },
    { href: 'ch09-servers.html',       label: '服务器' },
    { href: 'ch10-power.html',         label: '能源电力' },
    { href: 'ch11-cooling.html',       label: '散热液冷' },
    { href: 'ch12-datacenter.html',    label: '数据中心' },
    { href: 'ch13-applications.html',  label: '应用层' },
    { href: 'ch14-risk.html',          label: '风险因素' },
    { href: 'ch15-valuation.html',     label: '估值对比' },
    { href: 'ch16-catalysts.html',     label: '催化剂日历' },
    { href: 'ch17-value.html',         label: '价值分配' },
  ];

  var current = location.pathname.split('/').pop() || 'index.html';
  
  // Find current index
  var currentIndex = NAV_LINKS.findIndex(function(link) {
    return link.href === current;
  });
  if (currentIndex === -1) {
    currentIndex = 0;
  }

  // Pre/Next navigation targets
  var prevIndex = (currentIndex - 1 + NAV_LINKS.length) % NAV_LINKS.length;
  var prevLink = NAV_LINKS[prevIndex];
  var nextIndex = (currentIndex + 1) % NAV_LINKS.length;
  var nextLink = NAV_LINKS[nextIndex];

  // Current formatted label
  var currentLink = NAV_LINKS[currentIndex];
  var selectorLabel = currentLink.label;
  if (currentIndex > 0) {
    var chNum = currentIndex < 10 ? '0' + currentIndex : currentIndex;
    selectorLabel = 'CH' + chNum + ' · ' + currentLink.label;
  }

  // ── 1. Inject Desktop Header Selector ──────────────────────────────
  var mainNav = document.getElementById('mainNav');
  if (mainNav) {
    var html = '';
    // prev arrow
    html += '<a class="nav-arrow nav-prev-arrow" href="' + prevLink.href + '" title="上一章: ' + prevLink.label + '">' +
            '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L4 7L9 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</a>';
    // selector pill
    html += '<button class="nav-selector-pill" id="navSelectorPill">' +
            '<span class="nav-selector-label">' + selectorLabel + '</span>' +
            '<svg class="nav-selector-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</button>';
    // next arrow
    html += '<a class="nav-arrow nav-next-arrow" href="' + nextLink.href + '" title="下一章: ' + nextLink.label + '">' +
            '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 11L10 7L5 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</a>';
    mainNav.innerHTML = html;
  }

  // ── Make Logo Clickable ──────────────────────────────────────────
  var logo = document.querySelector('.logo');
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', function () {
      window.location.href = 'index.html';
    });
  }

  // ── 2. Inject Grid Overlay ──────────────────────────────────────
  var overlay = document.getElementById('globalNavGridOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'globalNavGridOverlay';
    overlay.className = 'global-nav-grid-overlay';
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = 
    '<div class="global-nav-grid-card">' +
      '<div class="global-nav-grid-header">' +
        '<span class="global-nav-grid-title">章节总览</span>' +
        '<button class="global-nav-grid-close" id="globalNavGridClose" aria-label="关闭">' +
          '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="global-nav-grid-list">' +
        NAV_LINKS.map(function(link, index) {
          var isActive = link.href === current;
          var chPrefix = '';
          if (index > 0) {
            var chNum = index < 10 ? '0' + index : index;
            chPrefix = '<span class="grid-item-num">CH' + chNum + '</span>';
          } else {
            chPrefix = '<span class="grid-item-num">INDEX</span>';
          }
          return '<a href="' + link.href + '" class="grid-item-card' + (isActive ? ' active' : '') + '">' +
                   chPrefix +
                   '<span class="grid-item-label">' + link.label + '</span>' +
                 '</a>';
        }).join('') +
      '</div>' +
    '</div>';

  // ── 3. Toggle Logic ─────────────────────────────────────────────
  function initOverlayEvents() {
    var pill  = document.getElementById('navSelectorPill');
    var close = document.getElementById('globalNavGridClose');

    if (!pill || !overlay) return;

    function openOverlay() {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeOverlay() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    pill.addEventListener('click', openOverlay);
    if (close) close.addEventListener('click', closeOverlay);

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeOverlay();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeOverlay();
      }
    });
  }

  // ── Init after DOM ready ─────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOverlayEvents);
  } else {
    initOverlayEvents();
  }

})();
