// Survey Builder — Creator-side Survey Editing flow
// Selection: one of page | section | question. Panels sync to selection.
// Question type → response type mapping (aligned with Enculture Survey Respondent Flow — Architecture Schema)

const QUESTION_TYPE_OPTIONS = ['Single select', 'Multiple select', 'Open text'];

const RESPONSE_TYPES_BY_QUESTION_TYPE = {
  'Single select': ['Radio button', 'Drop down', 'Rating icon', 'NPS'],
  'Multiple select': ['Check box', 'Drop down'],
  'Open text': ['Text', 'Date', 'Numeric', 'List']
};

function getResponseTypesForQuestionType(questionType) {
  return RESPONSE_TYPES_BY_QUESTION_TYPE[questionType] || RESPONSE_TYPES_BY_QUESTION_TYPE['Single select'];
}

function getDefaultResponseTypeForQuestionType(questionType) {
  const list = getResponseTypesForQuestionType(questionType);
  return list[0] || 'Radio button';
}

const surveyData = {
  pagesPerPage: 10,
  pages: [
    {
      id: 1,
      name: 'Page 1',
      instructions: '',
      sections: [
        {
          id: 1,
          name: 'Section 1: Work Environment',
          description: '',
          instructions: '',
          questions: [
            {
              id: 1,
              questionNumber: 'Q1',
              text: 'How satisfied are you with your current work environment?',
              questionType: 'Single select',
              responseType: 'Radio button',
              layout: 'Vertical',
              category: 'Work Environment',
              instructions: '',
              classifiers: ['', '', '', '', ''],
              ratingScale: '5 point rating scale',
              options: [
                { value: 1, label: 'Strongly disagree' },
                { value: 2, label: 'Disagree' },
                { value: 3, label: 'Neutral' },
                { value: 4, label: 'Agree' },
                { value: 5, label: 'Strongly agree' }
              ],
              selectedOption: 1,
              tags: ['First', 'Second', 'Third'],
              attributes: {
                objective: '',
                metrics: '',
                questionTemplates: '',
                outcome: '',
                results: '',
                surveyTemplates: ''
              },
              properties: {
                required: true,
                addOther: true,
                addNotApplicable: false,
                reverseOrderRange: false,
                allowComments: true
              }
            },
            {
              id: 2,
              questionNumber: 'Q2',
              text: 'How satisfied are you with your team collaboration?',
              questionType: 'Single select',
              responseType: 'Scale of 1-5',
              layout: 'Vertical',
              category: 'Work Environment',
              instructions: '',
              classifiers: ['', '', '', '', ''],
              ratingScale: '5 point rating scale',
              options: [
                { value: 1, label: 'Strongly disagree' },
                { value: 2, label: 'Disagree' },
                { value: 3, label: 'Neutral' },
                { value: 4, label: 'Agree' },
                { value: 5, label: 'Strongly agree' }
              ],
              selectedOption: null,
              tags: [],
              attributes: {
                objective: '',
                metrics: '',
                questionTemplates: '',
                outcome: '',
                results: '',
                surveyTemplates: ''
              },
              properties: {
                required: true,
                addOther: false,
                addNotApplicable: false,
                reverseOrderRange: false,
                allowComments: false
              }
            },
            {
              id: 3,
              questionNumber: 'Q3',
              text: 'How satisfied are you with your work-life balance?',
              questionType: 'Single select',
              responseType: 'Radio button',
              layout: 'Vertical',
              category: 'Work Environment',
              instructions: '',
              classifiers: ['', '', '', '', ''],
              ratingScale: '5 point rating scale',
              options: [
                { value: 1, label: 'Strongly disagree' },
                { value: 2, label: 'Disagree' },
                { value: 3, label: 'Neutral' },
                { value: 4, label: 'Agree' },
                { value: 5, label: 'Strongly agree' }
              ],
              selectedOption: null,
              tags: [],
              attributes: {
                objective: '',
                metrics: '',
                questionTemplates: '',
                outcome: '',
                results: '',
                surveyTemplates: ''
              },
              properties: {
                required: false,
                addOther: false,
                addNotApplicable: false,
                reverseOrderRange: false,
                allowComments: false
              }
            }
          ]
        },
        {
          id: 2,
          name: 'Section 2: Work Culture',
          description: '',
          instructions: '',
          questions: []
        }
      ]
    },
    {
      id: 2,
      name: 'Page 2',
      instructions: '',
      sections: []
    }
  ]
};

// Single selection: { type: 'page'|'section'|'question', id }
let selection = { type: 'question', id: 2 };

// Properties drawer: open when 1+ questions selected (from left panel or section form multi-select)
let selectedQuestionIdsForProperties = [2];

// Section edit form: selection within current section only (for bulk delete/move — not global properties)
let selectedQuestionIdsInSection = [];

// Page edit form: selection for sections and questions (for bulk delete)
let selectedPageItemIds = { sections: [], questions: [] };
let expandedPageSections = new Set();

function setSelection(type, id) {
  selection = { type, id };
  if (type === 'question') {
    selectedQuestionIdsForProperties = [id];
    openPropertiesDrawer();
  } else {
    selectedQuestionIdsForProperties = [];
    closePropertiesDrawer();
  }
  // Reset page form selection when switching away from page
  if (type !== 'page') {
    selectedPageItemIds = { sections: [], questions: [] };
  }
  syncPanels();
}

