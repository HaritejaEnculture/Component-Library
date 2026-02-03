// Survey Builder — Interactive Components
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
                textToSpeech: true,
                favorabilityRange: true,
                allowComments: true
              }
            },
            {
              id: 2,
              questionNumber: 'Q2',
              text: 'How satisfied are you with your team collaboration?',
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
                required: true,
                addOther: false,
                textToSpeech: false,
                favorabilityRange: false,
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
                textToSpeech: false,
                favorabilityRange: false,
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

// Single selection: page | section | question
let selection = { type: 'question', id: 2 };

// Properties drawer: open when 1+ questions selected (from left panel or section form multi-select)
let selectedQuestionIdsForProperties = [];

function setSelection(type, id) {
  selection = { type, id };
  if (type === 'question') {
    selectedQuestionIdsForProperties = [id];
    openPropertiesDrawer();
  } else {
    selectedQuestionIdsForProperties = [];
    closePropertiesDrawer();
  }
  syncPanels();
}

function syncPanels() {
  renderSurveyStructure();
  renderEditCanvas();
  renderProperties();
  updateDrawerVisibility();
}

function openPropertiesDrawer() {
  const drawer = document.getElementById('properties-drawer');
  const overlay = document.getElementById('properties-drawer-overlay');
  if (drawer) { drawer.classList.add('enc-drawer-open'); drawer.setAttribute('aria-hidden', 'false'); }
  if (overlay) { overlay.classList.add('enc-drawer-overlay-visible'); overlay.setAttribute('aria-hidden', 'false'); }
}

function closePropertiesDrawer() {
  const drawer = document.getElementById('properties-drawer');
  const overlay = document.getElementById('properties-drawer-overlay');
  if (drawer) { drawer.classList.remove('enc-drawer-open'); drawer.setAttribute('aria-hidden', 'true'); }
  if (overlay) { overlay.classList.remove('enc-drawer-overlay-visible'); overlay.setAttribute('aria-hidden', 'true'); }
}

function updateDrawerVisibility() {
  if (selectedQuestionIdsForProperties.length > 0) openPropertiesDrawer();
  else closePropertiesDrawer();
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
  if (input) input.value = surveyData.pagesPerPage || 10;
  document.addEventListener('click', pageSettingsClickOutside);
}

function closePageSettingsPopover() {
  const popover = document.getElementById('page-settings-popover');
  const trigger = document.getElementById('page-settings-trigger');
  if (popover) {
    popover.classList.remove('enc-popover-open');
    popover.setAttribute('aria-hidden', 'true');
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
  if (i === -1) selectedQuestionIdsForProperties.push(questionId);
  else selectedQuestionIdsForProperties.splice(i, 1);
  updateDrawerVisibility();
  renderProperties();
  renderEditCanvas();
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  if (selection.type === 'question') selectedQuestionIdsForProperties = [selection.id];
  syncPanels();
  updateDrawerVisibility();
  bindStructureCalloutPositioning();
});

// Render survey structure tree — page, section, question all clickable
function renderSurveyStructure() {
  const container = document.getElementById('survey-structure');
  const metaEl = document.getElementById('questions-per-page-meta');
  if (!container) return;
  if (metaEl) metaEl.textContent = 'Questions per page : ' + (surveyData.pagesPerPage || 10);

  let html = '';

  surveyData.pages.forEach((page) => {
    const isPageSelected = selection.type === 'page' && selection.id === page.id;
    html += `
      <div class="enc-structure-page-block">
        <div class="enc-structure-item ${isPageSelected ? 'selected' : ''}"
             data-type="page" data-id="${page.id}"
             role="button" tabindex="0" aria-selected="${isPageSelected}"
             onclick="selectPage(${page.id})" onkeydown="if(event.key==='Enter') selectPage(${page.id})">
          <span class="enc-structure-item drag-handle">⋮⋮</span>
          <span class="enc-structure-item-label">${page.name}</span>
          <div class="enc-structure-item-actions">
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
          <div class="enc-structure-section-block">
            <button type="button"
                    class="enc-structure-section-heading ${isSectionSelected ? 'enc-structure-section-heading-selected' : ''}"
                    data-type="section" data-id="${section.id}"
                    aria-selected="${isSectionSelected}"
                    onclick="selectSection(${section.id})" onkeydown="if(event.key==='Enter') selectSection(${section.id})">
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
              <span class="enc-structure-nav-dot ${isQuestionSelected ? 'enc-structure-nav-dot-active' : 'enc-structure-nav-dot-pending'}" aria-hidden="true"></span>
              <span class="enc-structure-question-label-wrap">
                <span class="enc-structure-item-label enc-structure-question-label">${question.questionNumber}. ${question.text} · ${question.questionType || ''}</span>
                <div class="enc-structure-callout" role="tooltip">
                  <p class="enc-structure-callout-title">${question.questionNumber}</p>
                  <p class="enc-structure-callout-text">${fullTextEscaped}</p>
                  <p class="enc-structure-callout-meta enc-text-muted">${question.questionType || ''}${question.responseType ? ' · ' + question.responseType : ''}</p>
                </div>
              </span>
            </button>
          </li>
        `;
      });

      html += `
            </ul>
            <button type="button" class="enc-structure-add-button" onclick="addQuestion(${section.id})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Question
            </button>
          </div>
      `;
    });

    html += `
          <button type="button" class="enc-structure-add-button" onclick="addSection(${page.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Section
          </button>
        </div>
      </div>
    `;
  });

  html += `
    <button type="button" class="enc-structure-add-button" onclick="addPage()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Add page
    </button>
  `;

  container.innerHTML = html;
}

