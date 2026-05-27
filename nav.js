// ================================================================
// NAV.JS — Shared Navigation Selector + Dropdown
// AIinfra Map · Injects header pill + adjacent chapters + dropdown nav
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

  var currentIndex = NAV_LINKS.findIndex(function(link) {
    return link.href === current;
  });
  if (currentIndex === -1) currentIndex = 0;

  var prevIndex = (currentIndex - 1 + NAV_LINKS.length) % NAV_LINKS.length;
  var prevLink = NAV_LINKS[prevIndex];
  var nextIndex = (currentIndex + 1) % NAV_LINKS.length;
  var nextLink = NAV_LINKS[nextIndex];

  var currentLink = NAV_LINKS[currentIndex];
  var selectorLabel = currentLink.label;
  if (currentIndex > 0) {
    var chNum = currentIndex < 10 ? '0' + currentIndex : currentIndex;
    selectorLabel = 'CH' + chNum + ' · ' + currentLink.label;
  }

  var mainNav = document.getElementById('mainNav');
  if (mainNav) {
    var html = '';
    html += '<div class="nav-dropdown-wrap">';
    html += '<a class="nav-arrow nav-prev-arrow" href="' + prevLink.href + '" title="上一章: ' + prevLink.label + '">' +
            '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L4 7L9 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>';

    var adjLabel = function(idx) {
      if (idx === 0) return '<span class="adj-num">INDEX</span>全部章节';
      var n = idx < 10 ? '0' + idx : idx;
      return '<span class="adj-num">CH' + n + '</span>' + NAV_LINKS[idx].label;
    };
    html += '<div class="nav-pills-row">';
    html += '<a class="nav-adjacent-pill" href="' + prevLink.href + '" title="上一章: ' + prevLink.label + '">' + adjLabel(prevIndex) + '</a>';
    html += '<span class="nav-sep">·</span>';
    html += '<button class="nav-selector-pill" id="navSelectorPill">' +
            '<span class="nav-selector-label">' + selectorLabel + '</span>' +
            '<svg class="nav-selector-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
    html += '<span class="nav-sep">·</span>';
    html += '<a class="nav-adjacent-pill" href="' + nextLink.href + '" title="下一章: ' + nextLink.label + '">' + adjLabel(nextIndex) + '</a>';
    html += '</div>';
    html += '<a class="nav-arrow nav-next-arrow" href="' + nextLink.href + '" title="下一章: ' + nextLink.label + '">' +
            '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 11L10 7L5 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>';
    html += '<div class="nav-dropdown" id="navDropdown">' +
      '<div class="nav-dropdown-header">' +
        '<span class="nav-dropdown-title">章节导航 · 共17章</span>' +
        '<button class="nav-dropdown-close" id="navDropdownClose" aria-label="关闭">' +
          '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></div>' +
      '<div class="nav-dropdown-list">';
    for (var i = 0; i < NAV_LINKS.length; i++) {
      var link = NAV_LINKS[i];
      var isActive = link.href === current;
      var chPrefix = i > 0 ? '<span class="dd-num">CH' + (i < 10 ? '0' + i : i) + '</span>' : '<span class="dd-num">INDEX</span>';
      html += '<a href="' + link.href + '" class="nav-dd-item' + (isActive ? ' active' : '') + '">' + chPrefix + '<span class="dd-label">' + link.label + '</span></a>';
    }
    html += '</div></div></div>';
    mainNav.innerHTML = html;
  }

  var logo = document.querySelector('.logo');
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', function () {
      window.location.href = 'index.html';
    });
  }

  var footerText = document.querySelector('.footer-text');
  if (footerText) {
    var pageMeta = document.createElement('span');
    pageMeta.className = 'page-meta-inline';
    pageMeta.textContent = '数据截至 2026.05';
    footerText.appendChild(pageMeta);
  }

  function initDropdown() {
    var pill = document.getElementById('navSelectorPill');
    var dd = document.getElementById('navDropdown');
    var close = document.getElementById('navDropdownClose');
    if (!pill || !dd) return;

    function closeDropdown() { dd.classList.remove('open'); }

    pill.addEventListener('click', function(e) {
      e.stopPropagation();
      dd.classList.toggle('open');
    });

    if (close) close.addEventListener('click', function(e) {
      e.stopPropagation();
      closeDropdown();
    });

    document.addEventListener('click', function(e) {
      var wrap = document.querySelector('.nav-dropdown-wrap');
      if (wrap && !wrap.contains(e.target)) {
        closeDropdown();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeDropdown();
      if (e.key === 'ArrowLeft') {
        var pa = document.querySelector('.nav-prev-arrow');
        if (pa && pa.href) window.location.href = pa.href;
      }
      if (e.key === 'ArrowRight') {
        var na = document.querySelector('.nav-next-arrow');
        if (na && na.href) window.location.href = na.href;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdown);
  } else {
    initDropdown();
  }

})();
