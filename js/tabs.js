document.querySelectorAll('[data-tabs]').forEach((tabsContainer, groupIndex) => {
  const tabs = tabsContainer.querySelectorAll('.leader-tab');
  const panels = tabsContainer.querySelectorAll('.leader-panel');
  const groupId = `leader-tabs-${groupIndex}`;

  panels.forEach((panel) => {
    const tabName = panel.dataset.tabPanel;
    const panelId = `${groupId}-panel-${tabName}`;
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.hidden = !panel.classList.contains('is-active');
    panel.setAttribute('aria-hidden', String(panel.hidden));
  });

  tabs.forEach((tab) => {
    const tabName = tab.dataset.tab;
    const tabId = `${groupId}-tab-${tabName}`;
    const panelId = `${groupId}-panel-${tabName}`;
    tab.id = tabId;
    tab.setAttribute('aria-controls', panelId);
    const isActive = tab.classList.contains('is-active');
    tab.setAttribute('aria-selected', String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  const activateTab = (tab) => {
    const target = tab.dataset.tab;
    tabs.forEach((btn) => {
      const isActive = btn === tab;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
      btn.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.tabPanel === target;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
      panel.setAttribute('aria-hidden', String(!isActive));
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
      const { key } = event;
      if (key !== 'ArrowRight' && key !== 'ArrowLeft') return;
      event.preventDefault();
      const currentIndex = Array.from(tabs).indexOf(tab);
      const direction = key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
      const nextTab = tabs[nextIndex];
      nextTab.focus();
      activateTab(nextTab);
    });
  });
});