// Position question callout with position:fixed so it isn't clipped by sidebar overflow
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

// Center panel: one edit context — Page | Section | Question (per reference image)
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
        <p class="enc-edit-description">Configure page-level settings.</p>
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
        <p class="enc-edit-description">Configure section name and instructions.</p>
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
    <button type="button" class="enc-icon-button enc-icon-button-sm enc-icon-button-danger" aria-label="Delete question" onclick="deleteSelectedQuestion()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
    </button>
  `;
  contentContainer.innerHTML = renderQuestionEditForm(question);
}

function renderPageEditForm(page) {
  const pageIdSlug = 'page-' + page.id;
  const firstSection = page.sections && page.sections[0];
  const sectionsList = (page.sections || []).map(s => `
    <div class="enc-edit-context-block">
      <p class="enc-edit-context-label">${s.name}</p>
      ${(s.questions || []).map(q => `<p class="enc-edit-context-item enc-text-muted">${q.questionNumber}. ${q.text.substring(0, 50)}${q.text.length > 50 ? '...' : ''}</p>`).join('')}
    </div>
  `).join('');
  return `
    <div class="enc-edit-section enc-card">
      <h3 class="enc-edit-section-title">Page identity</h3>
      <div class="enc-form-row">
        <label class="enc-form-label" for="page-id">Page ID</label>
        <input type="text" id="page-id" class="enc-input-field" value="${pageIdSlug}" readonly disabled aria-readonly="true">
      </div>
    </div>
    <div class="enc-edit-section enc-card">
      <h3 class="enc-edit-section-title">Page instructions</h3>
      <div class="enc-form-row">
        <label class="enc-form-label" for="page-instructions">Instructions</label>
        <textarea id="page-instructions" class="enc-input-field" rows="3" placeholder="Please answer all questions below..." onchange="updatePageField('instructions', this.value)">${page.instructions || ''}</textarea>
      </div>
      <div class="enc-form-row">
        <button type="button" class="enc-action-secondary" onclick="translatePageInstructions()">Translate page instructions</button>
      </div>
    </div>
    <div class="enc-edit-section enc-card enc-edit-section-full">
      <h3 class="enc-edit-section-title">Sections in this page</h3>
      ${sectionsList ? '<div class="enc-edit-context-list">' + sectionsList + '</div>' : '<p class="enc-text-muted">No sections yet.</p>'}
      ${firstSection ? '<button type="button" class="enc-structure-add-button" onclick="addQuestion(' + firstSection.id + ')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Add Question</button>' : ''}
    </div>
  `;
}

function renderSectionEditForm(section) {
  const questions = section.questions || [];
  const questionsList = questions.map(q => {
    const checked = selectedQuestionIdsForProperties.indexOf(q.id) !== -1;
    return `
    <label class="enc-section-question-row">
      <input type="checkbox" class="enc-input-field enc-checkbox" ${checked ? 'checked' : ''} onchange="toggleQuestionForProperties(${q.id})">
      <span class="enc-edit-context-item enc-text-muted">${q.questionNumber}. ${q.text.substring(0, 50)}${q.text.length > 50 ? '...' : ''}</span>
    </label>
  `;
  }).join('');
  return `
    <div class="enc-edit-section enc-card">
      <h3 class="enc-edit-section-title">Section identity</h3>
      <div class="enc-form-row">
        <label class="enc-form-label required" for="section-name">Section name</label>
        <input type="text" id="section-name" class="enc-input-field" value="${section.name}" onchange="updateSectionField('name', this.value)" placeholder="Section name">
      </div>
      <div class="enc-form-row">
        <label class="enc-form-label" for="section-description">Section description</label>
        <textarea id="section-description" class="enc-input-field" rows="2" placeholder="Brief description..." onchange="updateSectionField('description', this.value)">${section.description || ''}</textarea>
      </div>
    </div>
    <div class="enc-edit-section enc-card">
      <h3 class="enc-edit-section-title">Section instructions</h3>
      <div class="enc-form-row">
        <label class="enc-form-label" for="section-instructions">Instructions</label>
        <textarea id="section-instructions" class="enc-input-field" rows="2" placeholder="Your feedback is critical..." onchange="updateSectionField('instructions', this.value)">${section.instructions || ''}</textarea>
      </div>
      <div class="enc-form-row">
        <button type="button" class="enc-action-secondary" onclick="translateSectionInstructions()">Translate section instructions</button>
      </div>
    </div>
    <div class="enc-edit-section enc-card enc-edit-section-full">
      <h3 class="enc-edit-section-title">Questions in this section</h3>
      <p class="enc-form-helper enc-text-muted">Select one or more to configure properties in the panel.</p>
      ${questionsList ? '<div class="enc-section-question-list">' + questionsList + '</div>' : '<p class="enc-text-muted">No questions yet.</p>'}
      <button type="button" class="enc-structure-add-button" onclick="addQuestion(' + section.id + ')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Add Question</button>
    </div>
  `;
}

function updatePageField(field, value) {
  const page = findPage(selection.type === 'page' ? selection.id : null);
  if (page && selection.type === 'page') page[field] = value;
}

function updateSectionField(field, value) {
  const section = findSection(selection.type === 'section' ? selection.id : null);
  if (section && selection.type === 'section') section[field] = value;
}

function translatePageInstructions() { showToast('Translate page instructions'); }
function translateSectionInstructions() { showToast('Translate section instructions'); }

// Render edit question form (when question selected) — bento grid layout
function renderQuestionEditForm(question) {
  if (!question) return '';

  const qType = question.questionType && RESPONSE_TYPES_BY_QUESTION_TYPE[question.questionType] ? question.questionType : 'Single select';
  const responseTypes = getResponseTypesForQuestionType(qType);
  const validResponseType = responseTypes.indexOf(question.responseType) !== -1 ? question.responseType : responseTypes[0];
  const layout = question.layout || 'Vertical';
  const optionsLayoutClass = layout === 'Horizontal' ? 'enc-options-horizontal' : 'enc-options-vertical';
  const logicRules = question.logicRules || [{ if: '', question: '', is: '', option: '' }];

  return `
    <!-- Tier 0: Question Identity (includes Response type) -->
    <div class="enc-edit-section enc-card">
      <h3 class="enc-edit-section-title">Question Identity</h3>
      <div class="enc-form-row">
        <label class="enc-form-label required" for="question-type">Question type</label>
        <select id="question-type" class="enc-input-field" onchange="updateQuestionField('questionType', this.value)">
          ${QUESTION_TYPE_OPTIONS.map(t => `<option ${qType === t ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
      </div>
      <div class="enc-form-row" role="radiogroup" aria-labelledby="response-type-label-${question.id}">
        <span class="enc-form-label required" id="response-type-label-${question.id}">Response type</span>
        <div class="enc-radio-group">
          ${responseTypes.map(rt => `
          <label class="enc-radio-option">
            <input type="radio" name="response-type-${question.id}" value="${rt}" ${validResponseType === rt ? 'checked' : ''} onchange="updateQuestionField('responseType', this.value)">
            <span>${rt}</span>
          </label>
          `).join('')}
        </div>
      </div>
    </div>
    <!-- Tier 0 col 2: Question Classifiers (2nd card) -->
    <div class="enc-edit-section enc-card">
      <h3 class="enc-edit-section-title">Question Classifiers</h3>
      <div class="enc-form-row">
        <label class="enc-form-label required" for="classifier-1">Question classifier 1</label>
        <select id="classifier-1" class="enc-input-field" onchange="updateClassifier(1, this.value)"><option>Select</option></select>
      </div>
      <div class="enc-form-row">
        <label class="enc-form-label" for="classifier-2">Question classifier 2</label>
        <select id="classifier-2" class="enc-input-field" onchange="updateClassifier(2, this.value)"><option>Select</option></select>
      </div>
      <div class="enc-form-row">
        <label class="enc-form-label" for="classifier-3">Question classifier 3</label>
        <select id="classifier-3" class="enc-input-field" onchange="updateClassifier(3, this.value)"><option>Select</option></select>
      </div>
      <div class="enc-form-row">
        <label class="enc-form-label" for="classifier-4">Question classifier 4</label>
        <select id="classifier-4" class="enc-input-field" onchange="updateClassifier(4, this.value)"><option>Select</option></select>
      </div>
      <div class="enc-form-row">
        <label class="enc-form-label" for="classifier-5">Question classifier 5</label>
        <select id="classifier-5" class="enc-input-field" onchange="updateClassifier(5, this.value)"><option>Select</option></select>
      </div>
    </div>

    <!-- Tier 1 (full): Basic Question Details -->
    <div class="enc-edit-section enc-card enc-edit-section-full">
      <h3 class="enc-edit-section-title">Basic Question Details</h3>
      <div class="enc-form-row">
        <label class="enc-form-label required" for="question-statement">Question statement</label>
        <textarea id="question-statement" class="enc-input-field" rows="3" placeholder="Enter question here" onchange="updateQuestionField('text', this.value)">${question.text}</textarea>
      </div>
      <div class="enc-form-row">
        <label class="enc-form-label" for="question-instructions">Question instructions</label>
        <textarea id="question-instructions" class="enc-input-field" rows="2" placeholder="Enter instructions here" onchange="updateQuestionField('instructions', this.value)">${question.instructions || ''}</textarea>
      </div>
      <div class="enc-form-row">
        <label class="enc-form-label" for="category">Survey category</label>
        <select id="category" class="enc-input-field" onchange="updateQuestionField('category', this.value)">
          <option>Select</option>
          <option ${question.category === 'Work Environment' ? 'selected' : ''}>Work Environment</option>
          <option ${question.category === 'Leadership' ? 'selected' : ''}>Leadership</option>
          <option ${question.category === 'Safety' ? 'selected' : ''}>Safety</option>
        </select>
      </div>
    </div>

    <!-- Tier 2 (2 cols): Rating Scale | Question Classifiers -->
    <div class="enc-edit-section enc-card">
      <h3 class="enc-edit-section-title">Rating Scale</h3>
      <div class="enc-form-row">
        <label class="enc-form-label" for="layout">Layout</label>
        <select id="layout" class="enc-input-field" onchange="updateQuestionField('layout', this.value)">
          <option ${layout === 'Vertical' ? 'selected' : ''}>Vertical</option>
          <option ${layout === 'Horizontal' ? 'selected' : ''}>Horizontal</option>
        </select>
        <p class="enc-form-helper enc-text-muted">Vertical for longer labels or mobile; horizontal when space allows or labels are short.</p>
      </div>
      <div class="enc-form-row">
        <label class="enc-form-label required" for="rating-scale">Rating scale</label>
        <select id="rating-scale" class="enc-input-field" onchange="updateQuestionField('ratingScale', this.value)">
          <option ${question.ratingScale === '5 point rating scale' ? 'selected' : ''}>5 point rating scale</option>
          <option ${question.ratingScale === '7 point rating scale' ? 'selected' : ''}>7 point rating scale</option>
          <option ${question.ratingScale === '10 point rating scale' ? 'selected' : ''}>10 point rating scale</option>
        </select>
      </div>
      <div class="enc-rating-options enc-options-list ${optionsLayoutClass}">
        ${(question.options || []).map(opt => {
          const maxVal = (question.options || []).length;
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

    <!-- Tier 3 (2 cols): Pre-defined responses | (Additional Classifiers/Attributes is full width below) -->
    <div class="enc-edit-section enc-card">
      <h3 class="enc-edit-section-title">Pre-defined responses</h3>
      <div class="enc-options-list ${optionsLayoutClass}">
        ${(question.options || []).map((opt, i) => {
          const maxVal = (question.options || []).length;
          const third = Math.ceil(maxVal / 3);
          const scoreClass = opt.value <= third ? 'low' : (opt.value >= maxVal - third + 1 ? 'high' : 'mid');
          return `
          <div class="enc-predefined-option-row">
            <div class="enc-form-row" style="flex: 1; margin-bottom: 0;">
              <label class="enc-form-label" for="option-${i + 1}">Option ${i + 1}</label>
              <input type="text" id="option-${i + 1}" class="enc-input-field" value="${opt.label}" onchange="updateQuestionOptionLabel(${question.id}, ${i}, this.value)" placeholder="Option ${i + 1}">
            </div>
            <span class="enc-option-score enc-option-score-${scoreClass}" aria-label="Score">${opt.value}</span>
          </div>
        `;
        }).join('')}
      </div>
      <div class="enc-form-row">
        <button type="button" class="enc-action-secondary" onclick="addAlternativeQuestionLanguage && addAlternativeQuestionLanguage()">Add an alternative question language</button>
      </div>
    </div>
    <div class="enc-edit-section enc-card enc-edit-section-full">
      <h3 class="enc-edit-section-title">Additional Classifiers/Attributes</h3>
      <div class="enc-form-row two-columns">
        <div class="enc-form-row">
          <label class="enc-form-label" for="objective">Objective</label>
          <select id="objective" class="enc-input-field" onchange="updateAttribute('objective', this.value)"><option>Select</option></select>
        </div>
        <div class="enc-form-row">
          <label class="enc-form-label" for="outcome">Outcome</label>
          <select id="outcome" class="enc-input-field" onchange="updateAttribute('outcome', this.value)"><option>Select</option></select>
        </div>
        <div class="enc-form-row">
          <label class="enc-form-label" for="metrics">Metrics</label>
          <select id="metrics" class="enc-input-field" onchange="updateAttribute('metrics', this.value)"><option>Select</option></select>
        </div>
        <div class="enc-form-row">
          <label class="enc-form-label" for="results">Results</label>
          <select id="results" class="enc-input-field" onchange="updateAttribute('results', this.value)"><option>Select</option></select>
        </div>
        <div class="enc-form-row">
          <label class="enc-form-label" for="question-templates">Question templates</label>
          <select id="question-templates" class="enc-input-field" onchange="updateAttribute('questionTemplates', this.value)"><option>Select</option></select>
        </div>
        <div class="enc-form-row">
          <label class="enc-form-label" for="survey-templates">Survey templates</label>
          <select id="survey-templates" class="enc-input-field" onchange="updateAttribute('surveyTemplates', this.value)"><option>Select</option></select>
        </div>
      </div>
    </div>

    <!-- Tier 3 (full): Labels & Tags -->
    <div class="enc-edit-section enc-card enc-edit-section-full">
      <h3 class="enc-edit-section-title">Labels & Tags</h3>
      <div class="enc-form-row">
        <div class="enc-tags-input" id="tags-input-${question.id}">
          ${(question.tags || []).map(tag => `
            <span class="enc-tag">
              ${tag}
              <button type="button" class="enc-tag-remove" onclick="removeTag('${tag}')" aria-label="Remove tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </span>
          `).join('')}
          <select class="enc-input-field" style="border: none; padding: 0; min-height: auto; width: auto;" onchange="addTag(this.value); this.value=''">
            <option value="">Add tag...</option>
            <option value="First">First</option>
            <option value="Second">Second</option>
            <option value="Third">Third</option>
            <option value="Fourth">Fourth</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Edit Logic (full) -->
    <div class="enc-edit-section enc-card enc-edit-section-full">
      <h3 class="enc-edit-section-title">Edit Logic</h3>
      ${logicRules.map((rule, i) => `
        <div class="enc-logic-row enc-form-row two-columns">
          <select class="enc-input-field" onchange="updateLogicRule && updateLogicRule(${question.id}, ${i}, 'if', this.value)"><option>IF</option></select>
          <select class="enc-input-field" onchange="updateLogicRule && updateLogicRule(${question.id}, ${i}, 'question', this.value)"><option>Question</option></select>
          <select class="enc-input-field" onchange="updateLogicRule && updateLogicRule(${question.id}, ${i}, 'is', this.value)"><option>IS</option></select>
          <select class="enc-input-field" onchange="updateLogicRule && updateLogicRule(${question.id}, ${i}, 'option', this.value)"><option>Option</option></select>
        </div>
      `).join('')}
      <div class="enc-form-row">
        <button type="button" class="enc-property-add-button" onclick="addLogicRuleRow && addLogicRuleRow()">Add Rule</button>
      </div>
    </div>

    <div class="enc-edit-actions enc-edit-section-full">
      <button type="button" class="enc-action-secondary" onclick="cancelEdit && cancelEdit()">Cancel</button>
      <button type="button" class="enc-action-primary" onclick="saveSurvey && saveSurvey()">Save changes</button>
    </div>
  `;
}

// Render properties panel — question-scoped; empty state when no questions selected for properties
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
    ? `<p class="enc-structure-meta enc-text-muted" style="margin: 0 0 var(--stack-gap-sm) 0;">${selectedQuestionIdsForProperties.length} questions selected. Editing first.</p>`
    : '';

  const html = multiLabel + `
    <div class="enc-property-section">
      <h3 class="enc-property-section-title">General settings</h3>
      <div class="enc-property-toggle-row">
        <span class="enc-property-toggle-label">Required</span>
        <button type="button" 
                class="enc-toggle" 
                role="switch" 
                aria-pressed="${question.properties.required}"
                onclick="toggleProperty('required')"></button>
      </div>
      <div class="enc-property-toggle-row">
        <span class="enc-property-toggle-label">Add other options</span>
        <button type="button" 
                class="enc-toggle" 
                role="switch" 
                aria-pressed="${question.properties.addOther}"
                onclick="toggleProperty('addOther')"></button>
      </div>
      <div class="enc-property-toggle-row">
        <span class="enc-property-toggle-label">Add Text to speech</span>
        <button type="button" 
                class="enc-toggle" 
                role="switch" 
                aria-pressed="${question.properties.textToSpeech}"
                onclick="toggleProperty('textToSpeech')"></button>
      </div>
      <div class="enc-property-toggle-row">
        <span class="enc-property-toggle-label">Favorability range</span>
        <button type="button" 
                class="enc-toggle" 
                role="switch" 
                aria-pressed="${question.properties.favorabilityRange}"
                onclick="toggleProperty('favorabilityRange')"></button>
      </div>
      <div class="enc-property-toggle-row">
        <span class="enc-property-toggle-label">Allow comments</span>
        <button type="button" 
                class="enc-toggle" 
                role="switch" 
                aria-pressed="${question.properties.allowComments}"
                onclick="toggleProperty('allowComments')"></button>
      </div>
    </div>

    <div class="enc-divider"></div>

    <div class="enc-property-section">
      <h3 class="enc-property-section-title">Display logic Rules</h3>
      <button type="button" class="enc-property-add-button" onclick="addLogicRule()">Add Logic</button>
    </div>
  `;

  container.innerHTML = html;
}

