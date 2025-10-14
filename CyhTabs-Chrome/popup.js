document.addEventListener('DOMContentLoaded', () => {
  const createGroupBtn = document.getElementById('createGroupBtn');
  const groupList = document.getElementById('groupList');
  const searchInput = document.getElementById('searchInput');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const saveGroupBtn = document.getElementById('saveGroupBtn');
  const groupNameInput = document.getElementById('groupNameInput');
  const tabSelectionList = document.getElementById('tabSelectionList');
  const statsText = document.getElementById('statsText');
  const darkModeToggle = document.getElementById('darkModeToggle');

  let currentTabs = [];
  let editingIndex = -1;

  // Function to apply theme
  function applyTheme(isLightMode) {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }

  // Load theme preference
  chrome.storage.sync.get(['isLightMode'], (result) => {
    const isLightMode = result.isLightMode || false; // Default to dark mode
    darkModeToggle.checked = isLightMode;
    applyTheme(isLightMode);
    updateExtensionIcon(isLightMode);
  });

  // Theme toggle listener
  darkModeToggle.addEventListener('change', () => {
    const isLightMode = darkModeToggle.checked;
    applyTheme(isLightMode);
    updateExtensionIcon(isLightMode);
    chrome.storage.sync.set({ isLightMode });
  });

  // Function to update extension icon via background script
  function updateExtensionIcon(isLightMode) {
    chrome.runtime.sendMessage({ action: 'updateIcon', isLightMode: isLightMode });
  }

  // Load and display saved groups
  function loadGroups(filterText = '') {
    chrome.storage.sync.get(['tabGroups'], (result) => {
      const tabGroups = result.tabGroups || [];
      const filteredGroups = filterText 
        ? tabGroups.filter(group => group.name.toLowerCase().includes(filterText.toLowerCase()))
        : tabGroups;
      
      groupList.innerHTML = ''; // Clear existing list
      
      if (filteredGroups.length === 0) {
        groupList.innerHTML = `
          <div class="empty-state">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="16" width="48" height="8" rx="4" fill="#ccc"/>
              <rect x="8" y="28" width="48" height="8" rx="4" fill="#ccc"/>
              <rect x="8" y="40" width="48" height="8" rx="4" fill="#ccc"/>
            </svg>
            <p>${filterText ? 'No groups found' : 'No tab groups saved yet.<br>Click "New" to create your first group!'}</p>
          </div>
        `;
        updateStats(tabGroups.length);
        return;
      }
      
      filteredGroups.forEach((group, index) => {
        const actualIndex = tabGroups.indexOf(group);
        const groupDiv = document.createElement('div');
        groupDiv.className = 'tab-group-item';
        groupDiv.innerHTML = `
          <div class="group-header">
            <span class="group-name">${escapeHtml(group.name)}</span>
            <span class="group-badge">${group.tabs.length} tabs</span>
          </div>
          <div class="group-actions">
            <button class="action-btn open-btn" data-index="${actualIndex}">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 7L6 11L12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Open
            </button>
            <button class="action-btn rename-btn" data-index="${actualIndex}">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2L12 4L5 11H3V9L10 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Rename
            </button>
            <button class="action-btn delete-btn" data-index="${actualIndex}">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Delete
            </button>
          </div>
        `;
        groupList.appendChild(groupDiv);
      });
      
      updateStats(tabGroups.length);
    });
  }

  function updateStats(count) {
    statsText.textContent = `${count} group${count !== 1 ? 's' : ''} saved`;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Show modal for creating a new group
  createGroupBtn.addEventListener('click', () => {
    editingIndex = -1;
    document.getElementById('modalTitle').textContent = 'Create New Group';
    groupNameInput.value = 'New Group';
    
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      currentTabs = tabs;
      tabSelectionList.innerHTML = '';
      
      tabs.forEach((tab, index) => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'tab-checkbox-item';
        checkboxDiv.innerHTML = `
          <input type="checkbox" id="tab-${index}" checked>
          <label for="tab-${index}">${escapeHtml(tab.title || tab.url)}</label>
        `;
        tabSelectionList.appendChild(checkboxDiv);
      });
      
      modal.classList.add('active');
    });
  });

  // Close modal
  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  cancelBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Save group
  saveGroupBtn.addEventListener('click', () => {
    const groupName = groupNameInput.value.trim();
    if (!groupName) {
      alert('Please enter a group name.');
      return;
    }

    const selectedTabs = [];
    const checkboxes = tabSelectionList.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked && currentTabs[index]) {
        selectedTabs.push({
          url: currentTabs[index].url,
          title: currentTabs[index].title
        });
      }
    });

    if (selectedTabs.length === 0) {
      alert('Please select at least one tab.');
      return;
    }

    chrome.storage.sync.get(['tabGroups'], (result) => {
      const tabGroups = result.tabGroups || [];
      
      if (editingIndex >= 0) {
        // Editing existing group
        tabGroups[editingIndex] = { name: groupName, tabs: selectedTabs };
      } else {
        // Creating new group
        tabGroups.push({ name: groupName, tabs: selectedTabs });
      }
      
      chrome.storage.sync.set({ tabGroups }, () => {
        loadGroups();
        modal.classList.remove('active');
      });
    });
  });

  // Event listener for opening, renaming, and deleting groups
  groupList.addEventListener('click', (event) => {
    const target = event.target.closest('button');
    if (!target) return;

    const index = parseInt(target.dataset.index);

    if (target.classList.contains('open-btn')) {
      chrome.storage.sync.get(['tabGroups'], (result) => {
        const tabGroups = result.tabGroups || [];
        const groupToOpen = tabGroups[index];
        if (groupToOpen) {
          groupToOpen.tabs.forEach(tab => {
            chrome.tabs.create({ url: tab.url });
          });
        }
      });
    } else if (target.classList.contains('rename-btn')) {
      chrome.storage.sync.get(['tabGroups'], (result) => {
        const tabGroups = result.tabGroups || [];
        const groupToEdit = tabGroups[index];
        
        editingIndex = index;
        document.getElementById('modalTitle').textContent = 'Edit Group';
        groupNameInput.value = groupToEdit.name;
        
        currentTabs = groupToEdit.tabs;
        tabSelectionList.innerHTML = '';
        
        groupToEdit.tabs.forEach((tab, tabIndex) => {
          const checkboxDiv = document.createElement('div');
          checkboxDiv.className = 'tab-checkbox-item';
          checkboxDiv.innerHTML = `
            <input type="checkbox" id="tab-${tabIndex}" checked>
            <label for="tab-${tabIndex}">${escapeHtml(tab.title || tab.url)}</label>
          `;
          tabSelectionList.appendChild(checkboxDiv);
        });
        
        modal.classList.add('active');
      });
    } else if (target.classList.contains('delete-btn')) {
      if (confirm('Are you sure you want to delete this tab group?')) {
        chrome.storage.sync.get(['tabGroups'], (result) => {
          let tabGroups = result.tabGroups || [];
          tabGroups.splice(index, 1);
          chrome.storage.sync.set({ tabGroups }, () => {
            loadGroups();
          });
        });
      }
    }
  });

  // Search functionality
  searchInput.addEventListener('input', (event) => {
    loadGroups(event.target.value);
  });

  // Initial load
  loadGroups();
});