function syncPanels() {
  renderSurveyStructure();
  renderEditCanvas();
  renderProperties();
  updateDrawerVisibility();
  // #region agent log
  requestAnimationFrame(function () {
    var selects = document.querySelectorAll('select.enc-input-field');
    var root = document.documentElement;
    var rootStyle = root && getComputedStyle(root);
    var tokenPaddingX = rootStyle ? rootStyle.getPropertyValue('--control-padding-x').trim() || 'unset' : 'unset';
    var tokenGapMd = rootStyle ? rootStyle.getPropertyValue('--stack-gap-md').trim() || 'unset' : 'unset';
    for (var i = 0; i < Math.min(selects.length, 5); i++) {
      var el = selects[i];
      var s = getComputedStyle(el);
      var opt = el.options[el.selectedIndex];
      var optText = opt ? opt.text.length : 0;
      var body = { hypothesisId: 'H1', location: 'app.js:syncPanels', message: 'select padding/width', data: { index: i, id: el.id || '', paddingLeft: s.paddingLeft, paddingRight: s.paddingRight, paddingTop: s.paddingTop, paddingBottom: s.paddingBottom, width: s.width, clientWidth: el.clientWidth, boxSizing: s.boxSizing, appearance: s.appearance, tokenControlPaddingX: tokenPaddingX, tokenStackGapMd: tokenGapMd, selectedOptionTextLength: optText }, timestamp: Date.now(), sessionId: 'debug-session' };
      fetch('http://127.0.0.1:7242/ingest/704c6818-894d-4922-b709-dfe2653d393c', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(function () {});
    }
  });
  // #endregion
}

function openPropertiesDrawer() {
  const drawer = document.getElementById('properties-drawer');
  const overlay = document.getElementById('properties-drawer-overlay');
  const trigger = document.getElementById('properties-drawer-trigger');
  if (drawer) drawer.classList.add('enc-drawer-open');
  if (drawer) drawer.setAttribute('aria-hidden', 'false');
  if (overlay) overlay.classList.add('enc-drawer-overlay-visible');
  if (overlay) overlay.setAttribute('aria-hidden', 'false');
  if (trigger) trigger.setAttribute('aria-expanded', 'true');
}

function closePropertiesDrawer() {
  const drawer = document.getElementById('properties-drawer');
  const overlay = document.getElementById('properties-drawer-overlay');
  const trigger = document.getElementById('properties-drawer-trigger');
  if (drawer) {
    drawer.classList.remove('enc-drawer-open');
    drawer.setAttribute('aria-hidden', 'true');
  }
  if (overlay) overlay.classList.remove('enc-drawer-overlay-visible');
  if (overlay) overlay.setAttribute('aria-hidden', 'true');
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
}

function togglePropertiesDrawer() {
  if (window.innerWidth > 1024) return;
  const drawer = document.getElementById('properties-drawer');
  if (!drawer) return;
  if (drawer.classList.contains('enc-drawer-open')) closePropertiesDrawer();
  else openPropertiesDrawer();
}

function updateDrawerVisibility() {
  if (selectedQuestionIdsForProperties.length > 0) {
    openPropertiesDrawer();
  } else {
    closePropertiesDrawer();
  }
}

function togglePageSettingsPopover(event) {
  if (event) event.stopPropagation();
  const popover = document.getElementById('page-settings-popover');
  const trigger = document.getElementById('page-settings-trigger');
  const input = document.getElementById('questions-per-page-input');
  if (!popover || !trigger) return;
  const isOpen = popover.classList.contains('enc-popover-open');
  if (isOpen) {
    closePageSettingsPopover();
    return;
  }
  popover.classList.add('enc-popover-open');
  popover.setAttribute('aria-hidden', 'false');
  trigger.setAttribute('aria-expanded', 'true');
  var rect = trigger.getBoundingClientRect();
  var gap = 8;
  popover.style.left = (rect.right + gap) + 'px';
  popover.style.top = rect.top + 'px';
  if (input) input.value = surveyData.pagesPerPage || 10;
  document.addEventListener('click', pageSettingsClickOutside);
}

function closePageSettingsPopover() {
  const popover = document.getElementById('page-settings-popover');
  const trigger = document.getElementById('page-settings-trigger');
  if (popover) {
    popover.classList.remove('enc-popover-open');
    popover.setAttribute('aria-hidden', 'true');
    popover.style.left = '';
    popover.style.top = '';
  }
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', pageSettingsClickOutside);
}

function pageSettingsClickOutside(e) {
  const card = document.getElementById('page-settings-card');
  if (card && !card.contains(e.target)) closePageSettingsPopover();
}

function applyQuestionsPerPage(value) {
  const num = Math.min(50, Math.max(1, parseInt(value, 10) || 10));
  surveyData.pagesPerPage = num;
  const meta = document.getElementById('questions-per-page-meta');
  if (meta) meta.textContent = 'Questions per page : ' + num;
  const input = document.getElementById('questions-per-page-input');
  if (input) input.value = num;
  renderSurveyStructure();
  closePageSettingsPopover();
}

function toggleQuestionForProperties(questionId) {
  const i = selectedQuestionIdsForProperties.indexOf(questionId);
  if (i === -1) {
    selectedQuestionIdsForProperties.push(questionId);
  } else {
    selectedQuestionIdsForProperties.splice(i, 1);
  }
  updateDrawerVisibility();
  renderProperties();
  renderEditCanvas();
}

function getSectionIndexInPage(sectionId) {
  for (const page of surveyData.pages) {
    const idx = (page.sections || []).findIndex(s => s.id === sectionId);
    if (idx !== -1) return { page, index: idx + 1 };
  }
  return { page: null, index: 1 };
}

function toggleQuestionSelectionInSection(questionId) {
  const i = selectedQuestionIdsInSection.indexOf(questionId);
  if (i === -1) selectedQuestionIdsInSection.push(questionId);
  else selectedQuestionIdsInSection.splice(i, 1);
  renderEditCanvas();
}

function toggleSectionSelectAll(sectionId) {
  const section = findSection(sectionId);
  if (!section || !section.questions) return;
  const ids = section.questions.map(q => q.id);
  const allSelected = ids.every(id => selectedQuestionIdsInSection.indexOf(id) !== -1);
  if (allSelected) selectedQuestionIdsInSection = selectedQuestionIdsInSection.filter(id => ids.indexOf(id) === -1);
  else selectedQuestionIdsInSection = [...new Set([...selectedQuestionIdsInSection, ...ids])];
  renderEditCanvas();
}

function clearSectionSelection() {
  selectedQuestionIdsInSection = [];
  renderEditCanvas();
}

function deleteSelectedQuestionsInSection() {
  if (selectedQuestionIdsInSection.length === 0) return;
  if (!confirm('Delete ' + selectedQuestionIdsInSection.length + ' selected question(s)?')) return;
  const section = findSection(selection.id);
  if (!section || selection.type !== 'section') return;
  const page = surveyData.pages.find(p => p.sections.some(s => s.id === section.id));
  section.questions = (section.questions || []).filter(q => selectedQuestionIdsInSection.indexOf(q.id) === -1);
  selectedQuestionIdsInSection = [];
  if (page) renumberQuestionsInPage(page.id);
  syncPanels();
}

function deleteSection(sectionId) {
  if (!confirm('Are you sure you want to delete this section and all its questions?')) return;
  for (const page of surveyData.pages) {
    const idx = (page.sections || []).findIndex(s => s.id === sectionId);
    if (idx !== -1) {
      page.sections.splice(idx, 1);
      renumberQuestionsInPage(page.id);
      break;
    }
  }
  setSelection('page', surveyData.pages[0]?.id || null);
  syncPanels();
}

function deletePage(pageId) {
  if (!confirm('Are you sure you want to delete this page and all its sections and questions?')) return;
  const idx = surveyData.pages.findIndex(p => p.id === pageId);
  if (idx !== -1) {
    surveyData.pages.splice(idx, 1);
  }
  setSelection('page', surveyData.pages[0]?.id || null);
  syncPanels();
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  // Ensure all questions are properly numbered on load
  renumberAllQuestions();
  syncPanels();
  updateDrawerVisibility();
  bindStructureCalloutPositioning();
});

// Count questions on a page (for "X / 10 questions" display)
function getPageQuestionCount(page) {
  return (page.sections || []).reduce((sum, s) => sum + (s.questions || []).length, 0);
}