// Selection and update functions
function selectPage(id) { setSelection('page', id); }
function selectSection(id) { setSelection('section', id); }
function selectQuestion(id) { setSelection('question', id); }

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

function updateClassifier(index, value) {
  const question = findQuestion(selection.type === 'question' ? selection.id : null);
  if (question) {
    question.classifiers[index - 1] = value;
  }
}

function updateAttribute(attr, value) {
  const question = findQuestion(selection.type === 'question' ? selection.id : null);
  if (question) {
    question.attributes[attr] = value;
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

function toggleProperty(prop) {
  if (selectedQuestionIdsForProperties.length === 0) return;
  const question = findQuestion(selectedQuestionIdsForProperties[0]);
  if (question) {
    question.properties[prop] = !question.properties[prop];
    renderProperties();
  }
}


function addTag(tag) {
  if (!tag) return;
  const question = findQuestion(selection.type === 'question' ? selection.id : null);
  if (question && !question.tags.includes(tag)) {
    question.tags.push(tag);
    renderEditCanvas();
  }
}

function removeTag(tag) {
  const question = findQuestion(selection.type === 'question' ? selection.id : null);
  if (question) {
    question.tags = question.tags.filter(t => t !== tag);
    renderEditCanvas();
  }
}

function addQuestion(sectionId) {
  const page = surveyData.pages.find(p => p.sections.some(s => s.id === sectionId));
  const section = page?.sections.find(s => s.id === sectionId);
  if (section) {
    const newId = Date.now();
    const questionCount = section.questions.length + 1;
    section.questions.push({
      id: newId,
      questionNumber: `Q${questionCount}`,
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
        textToSpeech: false,
        favorabilityRange: false,
        allowComments: false
      }
    });
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
      questions: []
    });
    setSelection('section', newId);
  }
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
    sessionStorage.setItem('enculture-survey-preview-data', JSON.stringify(surveyData));
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
  toast.style.cssText = `
    position: fixed;
    top: var(--stack-gap-lg);
    right: var(--stack-gap-lg);
    background: var(--en-brand-primary-500);
    color: var(--en-neutral-0);
    padding: var(--stack-gap-md) var(--stack-gap-lg);
    border-radius: var(--control-radius);
    z-index: 1000;
    box-shadow: var(--en-shadow-md);
    font-family: var(--font-primary);
    font-size: var(--text-sm);
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Make functions globally available
window.selectPage = selectPage;
window.selectSection = selectSection;
window.selectQuestion = selectQuestion;
window.updateQuestionField = updateQuestionField;
window.updateClassifier = updateClassifier;
window.updateAttribute = updateAttribute;
window.updateQuestionOption = updateQuestionOption;
window.toggleProperty = toggleProperty;
window.addTag = addTag;
window.removeTag = removeTag;
window.addQuestion = addQuestion;
window.addSection = addSection;
window.addPage = addPage;
window.deleteSelectedQuestion = deleteSelectedQuestion;
window.addLogicRule = addLogicRule;
window.showQuestionMenu = showQuestionMenu;
window.togglePageSettingsPopover = togglePageSettingsPopover;
window.applyQuestionsPerPage = applyQuestionsPerPage;
window.previewSurvey = previewSurvey;
window.saveSurvey = saveSurvey;
window.toggleUploadMenu = toggleUploadMenu;