// Render survey structure tree — enc-list-row, hierarchy spacing, question count, icons
function renderSurveyStructure() {
  const container = document.getElementById('survey-structure');
  const metaEl = document.getElementById('questions-per-page-meta');
  if (!container) return;
  if (metaEl) metaEl.textContent = 'Questions per page : ' + (surveyData.pagesPerPage || 10);

  const questionsPerPage = surveyData.pagesPerPage || 10;
  let html = '';

  surveyData.pages.forEach((page, pageIndex) => {
    const pageQuestionCount = getPageQuestionCount(page);
    const isPageSelected = selection.type === 'page' && selection.id === page.id;
    html += `
      <div class="enc-structure-page-block ${isPageSelected ? 'enc-structure-page-block-selected' : ''}">
        <div class="enc-list-row enc-structure-page-row"
             data-type="page" data-id="${page.id}"
             role="button" tabindex="0" aria-selected="${isPageSelected}"
             onclick="selectPage(${page.id})" onkeydown="if(event.key==='Enter') selectPage(${page.id})">
          <span class="enc-drag-handle" aria-hidden="true" onclick="event.stopPropagation()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
          </span>
          <span class="enc-structure-icon enc-structure-icon-page" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </span>
          <span class="enc-list-row-label">
            <span>${page.name}</span>
            <span class="enc-structure-meta enc-text-muted">${pageQuestionCount} / ${questionsPerPage} questions</span>
          </span>
          <div class="enc-list-row-actions">
            <button type="button" class="enc-icon-button enc-icon-button-xs" aria-label="More options" onclick="event.stopPropagation()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="18" r="1.5"/></svg>
            </button>
          </div>
        </div>
        <div class="enc-structure-page-children">
    `;

    page.sections.forEach((section) => {
      const isSectionSelected = selection.type === 'section' && selection.id === section.id;
      html += `
          <div class="enc-structure-section-block ${isSectionSelected ? 'enc-structure-section-block-selected' : ''}">
            <button type="button"
                    class="enc-structure-section-heading ${isSectionSelected ? 'enc-structure-section-heading-selected' : ''}"
                    data-type="section" data-id="${section.id}"
                    aria-selected="${isSectionSelected}"
                    onclick="selectSection(${section.id})" onkeydown="if(event.key==='Enter') selectSection(${section.id})">
              <span class="enc-drag-handle" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
              </span>
              ${section.name}
            </button>
            <ul class="enc-structure-questions" role="list">
      `;

      section.questions.forEach((question) => {
        const isQuestionSelected = selection.type === 'question' && selection.id === question.id;
        const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
        const fullTextEscaped = esc(question.text).replace(/\n/g, '<br>');
        html += `
          <li class="enc-structure-question-item">
            <button type="button"
                    class="enc-structure-nav-item enc-structure-question-row ${isQuestionSelected ? 'enc-structure-nav-item-active' : ''}"
                    data-type="question" data-id="${question.id}"
                    aria-selected="${isQuestionSelected}"
                    onclick="selectQuestion(${question.id})" onkeydown="if(event.key==='Enter') selectQuestion(${question.id})">
              <span class="enc-drag-handle" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
              </span>
              <span class="enc-structure-nav-dot ${isQuestionSelected ? 'enc-structure-nav-dot-active' : 'enc-structure-nav-dot-pending'}" aria-hidden="true"></span>
              <span class="enc-structure-question-label-wrap">
                <span class="enc-structure-question-label">${question.questionNumber}. ${question.text} · ${question.questionType || ''}</span>
                <div class="enc-structure-callout" role="tooltip">
                  <p class="enc-structure-callout-title">${question.questionNumber}</p>
                  <p class="enc-structure-callout-text">${fullTextEscaped}</p>
                  <p class="enc-structure-callout-meta enc-text-muted">${(() => {
                    const classifiers = Array.isArray(question.classifiers) ? question.classifiers.filter(c => c && c.trim()).join(', ') : '';
                    const ratingScale = question.ratingScale || '';
                    let meta = `${question.questionType || ''}${question.responseType ? ' · ' + question.responseType : ''}`;
                    if (classifiers) meta += ` · ${classifiers}`;
                    if (ratingScale && (ratingScale.includes('5 point') || ratingScale.includes('7 point'))) {
                      meta += ` · ${ratingScale}`;
                    }
                    return meta;
                  })()}</p>
                </div>
              </span>
            </button>
          </li>
        `;
      });

      html += `
            </ul>
            <button type="button" class="enc-structure-add-button enc-structure-add-question" onclick="addQuestion(${section.id})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Question
            </button>
          </div>
      `;
    });

    html += `
          <button type="button" class="enc-structure-add-button" onclick="addSection(${page.id})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Section
          </button>
        </div>
      </div>
    `;
  });

  html += `
    <button type="button" class="enc-structure-add-button" onclick="addPage()">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Add page
    </button>
  `;

  container.innerHTML = html;
}

function bindStructureCalloutPositioning() {
  const tree = document.getElementById('survey-structure');
  if (!tree) return;
  const gap = 8;
  tree.addEventListener('mouseenter', function (e) {
    const navItem = e.target.closest('.enc-structure-nav-item');
    if (!navItem) return;
    const callout = navItem.querySelector('.enc-structure-callout');
    if (!callout) return;
    const rect = navItem.getBoundingClientRect();
    callout.style.left = (rect.right + gap) + 'px';
    callout.style.top = rect.top + 'px';
    callout.classList.add('enc-structure-callout-visible');
  }, true);
  tree.addEventListener('mouseleave', function (e) {
    const navItem = e.target.closest('.enc-structure-nav-item');
    if (!navItem || navItem.contains(e.relatedTarget)) return;
    const callout = navItem.querySelector('.enc-structure-callout');
    if (callout) callout.classList.remove('enc-structure-callout-visible');
  }, true);
}

function findPage(id) {
  return surveyData.pages.find(p => p.id === id) || null;
}

function findSection(id) {
  for (const page of surveyData.pages) {
    const section = page.sections.find(s => s.id === id);
    if (section) return section;
  }
  return null;
}

// Find question by ID
function findQuestion(id) {
  for (const page of surveyData.pages) {
    for (const section of page.sections) {
      const question = section.questions.find(q => q.id === id);
      if (question) return question;
    }
  }
  return null;
}

// Center panel: one edit context at a time — Page | Section | Question
function renderEditCanvas() {
  const headerContainer = document.querySelector('.enc-edit-header');
  const contentContainer = document.getElementById('edit-question-content');
  if (!headerContainer || !contentContainer) return;

  if (selection.type === 'page') {
    const page = findPage(selection.id);
    if (!page) return;
    headerContainer.innerHTML = `
      <div>
        <h2 class="enc-edit-title">Edit Page</h2>
        <p class="enc-edit-description">Configure the details and the options for the selected page.</p>
      </div>
      <div class="enc-edit-header-actions">
        <button type="button" class="enc-icon-button enc-icon-button-sm enc-icon-button-danger" aria-label="Delete page" onclick="deletePage(${page.id})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </div>
    `;
    contentContainer.innerHTML = renderPageEditForm(page);
    return;
  }
  if (selection.type === 'section') {
    const section = findSection(selection.id);
    if (!section) return;
    headerContainer.innerHTML = `
      <div>
        <h2 class="enc-edit-title">Edit Section</h2>
        <p class="enc-edit-description">Configure the details and the options for the selected section.</p>
      </div>
      <div class="enc-edit-header-actions">
        <button type="button" class="enc-icon-button enc-icon-button-sm enc-icon-button-danger" aria-label="Delete section" onclick="deleteSection(${section.id})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </div>
    `;
    contentContainer.innerHTML = renderSectionEditForm(section);
    return;
  }
  // selection.type === 'question'
  const question = findQuestion(selection.id);
  if (!question) return;
  headerContainer.innerHTML = `
    <div>
      <h2 class="enc-edit-title">Edit Question</h2>
      <p class="enc-edit-description">Configure the details and the options for the selected question.</p>
    </div>
    <div class="enc-edit-header-actions">
      <button type="button" id="properties-drawer-trigger" class="enc-icon-button enc-icon-button-sm enc-properties-drawer-trigger" aria-label="Question properties" aria-expanded="false" onclick="togglePropertiesDrawer()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-1.17A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h1.17A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v1.17a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-1.17a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </button>
      <button type="button" class="enc-icon-button enc-icon-button-sm enc-icon-button-danger" aria-label="Delete question" onclick="deleteSelectedQuestion()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
      </button>
    </div>
  `;
  contentContainer.innerHTML = renderQuestionEditForm(question);
}

function renderPageEditForm(page) {
  const pageIndex = surveyData.pages.findIndex(p => p.id === page.id) + 1;
  const sections = page.sections || [];
  const totalQuestions = sections.reduce((sum, s) => sum + (s.questions || []).length, 0);
  const totalPages = surveyData.pages.length;
  const totalSections = sections.length;
  const hasSelection = selectedPageItemIds.sections.length > 0 || selectedPageItemIds.questions.length > 0;
  
  // Initialize expanded sections if empty
  if (expandedPageSections.size === 0 && sections.length > 0) {
    sections.forEach(s => expandedPageSections.add(s.id));
  }
  
  const sectionsList = sections.map(s => {
    const isExpanded = expandedPageSections.has(s.id);
    const isSectionSelected = selectedPageItemIds.sections.includes(s.id);
    const questions = s.questions || [];
    const esc = (str) => (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    
    return `
      <div class="enc-page-section-accordion">
        <div class="enc-page-section-header ${isSectionSelected ? 'enc-page-section-header-selected' : ''}" 
             role="button" tabindex="0"
             onclick="if(event.target.type !== 'checkbox') togglePageSectionSelection(${s.id})" 
             onkeydown="if(event.key==='Enter') togglePageSectionSelection(${s.id})">
          <div class="enc-page-section-header-left">
            <span class="enc-drag-handle" aria-hidden="true" onclick="event.stopPropagation()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
            </span>
            <input type="checkbox" 
                   class="enc-page-section-checkbox" 
                   ${isSectionSelected ? 'checked' : ''}
                   onclick="event.stopPropagation(); togglePageSectionSelection(${s.id})"
                   aria-label="Select section ${esc(s.name)}">
            <button type="button" 
                    class="enc-page-section-chevron ${isExpanded ? 'enc-page-section-chevron-expanded' : ''}"
                    aria-expanded="${isExpanded}"
                    aria-label="${isExpanded ? 'Collapse' : 'Expand'} section"
                    onclick="event.stopPropagation(); togglePageSectionExpand(${s.id})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <span class="enc-page-section-title">${esc(s.name)}</span>
          </div>
        </div>
        <div class="enc-page-section-body ${isExpanded ? 'enc-page-section-body-expanded' : ''}">
          ${questions.map(q => {
            const isQuestionSelected = selectedPageItemIds.questions.includes(q.id);
            const questionText = esc(q.text);
            const classifiers = Array.isArray(q.classifiers) ? q.classifiers.filter(c => c && c.trim()).join(', ') : '';
            const ratingScale = q.ratingScale || '';
            let questionMeta = `${q.questionType || ''}${q.responseType ? ' - ' + q.responseType : ''}`;
            if (classifiers) questionMeta += ` · ${classifiers}`;
            if (ratingScale && (ratingScale.includes('5 point') || ratingScale.includes('7 point'))) {
              questionMeta += ` · ${ratingScale}`;
            }
            return `
              <div class="enc-page-question-row ${isQuestionSelected ? 'enc-page-question-row-selected' : ''}"
                   role="button" tabindex="0"
                   onclick="if(event.target.type !== 'checkbox') togglePageQuestionSelection(${q.id})"
                   onkeydown="if(event.key==='Enter') togglePageQuestionSelection(${q.id})">
                <span class="enc-drag-handle" aria-hidden="true" onclick="event.stopPropagation()">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
                </span>
                <input type="checkbox" 
                       class="enc-page-question-checkbox" 
                       ${isQuestionSelected ? 'checked' : ''}
                       onclick="event.stopPropagation(); togglePageQuestionSelection(${q.id})"
                       aria-label="Select question ${q.questionNumber}">
                <div class="enc-page-question-content">
                  <div class="enc-page-question-text">${q.questionNumber}. ${questionText}</div>
                  <div class="enc-page-question-meta enc-text-muted">${questionMeta}</div>
                </div>
              </div>
            `;
          }).join('')}
          ${questions.length < 10 ? `
            <div class="enc-page-add-question-wrap">
              <button type="button" class="enc-structure-add-button" onclick="addQuestion(${s.id})">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Question
              </button>
            </div>
          ` : `
            <div class="enc-page-add-question-wrap">
              <button type="button" class="enc-structure-add-button" disabled>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Question
              </button>
            </div>
          `}
        </div>
      </div>
    `;
  }).join('');
  
  return `
    <div class="enc-edit-section enc-card enc-edit-section-full">
      <div class="enc-form-row">
        <span class="enc-form-label">Page Number</span>
        <span class="enc-page-number-display" id="page-number" aria-live="polite">${pageIndex}</span>
      </div>
      <div class="enc-form-row">
        <label class="enc-form-label" for="page-instructions">Page instructions</label>
        <textarea id="page-instructions" class="enc-input-field" rows="4" placeholder="Please answer all questions on this section honestly. Your feedback about work culture is crucial for improving management practices There are no right or wrong answers — please select the options that best reflect your experience." onchange="updatePageField('instructions', this.value)">${(page.instructions || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')}</textarea>
      </div>
      <div class="enc-form-row">
        <button type="button" class="enc-translate-link" onclick="translatePageInstructions()">
          <span class="enc-translate-icon" aria-hidden="true">A文</span>
          Translate Page instructions
        </button>
      </div>
    </div>
    <div class="enc-edit-section enc-card enc-edit-section-full">
      <div class="enc-page-sections-header">
        <h3 class="enc-edit-section-title">All sections</h3>
        <div class="enc-page-sections-header-actions">
          <span class="enc-page-counts enc-text-muted">Page ${pageIndex}/${totalPages} · ${totalSections} sections · ${totalQuestions} questions</span>
          <button type="button" 
                  class="enc-action-danger enc-action-icon ${hasSelection ? '' : 'enc-action-disabled'}" 
                  ${hasSelection ? `onclick="deleteSelectedPageItems()"` : 'disabled'}
                  aria-disabled="${!hasSelection}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            Delete
          </button>
        </div>
      </div>
      ${sectionsList || '<p class="enc-text-muted">No sections yet.</p>'}
      <div class="enc-page-add-section-wrap">
        <button type="button" class="enc-structure-add-button" onclick="addSection(${page.id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          + Section
        </button>
      </div>
    </div>
  `;
}

function renderSectionEditForm(section) {
  const questions = section.questions || [];
  const { index: sectionIndex } = getSectionIndexInPage(section.id);
  const rawName = section.name || 'Untitled';
  const redundantPrefix = new RegExp('^Section\\s*' + sectionIndex + '\\s*[\\s:]+', 'i');
  const namePart = redundantPrefix.test(rawName) ? rawName.replace(redundantPrefix, '').trim() || rawName : rawName;
  const sectionTitle = 'Section ' + sectionIndex + ' : ' + namePart;
  const allInSectionSelected = questions.length > 0 && questions.every(q => selectedQuestionIdsInSection.indexOf(q.id) !== -1);
  const sectionHeaderChecked = questions.length === 0 ? false : allInSectionSelected;

  const questionRows = questions.map(q => {
    const checked = selectedQuestionIdsInSection.indexOf(q.id) !== -1;
    const classifiers = Array.isArray(q.classifiers) ? q.classifiers.filter(c => c && c.trim()).join(', ') : '';
    const ratingScale = q.ratingScale || '';
    let responseLabel = (q.questionType || 'Single select') + (q.responseType ? ' – ' + q.responseType : '');
    if (classifiers) responseLabel += ` · ${classifiers}`;
    if (ratingScale && (ratingScale.includes('5 point') || ratingScale.includes('7 point'))) {
      responseLabel += ` · ${ratingScale}`;
    }
    return `
    <div class="enc-edit-section-question-row" data-question-id="${q.id}">
      <span class="enc-drag-handle" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
      </span>
      <label class="enc-edit-section-question-checkbox-wrap">
        <input type="checkbox" class="enc-input-field enc-checkbox" ${checked ? 'checked' : ''} onchange="toggleQuestionSelectionInSection(${q.id})" aria-label="Select question ${q.questionNumber}">
      </label>
      <button type="button" class="enc-edit-section-question-body" onclick="selectQuestion(${q.id})" aria-label="Edit question ${q.questionNumber}">
        <span class="enc-edit-section-question-text">${q.questionNumber}. ${(q.text || '').substring(0, 80)}${(q.text || '').length > 80 ? '…' : ''}</span>
        <span class="enc-edit-section-question-meta enc-text-muted">${responseLabel}</span>
      </button>
    </div>
  `;
  }).join('');

  const bulkActionsBar = selectedQuestionIdsInSection.length > 0
    ? `<div class="enc-edit-section-bulk-actions">
        <span class="enc-text-muted">${selectedQuestionIdsInSection.length} selected</span>
        <button type="button" class="enc-action-secondary" onclick="clearSectionSelection()">Clear</button>
        <button type="button" class="enc-action-danger" onclick="deleteSelectedQuestionsInSection()">Delete selected</button>
       </div>`
    : '';

  return `
    <div class="enc-edit-section enc-card">
      <div class="enc-form-row">
        <label class="enc-form-label" for="section-name">Section name</label>
        <input type="text" id="section-name" class="enc-input-field" value="${(section.name || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')}" onchange="updateSectionField('name', this.value)" placeholder="Section name">
      </div>
      <div class="enc-form-row">
        <label class="enc-form-label" for="section-description">Section description</label>
        <textarea id="section-description" class="enc-input-field" rows="2" placeholder="Please type here" onchange="updateSectionField('description', this.value)">${(section.description || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')}</textarea>
      </div>
      <div class="enc-form-row">
        <label class="enc-form-label" for="section-instructions">Section instructions</label>
        <textarea id="section-instructions" class="enc-input-field" rows="4" placeholder="Please answer all questions on this section honestly..." onchange="updateSectionField('instructions', this.value)">${(section.instructions || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')}</textarea>
      </div>
      <div class="enc-form-row">
        <button type="button" class="enc-translate-link" onclick="translateSectionInstructions()">
          <span class="enc-translate-icon" aria-hidden="true">A文</span>
          Translate section instructions
        </button>
      </div>
    </div>
    <div class="enc-edit-section enc-card enc-edit-section-full enc-edit-section-questions-block">
      <div class="enc-edit-section-list-header" role="button" tabindex="0" onclick="toggleSectionSelectAll(${section.id})" onkeydown="if(event.key==='Enter') toggleSectionSelectAll(${section.id})">
        <span class="enc-drag-handle" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
        </span>
        <label class="enc-edit-section-question-checkbox-wrap" onclick="event.stopPropagation()">
          <input type="checkbox" class="enc-input-field enc-checkbox" ${sectionHeaderChecked ? 'checked' : ''} onchange="toggleSectionSelectAll(${section.id})" aria-label="Select all questions in section">
        </label>
        <span class="enc-edit-section-list-chevron" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
        <span class="enc-edit-section-list-title">${(sectionTitle || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')}</span>
      </div>
      <div class="enc-edit-section-list-body">
        ${questionRows || '<p class="enc-text-muted enc-edit-section-empty">No questions yet.</p>'}
      </div>
      ${bulkActionsBar}
      <div class="enc-edit-section-add-wrap">
        <button type="button" class="enc-structure-add-button" onclick="addQuestion(${section.id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Question
        </button>
      </div>
    </div>
    <div class="enc-edit-actions enc-edit-section-full">
      <button type="button" class="enc-action-primary" onclick="saveSection(${section.id})">${section.isNew ? 'Add section' : 'Update'}</button>
    </div>
  `;
}

function updatePageField(field, value) {
  const page = findPage(selection.type === 'page' ? selection.id : null);
  if (page && selection.type === 'page') {
    if (field === 'number') {
      const newIndex = Math.max(1, Math.min(surveyData.pages.length, parseInt(value, 10) || 1));
      const currentIndex = surveyData.pages.findIndex(p => p.id === page.id);
      if (currentIndex !== -1 && newIndex !== currentIndex + 1) {
        const [movedPage] = surveyData.pages.splice(currentIndex, 1);
        surveyData.pages.splice(newIndex - 1, 0, movedPage);
        syncPanels();
        return;
      }
    } else {
      page[field] = value;
    }
  }
}

function togglePageSectionExpand(sectionId) {
  if (expandedPageSections.has(sectionId)) {
    expandedPageSections.delete(sectionId);
  } else {
    expandedPageSections.add(sectionId);
  }
  syncPanels();
}

function togglePageSectionSelection(sectionId) {
  const idx = selectedPageItemIds.sections.indexOf(sectionId);
  if (idx === -1) {
    selectedPageItemIds.sections.push(sectionId);
  } else {
    selectedPageItemIds.sections.splice(idx, 1);
  }
  syncPanels();
}

function togglePageQuestionSelection(questionId) {
  const idx = selectedPageItemIds.questions.indexOf(questionId);
  if (idx === -1) {
    selectedPageItemIds.questions.push(questionId);
  } else {
    selectedPageItemIds.questions.splice(idx, 1);
  }
  syncPanels();
}

function deleteSelectedPageItems() {
  const page = findPage(selection.type === 'page' ? selection.id : null);
  if (!page) return;
  
  const sectionsToDelete = selectedPageItemIds.sections.length;
  const questionsToDelete = selectedPageItemIds.questions.length;
  
  if (sectionsToDelete === 0 && questionsToDelete === 0) return;
  
  let confirmMsg = '';
  if (sectionsToDelete > 0 && questionsToDelete > 0) {
    confirmMsg = `Are you sure you want to delete ${sectionsToDelete} section(s) and ${questionsToDelete} question(s)?`;
  } else if (sectionsToDelete > 0) {
    confirmMsg = `Are you sure you want to delete ${sectionsToDelete} section(s) and all their questions?`;
  } else {
    confirmMsg = `Are you sure you want to delete ${questionsToDelete} question(s)?`;
  }
  
  if (!confirm(confirmMsg)) return;
  
  // Delete sections
  selectedPageItemIds.sections.forEach(sectionId => {
    const idx = (page.sections || []).findIndex(s => s.id === sectionId);
    if (idx !== -1) {
      page.sections.splice(idx, 1);
    }
  });
  
  // Delete questions
  selectedPageItemIds.questions.forEach(questionId => {
    for (const section of page.sections || []) {
      const idx = (section.questions || []).findIndex(q => q.id === questionId);
      if (idx !== -1) {
        section.questions.splice(idx, 1);
        break;
      }
    }
  });
  
  selectedPageItemIds.sections = [];
  selectedPageItemIds.questions = [];
  // Renumber questions after deletion
  renumberQuestionsInPage(page.id);
  syncPanels();
}

function updateSectionField(field, value) {
  const section = findSection(selection.type === 'section' ? selection.id : null);
  if (section && selection.type === 'section') {
    section[field] = value;
  }
}

// Question edit form — exact match to Figma: General, Classifiers, Rating Scale, Labels/tags, Attributes
const SURVEY_CATEGORY_OPTIONS = ['Select', 'Work Environment', 'Leadership', 'Safety'];
const RATING_SCALE_OPTIONS = ['5 point rating scale', '7 point rating scale', '10 point rating scale'];
const ATTRIBUTE_SELECT_OPTIONS = ['Select'];

function renderQuestionEditForm(question) {
  const qType = question.questionType && RESPONSE_TYPES_BY_QUESTION_TYPE[question.questionType] ? question.questionType : 'Single select';
  const responseTypes = getResponseTypesForQuestionType(qType);
  const validResponseType = responseTypes.indexOf(question.responseType) !== -1 ? question.responseType : responseTypes[0];
  const layout = question.layout || 'Vertical';
  const classifiers = Array.isArray(question.classifiers) ? question.classifiers : ['', '', '', '', ''];
  const att = question.attributes || {};
  const tags = Array.isArray(question.tags) ? question.tags : [];
  const ratingScale = question.ratingScale || '5 point rating scale';
  const options = question.options || [
    { value: 1, label: 'Strongly disagree' },
    { value: 2, label: 'Disagree' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Agree' },
    { value: 5, label: 'Strongly agree' }
  ];
  return `
    <!-- General Question Configuration -->
    <div class="enc-edit-section enc-card enc-edit-section-full">
      <div class="enc-form-row">
        <label class="enc-form-label enc-form-label-required" for="question-type">Question type</label>
        <select id="question-type" class="enc-input-field" onchange="updateQuestionField('questionType', this.value)">
          ${QUESTION_TYPE_OPTIONS.map(t => `<option ${qType === t ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
      </div>
      <div class="enc-form-row" role="radiogroup" aria-labelledby="response-type-label-${question.id}">
        <span class="enc-form-label enc-form-label-required" id="response-type-label-${question.id}">Response type</span>
        <div class="enc-radio-group">
          ${responseTypes.map(rt => `
          <label class="enc-radio-option">
            <input type="radio" name="response-type-${question.id}" value="${rt}" ${validResponseType === rt ? 'checked' : ''} onchange="updateQuestionField('responseType', this.value)">
            <span>${rt}</span>
          </label>
          `).join('')}
        </div>
      </div>
      <div class="enc-form-row">
        <label class="enc-form-label" for="layout">Layout</label>
        <select id="layout" class="enc-input-field" onchange="updateQuestionField('layout', this.value)">
          <option ${layout === 'Vertical' ? 'selected' : ''}>Vertical</option>
          <option ${layout === 'Horizontal' ? 'selected' : ''}>Horizontal</option>
        </select>
      </div>
      <div class="enc-form-row">
        <label class="enc-form-label enc-form-label-required" for="category">Survey category</label>
        <select id="category" class="enc-input-field" onchange="updateQuestionField('category', this.value)">
          ${SURVEY_CATEGORY_OPTIONS.map(c => `<option ${(question.category || '') === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
      <div class="enc-form-row">
        <label class="enc-form-label enc-form-label-required" for="question-statement">Question statement</label>
        <textarea id="question-statement" class="enc-input-field" rows="3" placeholder="Enter question here" onchange="updateQuestionField('text', this.value)">${question.text || ''}</textarea>
      </div>
      <div class="enc-form-row">
        <label class="enc-form-label" for="question-instructions">Question Instructions</label>
        <textarea id="question-instructions" class="enc-input-field" rows="2" placeholder="Enter instructions here" onchange="updateQuestionField('instructions', this.value)">${question.instructions || ''}</textarea>
      </div>
    </div>
    <!-- Question Classifiers -->
    <div class="enc-edit-section enc-card enc-edit-section-full">
      <h3 class="enc-edit-section-title">Question Classifiers</h3>
      <div class="enc-form-row enc-classifiers-grid">
        <div class="enc-form-row">
          <label class="enc-form-label enc-form-label-required" for="classifier-1">Question classifier 1</label>
          <select id="classifier-1" class="enc-input-field" onchange="updateQuestionClassifier(${question.id}, 0, this.value)">
            <option>Select</option>
          </select>
        </div>
        <div class="enc-form-row">
          <label class="enc-form-label" for="classifier-2">Question classifier 2</label>
          <select id="classifier-2" class="enc-input-field" onchange="updateQuestionClassifier(${question.id}, 1, this.value)">
            <option>Select</option>
          </select>
        </div>
        <div class="enc-form-row">
          <label class="enc-form-label" for="classifier-3">Question classifier 3</label>
          <select id="classifier-3" class="enc-input-field" onchange="updateQuestionClassifier(${question.id}, 2, this.value)">
            <option>Select</option>
          </select>
        </div>
        <div class="enc-form-row">
          <label class="enc-form-label" for="classifier-4">Question classifier 4</label>
          <select id="classifier-4" class="enc-input-field" onchange="updateQuestionClassifier(${question.id}, 3, this.value)">
            <option>Select</option>
          </select>
        </div>
        <div class="enc-form-row">
          <label class="enc-form-label" for="classifier-5">Question classifier 5</label>
          <select id="classifier-5" class="enc-input-field" onchange="updateQuestionClassifier(${question.id}, 4, this.value)">
            <option>Select</option>
          </select>
        </div>
      </div>
    </div>
    <!-- Rating Scale -->
    <div class="enc-edit-section enc-card enc-edit-section-full">
      <h3 class="enc-edit-section-title">Rating Scale</h3>
      <div class="enc-form-row">
        <label class="enc-form-label enc-form-label-required" for="rating-scale">Rating scale</label>
        <select id="rating-scale" class="enc-input-field" onchange="updateQuestionField('ratingScale', this.value)">
          ${RATING_SCALE_OPTIONS.map(r => `<option ${ratingScale === r ? 'selected' : ''}>${r}</option>`).join('')}
        </select>
      </div>
      <div class="enc-rating-options">
        ${options.map(opt => {
          const maxVal = options.length;
          const third = Math.ceil(maxVal / 3);
          const scoreClass = opt.value <= third ? 'low' : (opt.value >= maxVal - third + 1 ? 'high' : 'mid');
          return `
          <div class="enc-rating-option">
            <input type="radio" name="rating-${question.id}" value="${opt.value}" id="rating-${question.id}-${opt.value}" ${question.selectedOption === opt.value ? 'checked' : ''} onchange="updateQuestionOption(${question.id}, ${opt.value})">
            <label for="rating-${question.id}-${opt.value}" class="enc-rating-option-label">${opt.label}</label>
            <span class="enc-option-score enc-option-score-${scoreClass}" aria-label="Score">${opt.value}</span>
          </div>
        `;
        }).join('')}
      </div>
    </div>
    <!-- Additional Select Fields (Objective, Outcome, etc.) — 2 columns -->
    <div class="enc-edit-section enc-card enc-edit-section-full">
      <div class="enc-attributes-grid">
        <div class="enc-form-row">
          <label class="enc-form-label" for="attr-objective">Objective</label>
          <select id="attr-objective" class="enc-input-field" onchange="updateQuestionAttribute(${question.id}, 'objective', this.value)">
            ${ATTRIBUTE_SELECT_OPTIONS.map(o => `<option ${(att.objective || '') === o ? 'selected' : ''}>${o}</option>`).join('')}
          </select>
        </div>
        <div class="enc-form-row">
          <label class="enc-form-label" for="attr-outcome">Outcome</label>
          <select id="attr-outcome" class="enc-input-field" onchange="updateQuestionAttribute(${question.id}, 'outcome', this.value)">
            ${ATTRIBUTE_SELECT_OPTIONS.map(o => `<option ${(att.outcome || '') === o ? 'selected' : ''}>${o}</option>`).join('')}
          </select>
        </div>
        <div class="enc-form-row">
          <label class="enc-form-label" for="attr-metrics">Metrics</label>
          <select id="attr-metrics" class="enc-input-field" onchange="updateQuestionAttribute(${question.id}, 'metrics', this.value)">
            ${ATTRIBUTE_SELECT_OPTIONS.map(o => `<option ${(att.metrics || '') === o ? 'selected' : ''}>${o}</option>`).join('')}
          </select>
        </div>
        <div class="enc-form-row">
          <label class="enc-form-label" for="attr-results">Results</label>
          <select id="attr-results" class="enc-input-field" onchange="updateQuestionAttribute(${question.id}, 'results', this.value)">
            ${ATTRIBUTE_SELECT_OPTIONS.map(o => `<option ${(att.results || '') === o ? 'selected' : ''}>${o}</option>`).join('')}
          </select>
        </div>
        <div class="enc-form-row">
          <label class="enc-form-label" for="attr-question-templates">Question templates</label>
          <select id="attr-question-templates" class="enc-input-field" onchange="updateQuestionAttribute(${question.id}, 'questionTemplates', this.value)">
            ${ATTRIBUTE_SELECT_OPTIONS.map(o => `<option ${(att.questionTemplates || '') === o ? 'selected' : ''}>${o}</option>`).join('')}
          </select>
        </div>
        <div class="enc-form-row">
          <label class="enc-form-label" for="attr-survey-templates">Survey templates</label>
          <select id="attr-survey-templates" class="enc-input-field" onchange="updateQuestionAttribute(${question.id}, 'surveyTemplates', this.value)">
            ${ATTRIBUTE_SELECT_OPTIONS.map(o => `<option ${(att.surveyTemplates || '') === o ? 'selected' : ''}>${o}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>
    <!-- Labels/tags (last section, no header) -->
    <div class="enc-edit-section enc-card enc-edit-section-full">
      <div class="enc-form-row">
        <label class="enc-form-label" for="labels-tags">Labels/tags</label>
        <input type="text" id="labels-tags" class="enc-input-field" placeholder="Add tag..." onkeydown="if(event.key==='Enter'){ event.preventDefault(); addQuestionTag(${question.id}, this.value); this.value=''; renderEditCanvas(); }">
      </div>
    </div>
    <div class="enc-edit-actions enc-edit-section-full">
      <button type="button" class="enc-action-secondary" onclick="cancelEdit()">Cancel</button>
      <button type="button" class="enc-action-primary" onclick="saveSurvey()">Save changes</button>
    </div>
  `;
}

// Properties panel — shows when selectedQuestionIdsForProperties.length > 0 (drawer open)
function renderProperties() {
  const container = document.getElementById('properties-content');
  if (!container) return;

  if (selectedQuestionIdsForProperties.length === 0) {
    container.innerHTML = `
      <div class="enc-empty-state">
        <p class="enc-text-muted">Select a question to configure its properties.</p>
      </div>
    `;
    return;
  }

  const primaryId = selectedQuestionIdsForProperties[0];
  const question = findQuestion(primaryId);
  if (!question) {
    container.innerHTML = `
      <div class="enc-empty-state">
        <p class="enc-text-muted">Select a question to configure its properties.</p>
      </div>
    `;
    return;
  }

  const multiLabel = selectedQuestionIdsForProperties.length > 1
    ? `<p class="enc-structure-meta enc-text-muted enc-properties-multi-label">${selectedQuestionIdsForProperties.length} questions selected. Editing first.</p>`
    : '';

  const html = `
    ${multiLabel}
    <section class="enc-property-section" aria-labelledby="properties-question-settings-heading">
      <h3 class="enc-property-section-title" id="properties-question-settings-heading">Question settings</h3>
      <div class="enc-property-toggle-row">
        <span class="enc-property-toggle-label">Required</span>
        <button type="button" class="enc-toggle" role="switch" aria-pressed="${question.properties.required}" onclick="toggleProperty('required')"></button>
      </div>
      <div class="enc-property-toggle-row">
        <span class="enc-property-toggle-label">Add 'other' option</span>
        <button type="button" class="enc-toggle" role="switch" aria-pressed="${question.properties.addOther}" onclick="toggleProperty('addOther')"></button>
      </div>
      <div class="enc-property-toggle-row">
        <span class="enc-property-toggle-label">Add 'not applicable' option</span>
        <button type="button" class="enc-toggle" role="switch" aria-pressed="${question.properties.addNotApplicable}" onclick="toggleProperty('addNotApplicable')"></button>
      </div>
      <div class="enc-property-toggle-row">
        <span class="enc-property-toggle-label">Reverse order range</span>
        <button type="button" class="enc-toggle" role="switch" aria-pressed="${question.properties.reverseOrderRange}" onclick="toggleProperty('reverseOrderRange')"></button>
      </div>
      <div class="enc-property-toggle-row">
        <span class="enc-property-toggle-label">Allow comments</span>
        <button type="button" class="enc-toggle" role="switch" aria-pressed="${question.properties.allowComments}" onclick="toggleProperty('allowComments')"></button>
      </div>
    </div>

    <div class="enc-divider"></div>

    <section class="enc-property-section" aria-labelledby="properties-display-logic-heading">
      <h3 class="enc-property-section-title" id="properties-display-logic-heading">Display logic rules</h3>
      <button type="button" class="enc-action-secondary enc-action-icon" onclick="addLogicRule()">Add logic</button>
    </section>
  `;

  container.innerHTML = html;
}

// Selection — single active: page | section | question
function selectPage(id) {
  setSelection('page', id);
}
function selectSection(id) {
  setSelection('section', id);
}
function selectQuestion(id) {
  setSelection('question', id);
}

function updateQuestionField(field, value) {
  if (selection.type !== 'question') return;
  const question = findQuestion(selection.id);
  if (question) {
    question[field] = value;
    if (field === 'questionType') {
      const allowed = getResponseTypesForQuestionType(value);
      if (allowed.indexOf(question.responseType) === -1) {
        question.responseType = getDefaultResponseTypeForQuestionType(value);
      }
    }
    renderEditCanvas();
  }
}


function updateQuestionOption(questionId, value) {
  const question = findQuestion(questionId);
  if (question) {
    question.selectedOption = parseInt(value);
    renderEditCanvas();
  }
}

function updateQuestionOptionLabel(questionId, optionIndex, label) {
  const question = findQuestion(questionId);
  if (question && question.options && question.options[optionIndex]) {
    question.options[optionIndex].label = label;
    renderEditCanvas();
  }
}

function updateQuestionClassifier(questionId, index, value) {
  const question = findQuestion(questionId);
  if (question) {
    if (!Array.isArray(question.classifiers)) question.classifiers = ['', '', '', '', ''];
    question.classifiers[index] = value;
    renderEditCanvas();
  }
}

function updateQuestionAttribute(questionId, attrKey, value) {
  const question = findQuestion(questionId);
  if (question) {
    if (!question.attributes) question.attributes = {};
    question.attributes[attrKey] = value;
    renderEditCanvas();
  }
}

function addQuestionTag(questionId, value) {
  const question = findQuestion(questionId);
  if (question && value && String(value).trim()) {
    if (!Array.isArray(question.tags)) question.tags = [];
    question.tags.push(String(value).trim());
    renderEditCanvas();
  }
}

function removeQuestionTag(questionId, index) {
  const question = findQuestion(questionId);
  if (question && Array.isArray(question.tags) && question.tags[index] !== undefined) {
    question.tags.splice(index, 1);
    renderEditCanvas();
  }
}

function updateLogicRule(questionId, ruleIndex, field, value) {
  const question = findQuestion(questionId);
  if (!question) return;
  if (!question.logicRules) question.logicRules = [{ if: '', question: '', is: '', option: '' }];
  if (!question.logicRules[ruleIndex]) question.logicRules[ruleIndex] = { if: '', question: '', is: '', option: '' };
  question.logicRules[ruleIndex][field] = value;
}

function addLogicRuleRow() {
  if (selection.type !== 'question') return;
  const question = findQuestion(selection.id);
  if (question) {
    if (!question.logicRules) question.logicRules = [];
    question.logicRules.push({ if: '', question: '', is: '', option: '' });
    renderEditCanvas();
  }
}

function addAlternativeQuestionLanguage() {
  showToast('Alternative question language');
}

function cancelEdit() {
  syncPanels();
}

function translatePageInstructions() {
  showToast('Translate page instructions');
}

function translateSectionInstructions() {
  showToast('Translate section instructions');
}

function toggleProperty(prop) {
  if (selectedQuestionIdsForProperties.length === 0) return;
  const question = findQuestion(selectedQuestionIdsForProperties[0]);
  if (question) {
    question.properties[prop] = !question.properties[prop];
    renderProperties();
  }
}

function renumberQuestionsInPage(pageId) {
  const page = surveyData.pages.find(p => p.id === pageId);
  if (!page) return;
  let questionCounter = 1;
  page.sections.forEach(section => {
    (section.questions || []).forEach(question => {
      question.questionNumber = `Q${questionCounter}`;
      questionCounter++;
    });
  });
}

function renumberAllQuestions() {
  surveyData.pages.forEach(page => {
    renumberQuestionsInPage(page.id);
  });
}

function addQuestion(sectionId) {
  const page = surveyData.pages.find(p => p.sections.some(s => s.id === sectionId));
  const section = page?.sections.find(s => s.id === sectionId);
  if (section) {
    const newId = Date.now();
    // Calculate total questions across all sections in this page
    const totalQuestions = page.sections.reduce((sum, s) => sum + (s.questions || []).length, 0);
    const questionNumber = totalQuestions + 1;
    section.questions.push({
      id: newId,
      questionNumber: `Q${questionNumber}`,
      text: 'New question',
      questionType: 'Single select',
      responseType: 'Radio button',
      layout: 'Vertical',
      category: '',
      instructions: '',
      classifiers: ['', '', '', '', ''],
      ratingScale: '5 point rating scale',
      options: [
        { value: 1, label: 'Strongly disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly agree' }
      ],
      selectedOption: null,
      tags: [],
      attributes: {
        objective: '',
        metrics: '',
        questionTemplates: '',
        outcome: '',
        results: '',
        surveyTemplates: ''
      },
      properties: {
        required: false,
        addOther: false,
        addNotApplicable: false,
        reverseOrderRange: false,
        allowComments: false
      }
    });
    renumberQuestionsInPage(page.id);
    setSelection('question', newId);
  }
}

function addSection(pageId) {
  const page = surveyData.pages.find(p => p.id === pageId);
  if (page) {
    const newId = Date.now();
    const sectionCount = page.sections.length + 1;
    page.sections.push({
      id: newId,
      name: `Section ${sectionCount}: New Section`,
      description: '',
      instructions: '',
      questions: [],
      isNew: true
    });
    setSelection('section', newId);
  }
}

function saveSection(sectionId) {
  const section = findSection(sectionId);
  if (!section) return;
  const nameEl = document.getElementById('section-name');
  const descEl = document.getElementById('section-description');
  const instEl = document.getElementById('section-instructions');
  if (nameEl) section.name = nameEl.value.trim() || section.name;
  if (descEl) section.description = descEl.value;
  if (instEl) section.instructions = instEl.value;
  const wasNew = section.isNew === true;
  delete section.isNew;
  syncPanels();
  showToast(wasNew ? 'Section added' : 'Section updated');
}

function addPage() {
  const newId = Date.now();
  const pageCount = surveyData.pages.length + 1;
  surveyData.pages.push({
    id: newId,
    name: `Page ${pageCount}`,
    instructions: '',
    sections: []
  });
  setSelection('page', newId);
}

function deleteSelectedQuestion() {
  if (selection.type !== 'question') return;
  if (!confirm('Are you sure you want to delete this question?')) return;
  const targetId = selection.id;
  for (const page of surveyData.pages) {
    for (const section of page.sections) {
      const index = section.questions.findIndex(q => q.id === targetId);
      if (index > -1) {
        section.questions.splice(index, 1);
        renumberQuestionsInPage(page.id);
        if (section.questions.length > 0) {
          setSelection('question', section.questions[0].id);
        } else {
          setSelection('section', section.id);
        }
        return;
      }
    }
  }
}

function addLogicRule() {
  showToast('Logic rule added');
}

function showQuestionMenu(id) {
  console.log('Show menu for question', id);
}

function previewSurvey() {
  try {
    localStorage.setItem('enculture-survey-preview-data', JSON.stringify(surveyData));
    const previewUrl = 'preview.html';
    const w = 900;
    const h = 700;
    const left = Math.max(0, (window.screen.width - w) / 2);
    const top = Math.max(0, (window.screen.height - h) / 2);
    const features = 'width=' + w + ',height=' + h + ',left=' + left + ',top=' + top + ',scrollbars=yes,resizable=yes,noopener';
    window.open(previewUrl, 'enculture-survey-preview', features);
  } catch (e) {
    showToast('Could not open preview.');
  }
}

function previewSurveyInNewTab() {
  try {
    localStorage.setItem('enculture-survey-preview-data', JSON.stringify(surveyData));
    const previewUrl = 'preview.html';
    window.open(previewUrl, '_blank', 'noopener,noreferrer');
  } catch (e) {
    showToast('Could not open preview.');
  }
}

function togglePreviewMenu(event) {
  if (event) event.stopPropagation();
  const menu = document.getElementById('preview-menu');
  const trigger = document.getElementById('preview-trigger');
  if (!menu || !trigger) return;
  const isOpen = menu.classList.contains('enc-dropdown-open');
  if (isOpen) {
    closePreviewMenu();
    return;
  }
  menu.classList.add('enc-dropdown-open');
  menu.setAttribute('aria-hidden', 'false');
  trigger.setAttribute('aria-expanded', 'true');
  document.addEventListener('click', closePreviewMenuOnClickOutside);
}

function closePreviewMenu() {
  const menu = document.getElementById('preview-menu');
  const trigger = document.getElementById('preview-trigger');
  if (menu) {
    menu.classList.remove('enc-dropdown-open');
    menu.setAttribute('aria-hidden', 'true');
  }
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', closePreviewMenuOnClickOutside);
}

function closePreviewMenuOnClickOutside(e) {
  const dropdown = document.querySelector('.enc-preview-dropdown');
  if (dropdown && !dropdown.contains(e.target)) closePreviewMenu();
}

function saveSurvey() {
  showToast('Survey saved successfully!');
}

function toggleUploadMenu() {
  console.log('Toggle upload menu');
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'enc-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Expose selection and actions to DOM
window.selectPage = selectPage;
window.selectSection = selectSection;
window.selectQuestion = selectQuestion;
window.updateQuestionField = updateQuestionField;
window.updatePageField = updatePageField;
window.updateSectionField = updateSectionField;
window.updateQuestionOption = updateQuestionOption;
window.toggleProperty = toggleProperty;
window.addQuestion = addQuestion;
window.addSection = addSection;
window.addPage = addPage;
window.deleteSelectedQuestion = deleteSelectedQuestion;
window.deleteSection = deleteSection;
window.deletePage = deletePage;
window.saveSection = saveSection;
window.togglePageSectionExpand = togglePageSectionExpand;
window.togglePageSectionSelection = togglePageSectionSelection;
window.togglePageQuestionSelection = togglePageQuestionSelection;
window.deleteSelectedPageItems = deleteSelectedPageItems;
window.renumberQuestionsInPage = renumberQuestionsInPage;
window.toggleQuestionSelectionInSection = toggleQuestionSelectionInSection;
window.toggleSectionSelectAll = toggleSectionSelectAll;
window.clearSectionSelection = clearSectionSelection;
window.deleteSelectedQuestionsInSection = deleteSelectedQuestionsInSection;
window.addLogicRule = addLogicRule;
window.addLogicRuleRow = addLogicRuleRow;
window.addAlternativeQuestionLanguage = addAlternativeQuestionLanguage;
window.cancelEdit = cancelEdit;
window.togglePageSettingsPopover = togglePageSettingsPopover;
window.applyQuestionsPerPage = applyQuestionsPerPage;
window.translatePageInstructions = translatePageInstructions;
window.translateSectionInstructions = translateSectionInstructions;
window.updateQuestionOptionLabel = updateQuestionOptionLabel;
window.updateQuestionClassifier = updateQuestionClassifier;
window.updateQuestionAttribute = updateQuestionAttribute;
window.addQuestionTag = addQuestionTag;
window.removeQuestionTag = removeQuestionTag;
window.showQuestionMenu = showQuestionMenu;
window.previewSurvey = previewSurvey;
window.previewSurveyInNewTab = previewSurveyInNewTab;
window.togglePreviewMenu = togglePreviewMenu;
window.closePreviewMenu = closePreviewMenu;
window.saveSurvey = saveSurvey;
window.toggleUploadMenu = toggleUploadMenu;
