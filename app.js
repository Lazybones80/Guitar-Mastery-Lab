(function () {
  'use strict';

  const DATA = window.GML_DATA;
  const $ = (selector, root) => (root || document).querySelector(selector);
  const $$ = (selector, root) => Array.from((root || document).querySelectorAll(selector));
  const STORAGE_KEY = 'guitar-mastery-lab-progress-v1';
  const levelNames = ['Foundations', 'Developing', 'Intermediate', 'Advanced', 'Mastery'];
  const focusLabels = {
    all: 'Balanced',
    fretboard: 'Fretboard',
    intervals: 'Intervals',
    scales: 'Scales',
    triads: 'Triads',
    chords: 'Chords',
    rhythm: 'Rhythm',
    picking: 'Picking',
    expressive: 'Expression',
    lead: 'Lead',
    ear: 'Ear training',
    theory: 'Applied theory',
    songwriting: 'Composition'
  };

  const defaultProgress = {
    completed: {},
    notes: {},
    tempos: {},
    roadmap: { phase: '1' },
    practice: { duration: 30, level: 1, focuses: ['all'], session: [], history: [] }
  };

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function loadProgress() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        ...clone(defaultProgress),
        ...parsed,
        completed: { ...defaultProgress.completed, ...(parsed.completed || {}) },
        notes: { ...defaultProgress.notes, ...(parsed.notes || {}) },
        tempos: { ...defaultProgress.tempos, ...(parsed.tempos || {}) },
        roadmap: { ...defaultProgress.roadmap, ...(parsed.roadmap || {}) },
        practice: { ...defaultProgress.practice, ...(parsed.practice || {}) }
      };
    } catch (error) {
      return clone(defaultProgress);
    }
  }

  const progress = loadProgress();
  const ui = {
    view: 'dashboard',
    library: { query: '', department: 'all', difficulty: 'all', phase: 'all', status: 'all', module: 'all', selectedId: DATA.exercises[0].id },
    roadmapPhase: progress.roadmap.phase || '1'
  };

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    renderDashboard();
    renderRoadmap();
    updatePracticeStats();
  }
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (match) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[match]));
  }
  function toast(message) {
    const element = $('#toast');
    element.textContent = message;
    element.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => element.classList.remove('show'), 2400);
  }
  function completedCount() { return DATA.exercises.filter((exercise) => progress.completed[exercise.id]).length; }
  function completionPercent() { return Math.round((completedCount() / DATA.exercises.length) * 100); }
  function exerciseById(id) { return DATA.exercises.find((exercise) => exercise.id === id) || DATA.exercises[0]; }
  function phaseByKey(key) { return DATA.roadmap.find((phase) => phase.key === key) || DATA.phases.find((phase) => phase.key === key) || DATA.phases[0]; }
  function moduleById(id) { return DATA.modules.find((module) => module.id === id); }

  function setView(view) {
    ui.view = view;
    $$('.view').forEach((section) => { section.hidden = section.dataset.view !== view; });
    $$('.nav-link').forEach((button) => button.classList.toggle('active', button.dataset.viewTarget === view));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'library') { renderLibrary(); }
    if (view === 'practice') { renderPractice(); }
    if (view === 'roadmap') { renderRoadmap(); }
  }

  function filteredExercises() {
    const query = ui.library.query.trim().toLowerCase();
    return DATA.exercises.filter((exercise) => {
      const haystack = [exercise.title, exercise.departmentLabel, exercise.moduleLabel, exercise.objective, exercise.content, exercise.tags.join(' ')].join(' ').toLowerCase();
      return (!query || haystack.includes(query))
        && (ui.library.department === 'all' || exercise.department === ui.library.department)
        && (ui.library.difficulty === 'all' || String(exercise.difficulty) === String(ui.library.difficulty))
        && (ui.library.phase === 'all' || exercise.phase === ui.library.phase)
        && (ui.library.module === 'all' || exercise.module === ui.library.module)
        && (ui.library.status === 'all' || (ui.library.status === 'done' ? !!progress.completed[exercise.id] : !progress.completed[exercise.id]));
    });
  }

  function renderDashboard() {
    const done = completedCount();
    const percent = completionPercent();
    $('#statExercises').textContent = DATA.meta.exerciseCount;
    $('#statPhases').textContent = DATA.phases.length;
    $('#statCompleted').textContent = percent + '%';
    $('#statPractice').textContent = progress.practice.history.length;
    $('#overallProgressBar').style.width = percent + '%';
    $('#progressSummary').textContent = done ? done + ' of ' + DATA.exercises.length + ' exercises have a saved completion state.' : 'Start with one focused exercise and let the record build.';
    const next = DATA.exercises.find((exercise) => !progress.completed[exercise.id]) || DATA.exercises[0];
    $('#continueTitle').textContent = next.title;
    $('#continueCopy').textContent = next.objective;
    $('#continueMeta').innerHTML = '<span class="tag teal">' + esc(next.departmentLabel) + '</span><span class="tag amber">Phase ' + esc(next.phase === 'advanced' ? 'Advanced' : next.phase) + '</span><span class="tag">' + esc(next.difficultyLabel) + '</span>';
    $('#continueBtn').onclick = () => { ui.library.selectedId = next.id; setView('library'); };
    const balance = DATA.departments.map((department) => {
      const all = DATA.exercises.filter((exercise) => exercise.department === department.id);
      const count = all.filter((exercise) => progress.completed[exercise.id]).length;
      const width = all.length ? Math.round((count / all.length) * 100) : 0;
      return '<div class="balance-row"><strong>' + esc(department.short) + '</strong><div class="balance-bar"><span style="width:' + width + '%"></span></div><span>' + count + '/' + all.length + '</span></div>';
    }).join('');
    $('#balanceList').innerHTML = balance;
    $('#dashboardPhases').innerHTML = DATA.phases.map((phase) => {
      const phaseExercises = DATA.exercises.filter((exercise) => exercise.phase === phase.key);
      const count = phaseExercises.filter((exercise) => progress.completed[exercise.id]).length;
      return '<button class="phase-chip" type="button" data-phase-chip="' + esc(phase.key) + '"><span class="phase-no">' + (phase.number < 10 ? '0' : '') + phase.number + '</span><strong>' + esc(phase.title) + '</strong><small>' + count + '/' + phaseExercises.length + ' complete</small></button>';
    }).join('');
    $$('#dashboardPhases [data-phase-chip]').forEach((button) => button.addEventListener('click', () => openPhase(button.dataset.phaseChip)));
  }

  function openPhase(key) {
    ui.roadmapPhase = key;
    progress.roadmap.phase = key;
    persist();
    setView('roadmap');
  }

  function renderRoadmap() {
    const phase = phaseByKey(ui.roadmapPhase);
    const phaseExercises = DATA.exercises.filter((exercise) => exercise.phase === phase.key);
    $('#roadmapComplete').textContent = completedCount() + ' / ' + DATA.exercises.length;
    $('#roadmapGrid').innerHTML = DATA.phases.map((item) => {
      const exercises = DATA.exercises.filter((exercise) => exercise.phase === item.key);
      const count = exercises.filter((exercise) => progress.completed[exercise.id]).length;
      return '<button class="road-card' + (item.key === phase.key ? ' selected' : '') + '" type="button" data-roadmap-phase="' + esc(item.key) + '"><div class="road-top"><span>' + (item.number < 10 ? '0' : '') + item.number + ' · ' + esc(item.range) + '</span><span class="road-progress">' + count + '/' + exercises.length + '</span></div><h3>' + esc(item.title) + '</h3><p>' + esc(item.summary) + '</p><div class="road-range">' + (item.key === 'advanced' ? 'Optional library' : 'Suggested progression') + '</div></button>';
    }).join('');
    $$('#roadmapGrid [data-roadmap-phase]').forEach((button) => button.addEventListener('click', () => {
      ui.roadmapPhase = button.dataset.roadmapPhase;
      progress.roadmap.phase = ui.roadmapPhase;
      persist();
      renderRoadmap();
    }));
    $('#roadmapDetailTitle').textContent = phase.title;
    $('#roadmapDetailSummary').textContent = phase.summary + ' ' + phase.range + '.';
    $('#moduleList').innerHTML = phase.modules.length ? phase.modules.map((module) => {
      const moduleExercises = DATA.exercises.filter((exercise) => exercise.module === module.id);
      const count = moduleExercises.filter((exercise) => progress.completed[exercise.id]).length;
      return '<button class="module-card" type="button" data-open-module="' + esc(module.id) + '"><strong>' + esc(module.name) + '</strong><span>' + esc(module.summary) + '</span><small>' + count + '/' + moduleExercises.length + ' exercises complete · ' + esc(module.departmentLabel) + '</small></button>';
    }).join('') : '<div class="empty">This continuing section is intentionally open-ended. Use its modules as a menu for further study.</div>';
    $$('#moduleList [data-open-module]').forEach((button) => button.addEventListener('click', () => {
      ui.library.module = button.dataset.openModule;
      ui.library.phase = 'all';
      ui.library.department = 'all';
      ui.library.status = 'all';
      ui.library.query = '';
      setView('library');
    }));
    $('#roadmapOpenBtn').onclick = () => {
      ui.library.phase = phase.key;
      ui.library.module = 'all';
      ui.library.query = '';
      setView('library');
    };
  }

  function populateLibraryFilters() {
    const departmentSelect = $('#departmentFilter');
    if (departmentSelect.options.length === 1) {
      DATA.departments.forEach((department) => {
        const option = document.createElement('option');
        option.value = department.id;
        option.textContent = department.name;
        departmentSelect.appendChild(option);
      });
    }
    const phaseSelect = $('#phaseFilter');
    if (phaseSelect.options.length === 1) {
      DATA.phases.forEach((phase) => {
        const option = document.createElement('option');
        option.value = phase.key;
        option.textContent = 'Phase ' + (phase.key === 'advanced' ? 'Advanced' : phase.number) + ' · ' + phase.title;
        phaseSelect.appendChild(option);
      });
    }
    departmentSelect.value = ui.library.department === 'all' ? 'all' : ui.library.department;
    $('#difficultyFilter').value = ui.library.difficulty;
    phaseSelect.value = ui.library.phase;
    $('#statusFilter').value = ui.library.status;
  }

  function renderLibrary() {
    populateLibraryFilters();
    $('#librarySearch').value = ui.library.query;
    const list = filteredExercises();
    $('#libraryCount').textContent = list.length;
    const selectedStillVisible = list.some((exercise) => exercise.id === ui.library.selectedId);
    if (!selectedStillVisible && list.length) ui.library.selectedId = list[0].id;
    $('#exerciseList').innerHTML = '<div class="list-heading"><strong>' + list.length + ' exercises</strong><span>' + (ui.library.module === 'all' ? (ui.library.phase === 'all' ? 'all curriculum' : 'phase ' + ui.library.phase) : esc(moduleById(ui.library.module)?.name || 'module')) + '</span></div>' + (list.length ? list.map((exercise) => {
      return '<button class="exercise-item' + (exercise.id === ui.library.selectedId ? ' selected' : '') + (progress.completed[exercise.id] ? ' completed' : '') + '" type="button" data-exercise-id="' + esc(exercise.id) + '"><span class="exercise-number">' + String(exercise.number).padStart(3, '0') + '</span><span><span class="exercise-name">' + esc(exercise.title) + '</span><span class="exercise-meta">' + esc(exercise.departmentLabel) + ' · ' + esc(exercise.difficultyLabel) + '</span></span><span class="exercise-check">' + (progress.completed[exercise.id] ? '✓' : '') + '</span></button>';
    }).join('') : '<div class="empty">No exercises match these filters. Clear one filter and try again.</div>');
    $$('#exerciseList [data-exercise-id]').forEach((button) => button.addEventListener('click', () => {
      ui.library.selectedId = button.dataset.exerciseId;
      renderLibrary();
    }));
    renderExerciseDetail();
  }

  function fretboardSvg(exercise) {
    const visual = exercise.visual;
    const start = Number.isFinite(visual.startFret) ? visual.startFret : 0;
    const end = Number.isFinite(visual.endFret) ? Math.max(start + 4, visual.endFret) : start + 5;
    const count = end - start + 1;
    const W = 820, H = 245, x0 = 82, x1 = 775, y0 = 39, y1 = 188;
    const cw = (x1 - x0) / count;
    const sy = (y1 - y0) / 5;
    let html = '<svg class="fretboard-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Fretboard diagram for ' + esc(exercise.title) + '"><defs><linearGradient id="wood-' + exercise.id + '" x1="0" x2="1"><stop offset="0" stop-color="#6f4b2f"/><stop offset=".5" stop-color="#b88956"/><stop offset="1" stop-color="#6b482d"/></linearGradient></defs><rect x="55" y="14" width="747" height="196" rx="16" fill="url(#wood-' + exercise.id + ')" opacity=".9"/>';
    for (let i = 0; i <= count; i += 1) {
      const x = x0 + i * cw;
      html += '<line x1="' + x + '" y1="' + (y0 - 15) + '" x2="' + x + '" y2="' + (y1 + 10) + '" stroke="' + (i === 0 ? '#f6e4c2' : 'rgba(35,19,8,.56)') + '" stroke-width="' + (i === 0 ? 6 : 1.4) + '"/>';
    }
    for (let row = 0; row < 6; row += 1) {
      const y = y0 + row * sy;
      html += '<line x1="' + (x0 - 2) + '" y1="' + y + '" x2="' + x1 + '" y2="' + y + '" stroke="rgba(248,241,220,.80)" stroke-width="' + (2.7 - row * .22) + '"/><text x="' + (x0 - 21) + '" y="' + (y + 4) + '" text-anchor="end" fill="#f8e6c6" font-size="12" font-weight="800">' + (6 - row) + '</text>';
    }
    [3, 5, 7, 9, 12, 15, 17].forEach((fret) => {
      if (fret >= start && fret <= end) {
        const x = x0 + (fret - start + .5) * cw;
        html += '<circle cx="' + x + '" cy="' + (y1 + 19) + '" r="' + (fret === 12 ? 5 : 3.4) + '" fill="rgba(241,226,199,.75)"/>';
      }
    });
    const seen = {};
    visual.notes.forEach((note, index) => {
      const key = note.string + '-' + note.fret;
      if (seen[key]) return;
      seen[key] = true;
      const row = 6 - note.string;
      const x = note.fret === 0 ? x0 - 18 : x0 + (note.fret - start + .5) * cw;
      const y = y0 + row * sy;
      const color = note.role === 'root' || note.label === 'R' ? '#5be0c7' : (index % 2 ? '#f3bd63' : '#d4eee8');
      html += '<circle cx="' + x + '" cy="' + y + '" r="15" fill="' + color + '" stroke="#082029" stroke-width="3"/><text x="' + x + '" y="' + (y + 4) + '" text-anchor="middle" fill="#061b20" font-size="10" font-weight="900">' + esc(note.label) + '</text>';
    });
    for (let fret = start; fret <= end; fret += 1) {
      const x = fret === 0 ? x0 - 18 : x0 + (fret - start + .5) * cw;
      html += '<text x="' + x + '" y="' + (H - 10) + '" text-anchor="middle" fill="#f4dfbe" font-size="11" font-weight="800">' + (fret === 0 ? 'open' : fret) + '</text>';
    }
    html += '<text x="202" y="234" fill="#f4dfbe" font-size="10">low E · string 6 → high e · string 1</text></svg>';
    return html;
  }

  function visualHtml(exercise) {
    const visual = exercise.visual;
    if (visual.type === 'fretboard') {
      return '<div class="visual-card"><div class="visual-head"><h3>Fretboard map</h3><span>' + esc(visual.caption || 'standard tuning · labels show the exercise role') + '</span></div>' + fretboardSvg(exercise) + '</div>';
    }
    if (visual.type === 'tab') {
      return '<div class="visual-card"><div class="visual-head"><h3>Playable tab cell</h3><span>low E at the bottom · keep the written rhythm intact</span></div><div class="tab-box"><pre>' + esc(visual.lines.join('\n')) + '</pre></div></div>';
    }
    return '<div class="visual-card"><div class="visual-head"><h3>Rhythm grid</h3><span>say the count before adding the chord</span></div><div class="rhythm-visual"><div class="rhythm-count">' + esc(visual.count) + '</div><div class="rhythm-pattern">' + esc(visual.pattern) + '</div></div></div>';
  }

  function renderExerciseDetail() {
    const exercise = exerciseById(ui.library.selectedId);
    ui.library.selectedId = exercise.id;
    const list = filteredExercises();
    const index = list.findIndex((item) => item.id === exercise.id);
    const previous = list[(index - 1 + list.length) % list.length] || exercise;
    const next = list[(index + 1) % list.length] || exercise;
    const done = !!progress.completed[exercise.id];
    const recordedTempo = progress.tempos[exercise.id] || exercise.tempo.start;
    $('#exerciseDetail').innerHTML = '<div class="detail-head"><div><h2>' + esc(exercise.title) + '</h2><p class="detail-sub">' + esc(exercise.departmentLabel) + ' · ' + esc(exercise.moduleLabel) + ' · phase ' + esc(exercise.phase === 'advanced' ? 'advanced' : exercise.phase) + '</p></div><div class="detail-actions"><button class="btn small" type="button" id="previousExerciseBtn">← Prev</button><button class="btn small" type="button" id="nextExerciseBtn">Next →</button></div></div>' +
      '<div class="tag-row"><span class="tag teal">' + esc(exercise.difficultyLabel) + '</span><span class="tag amber">' + exercise.durationMinutes + ' min</span><span class="tag">start ' + exercise.tempo.start + ' BPM</span><span class="tag">' + esc(exercise.moduleLabel) + '</span>' + (done ? '<span class="tag" style="color:#071b20;background:#a7e88f">completed</span>' : '') + '</div>' +
      '<div class="objective-box"><h3>Learning objective</h3><p>' + esc(exercise.objective) + '</p></div>' +
      '<div class="detail-grid"><div class="inner-card"><div class="inner-title"><span>Practice sequence</span><strong>' + esc(exercise.repetitions) + '</strong></div><ol class="step-list">' + exercise.instructions.map((step, i) => '<li class="step-row"><b>' + (i + 1) + '</b><span>' + esc(step) + '</span></li>').join('') + '</ol></div><div class="inner-card"><div class="inner-title"><span>Playable setup</span><strong>exact starting point</strong></div><p class="muted">' + esc(exercise.setup) + '</p><p class="muted"><strong>Material:</strong> ' + esc(exercise.playable) + '</p><label class="tempo-control" for="tempoRecord">Clean tempo record<input id="tempoRecord" type="number" min="20" max="260" step="1" value="' + esc(recordedTempo) + '"><small>Target: ' + exercise.tempo.target + ' BPM · raise by ' + exercise.tempo.increment + ' BPM after a clean pass.</small></label></div></div>' +
      visualHtml(exercise) +
      '<div class="two-col"><div class="inner-card"><div class="inner-title"><span>Variations</span><strong>develop the same skill</strong></div><ul class="bullet-list">' + exercise.variations.map((item) => '<li class="bullet-row"><i></i><span>' + esc(item) + '</span></li>').join('') + '</ul></div><div class="inner-card"><div class="inner-title"><span>Listening and technique cues</span><strong>what to notice</strong></div><ul class="bullet-list">' + exercise.listeningPoints.map((item) => '<li class="bullet-row"><i></i><span>' + esc(item) + '</span></li>').join('') + '</ul></div></div>' +
      '<div class="two-col practice-panel"><div class="mastery-box"><h3>Mastery checks</h3><ul class="bullet-list">' + exercise.mastery.map((item) => '<li class="bullet-row"><i></i><span>' + esc(item) + '</span></li>').join('') + '</ul></div><div class="inner-card"><div class="inner-title"><span>Common corrections</span><strong>reset the loop</strong></div><ul class="bullet-list">' + exercise.commonMistakes.map((item) => '<li class="bullet-row"><i></i><span>' + esc(item) + '</span></li>').join('') + '</ul></div></div>' +
      '<div class="two-col"><div class="notes-box inner-card"><label for="exerciseNotes">Your practice note</label><textarea id="exerciseNotes" placeholder="What stayed clean? What needs another slow pass?">' + esc(progress.notes[exercise.id] || '') + '</textarea><small class="source-note">Saved locally as you type.</small></div><div class="inner-card"><div class="inner-title"><span>Next logical step</span><strong>keep the chain moving</strong></div><p class="muted"><strong>Prerequisite:</strong> ' + esc(exercise.prerequisites[0]) + '</p><p class="muted"><strong>Next:</strong> ' + esc(exercise.related.next) + '</p></div></div>' +
      '<div class="detail-footer"><small>Exercise ' + String(exercise.number).padStart(3, '0') + ' · ' + esc(exercise.departmentLabel) + '</small><button class="btn ' + (done ? '' : 'primary') + '" type="button" id="completeExerciseBtn">' + (done ? 'Mark incomplete' : 'Mark complete') + '</button></div>';
    $('#previousExerciseBtn').onclick = () => { ui.library.selectedId = previous.id; renderLibrary(); };
    $('#nextExerciseBtn').onclick = () => { ui.library.selectedId = next.id; renderLibrary(); };
    $('#completeExerciseBtn').onclick = () => {
      progress.completed[exercise.id] = !done;
      persist();
      renderLibrary();
      toast(progress.completed[exercise.id] ? 'Exercise ' + exercise.number + ' marked complete.' : 'Exercise reopened.');
    };
    $('#exerciseNotes').addEventListener('input', (event) => {
      progress.notes[exercise.id] = event.target.value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    });
    $('#tempoRecord').addEventListener('change', (event) => {
      const value = Math.max(20, Math.min(260, Number(event.target.value) || exercise.tempo.start));
      progress.tempos[exercise.id] = value;
      event.target.value = value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      toast('Tempo record saved at ' + value + ' BPM.');
    });
  }

  function setLibraryFilter(filter, value) {
    if (filter === 'department') ui.library.department = value;
    if (filter === 'difficulty') ui.library.difficulty = value;
    if (filter === 'phase') ui.library.phase = value;
    if (filter === 'status') ui.library.status = value;
    if (filter === 'module') ui.library.module = value;
    renderLibrary();
  }

  function renderPracticeConfig() {
    const durations = [15, 30, 45, 60, 90];
    $('#durationChoices').innerHTML = durations.map((duration) => '<button class="choice' + (progress.practice.duration === duration ? ' active' : '') + '" type="button" data-duration="' + duration + '">' + duration + 'm</button>').join('');
    $$('#durationChoices [data-duration]').forEach((button) => button.addEventListener('click', () => {
      progress.practice.duration = Number(button.dataset.duration);
      persist();
      renderPractice();
    }));
    $('#levelChoice').value = String(progress.practice.level);
    $('#focusChoices').innerHTML = Object.keys(focusLabels).map((key) => {
      const checked = progress.practice.focuses.includes(key) || (key !== 'all' && progress.practice.focuses.includes('all'));
      return '<label class="focus-choice"><input type="checkbox" data-focus="' + key + '" ' + (checked ? 'checked' : '') + '><span>' + esc(focusLabels[key]) + '</span></label>';
    }).join('');
    $$('#focusChoices input').forEach((input) => input.addEventListener('change', () => {
      const selected = $$('#focusChoices input:checked').map((item) => item.dataset.focus);
      progress.practice.focuses = selected.length ? selected.filter((key) => key !== 'all') : ['all'];
      if (input.dataset.focus === 'all' && input.checked) progress.practice.focuses = ['all'];
      if (input.dataset.focus !== 'all' && input.checked) progress.practice.focuses = progress.practice.focuses.filter((key) => key !== 'all');
      persist();
      renderPracticeConfig();
    }));
    $('#levelChoice').onchange = (event) => {
      progress.practice.level = Number(event.target.value);
      persist();
      renderPracticeConfig();
    };
    $('#plannerEstimate').textContent = progress.practice.duration + ' minutes';
  }

  function eligibleForPractice() {
    const maxLevel = Number(progress.practice.level);
    const focuses = progress.practice.focuses.includes('all') || !progress.practice.focuses.length ? null : progress.practice.focuses;
    let pool = DATA.exercises.filter((exercise) => exercise.difficulty <= maxLevel && (!focuses || focuses.includes(exercise.department)));
    if (pool.length < 8) pool = DATA.exercises.filter((exercise) => exercise.difficulty <= maxLevel);
    if (!pool.length) pool = DATA.exercises.slice();
    return pool;
  }

  function pickSession() {
    const duration = Number(progress.practice.duration);
    const pool = eligibleForPractice();
    const focusOrder = ['fretboard', 'picking', 'rhythm', 'triads', 'ear', 'lead', 'songwriting', 'theory', 'scales', 'chords', 'expressive', 'intervals'];
    const count = duration <= 15 ? 4 : duration <= 30 ? 6 : duration <= 45 ? 7 : duration <= 60 ? 8 : 10;
    const selected = [];
    const used = {};
    const addFrom = (department) => {
      const options = pool.filter((exercise) => exercise.department === department && !used[exercise.id]);
      if (!options.length) return;
      const offset = (progress.practice.history.length + selected.length) % options.length;
      const chosen = options[offset];
      used[chosen.id] = true;
      selected.push(chosen);
    };
    const requested = progress.practice.focuses.includes('all') ? focusOrder : progress.practice.focuses;
    requested.forEach(addFrom);
    focusOrder.forEach((department) => { if (selected.length < count) addFrom(department); });
    pool.forEach((exercise) => { if (selected.length < count && !used[exercise.id]) { used[exercise.id] = true; selected.push(exercise); } });
    const chosen = selected.slice(0, count);
    const base = Math.max(3, Math.floor(duration / chosen.length));
    let remainder = duration - base * chosen.length;
    progress.practice.session = chosen.map((exercise, index) => ({
      id: exercise.id,
      minutes: base + (remainder-- > 0 ? 1 : 0),
      done: false
    }));
    persist();
    renderPractice();
    toast('Balanced session ready.');
  }

  function renderSession() {
    const session = progress.practice.session || [];
    const done = session.filter((item) => item.done).length;
    const totalMinutes = session.reduce((sum, item) => sum + Number(item.minutes || 0), 0);
    $('#sessionProgressText').textContent = done + ' / ' + session.length + ' complete';
    $('#sessionProgressBar').style.width = (session.length ? Math.round((done / session.length) * 100) : 0) + '%';
    $('#sessionTitle').textContent = session.length ? totalMinutes + '-minute session' : 'Your next session';
    $('#sessionList').innerHTML = session.length ? session.map((item, index) => {
      const exercise = exerciseById(item.id);
      return '<div class="session-item' + (item.done ? ' done' : '') + '"><input type="checkbox" data-session-check="' + esc(item.id) + '" ' + (item.done ? 'checked' : '') + ' aria-label="Complete ' + esc(exercise.title) + '"><div><span class="session-name">' + esc(exercise.title) + '</span><span class="session-desc">' + esc(exercise.departmentLabel) + ' · ' + item.minutes + ' min · ' + esc(exercise.objective) + '</span></div><div class="session-controls"><button class="icon-btn" type="button" data-session-up="' + index + '" aria-label="Move exercise up">↑</button><button class="icon-btn" type="button" data-session-down="' + index + '" aria-label="Move exercise down">↓</button><button class="icon-btn" type="button" data-session-replace="' + index + '" aria-label="Replace exercise">↻</button></div></div>';
    }).join('') : '<div class="empty">Choose your time and focus, then generate a session. The planner will include a technique task, a knowledge task, and musical application.</div>';
    if (session.length) {
      const remaining = session.filter((item) => !item.done).map((item) => exerciseById(item.id).title);
      $('#sessionSummary').textContent = done === session.length ? 'Session complete. Save the win in your history, then return tomorrow for a review mix.' : 'Next up: ' + remaining.slice(0, 2).join(' · ') + (remaining.length > 2 ? ' · …' : '');
    } else {
      $('#sessionSummary').textContent = '';
    }
    $$('#sessionList [data-session-check]').forEach((input) => input.addEventListener('change', () => {
      const item = progress.practice.session.find((candidate) => candidate.id === input.dataset.sessionCheck);
      if (item) item.done = input.checked;
      persist();
      renderSession();
    }));
    $$('#sessionList [data-session-up]').forEach((button) => button.addEventListener('click', () => moveSession(Number(button.dataset.sessionUp), -1)));
    $$('#sessionList [data-session-down]').forEach((button) => button.addEventListener('click', () => moveSession(Number(button.dataset.sessionDown), 1)));
    $$('#sessionList [data-session-replace]').forEach((button) => button.addEventListener('click', () => replaceSession(Number(button.dataset.sessionReplace))));
  }

  function moveSession(index, delta) {
    const session = progress.practice.session;
    const nextIndex = index + delta;
    if (nextIndex < 0 || nextIndex >= session.length) return;
    [session[index], session[nextIndex]] = [session[nextIndex], session[index]];
    persist();
    renderPractice();
  }

  function replaceSession(index) {
    const current = progress.practice.session[index];
    const pool = eligibleForPractice().filter((exercise) => !progress.practice.session.some((item) => item.id === exercise.id));
    if (!pool.length) { toast('No unused exercise fits this session.'); return; }
    progress.practice.session[index] = { id: pool[(index + progress.practice.history.length) % pool.length].id, minutes: current.minutes, done: false };
    persist();
    renderPractice();
    toast('Exercise replaced.');
  }

  function logSession() {
    const session = progress.practice.session || [];
    if (!session.length) { toast('Generate a session before logging it.'); return; }
    const completed = session.filter((item) => item.done).length;
    progress.practice.history.unshift({ date: new Date().toISOString(), duration: session.reduce((sum, item) => sum + Number(item.minutes || 0), 0), completed, total: session.length });
    progress.practice.history = progress.practice.history.slice(0, 30);
    persist();
    renderPractice();
    toast(completed === session.length ? 'Complete session logged.' : 'Partial session logged for review.');
  }

  function renderHistory() {
    const history = progress.practice.history || [];
    $('#practiceSessionCount').textContent = history.length;
    $('#historyHint').textContent = history.length ? history.length + ' saved session' + (history.length === 1 ? '' : 's') : 'Your completed sessions will appear here.';
    $('#historyList').innerHTML = history.length ? history.slice(0, 8).map((item) => {
      const date = new Date(item.date);
      const label = Number.isNaN(date.getTime()) ? 'Saved session' : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
      return '<div class="history-row"><span><strong>' + esc(label) + '</strong> · ' + item.duration + ' minutes</span><span>' + item.completed + '/' + item.total + ' exercises</span></div>';
    }).join('') : '<div class="empty">Generate and log a session to make your practice history visible here.</div>';
  }

  function renderPractice() {
    renderPracticeConfig();
    renderSession();
    renderHistory();
    $('#shuffleSessionBtn').onclick = pickSession;
    $('#generateSessionBtn').onclick = pickSession;
    $('#logSessionBtn').onclick = logSession;
  }

  function updatePracticeStats() {
    $('#statPractice').textContent = progress.practice.history.length;
    if ($('#practiceSessionCount')) $('#practiceSessionCount').textContent = progress.practice.history.length;
  }

  function exportProgress() {
    const payload = {
      app: DATA.meta.name,
      version: DATA.meta.version,
      exportedAt: new Date().toISOString(),
      completed: progress.completed,
      notes: progress.notes,
      tempos: progress.tempos,
      roadmap: progress.roadmap,
      practice: progress.practice
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'guitar-mastery-lab-progress.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 400);
    toast('Progress exported as JSON.');
  }

  function importProgress(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const isRecord = (value) => value && typeof value === 'object' && !Array.isArray(value);
        const validIds = new Set(DATA.exercises.map((exercise) => exercise.id));
        if (!isRecord(parsed) || (!parsed.completed && !parsed.practice)) throw new Error('unsupported');
        if (parsed.completed && !isRecord(parsed.completed)) throw new Error('completed');
        if (parsed.notes && !isRecord(parsed.notes)) throw new Error('notes');
        if (parsed.tempos && !isRecord(parsed.tempos)) throw new Error('tempos');
        if (parsed.practice && !isRecord(parsed.practice)) throw new Error('practice');
        const importedCompleted = Object.fromEntries(Object.entries(parsed.completed || {}).filter(([id, value]) => validIds.has(id) && value === true));
        const importedNotes = Object.fromEntries(Object.entries(parsed.notes || {}).filter(([id, value]) => validIds.has(id) && typeof value === 'string').map(([id, value]) => [id, value.slice(0, 4000)]));
        const importedTempos = Object.fromEntries(Object.entries(parsed.tempos || {}).filter(([id, value]) => validIds.has(id) && Number.isFinite(Number(value))).map(([id, value]) => [id, Math.max(20, Math.min(260, Number(value)))]));
        progress.completed = { ...progress.completed, ...importedCompleted };
        progress.notes = { ...progress.notes, ...importedNotes };
        progress.tempos = { ...progress.tempos, ...importedTempos };
        progress.roadmap = { ...progress.roadmap, ...(parsed.roadmap || {}) };
        progress.practice = { ...progress.practice, ...(parsed.practice || {}) };
        if (![15, 30, 45, 60, 90].includes(Number(progress.practice.duration))) progress.practice.duration = defaultProgress.practice.duration;
        if (![1, 2, 3, 4, 5].includes(Number(progress.practice.level))) progress.practice.level = defaultProgress.practice.level;
        progress.practice.focuses = Array.isArray(progress.practice.focuses) ? progress.practice.focuses.filter((focus) => Object.prototype.hasOwnProperty.call(focusLabels, focus)) : ['all'];
        if (!progress.practice.focuses.length) progress.practice.focuses = ['all'];
        progress.practice.session = Array.isArray(progress.practice.session) ? progress.practice.session.filter((item) => item && validIds.has(item.id)).map((item) => ({ id: item.id, minutes: Math.max(1, Math.min(90, Number(item.minutes) || 5)), done: item.done === true })) : [];
        progress.practice.history = Array.isArray(progress.practice.history) ? progress.practice.history.slice(0, 30) : [];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        renderAll();
        toast('Progress imported and validated.');
      } catch (error) {
        toast('That file is not a valid Guitar Mastery Lab export.');
      }
    };
    reader.readAsText(file);
  }

  function renderAll() {
    renderDashboard();
    renderRoadmap();
    if (ui.view === 'library') renderLibrary();
    if (ui.view === 'practice') renderPractice();
    updatePracticeStats();
  }

  $$('.nav-link,[data-view-target]').forEach((button) => button.addEventListener('click', () => setView(button.dataset.viewTarget)));
  $$('.entry-card').forEach((button) => button.addEventListener('click', () => {
    const [filter, value] = button.dataset.libraryFilter.split(':');
    setLibraryFilter(filter, value);
    setView('library');
  }));
  $('#librarySearch').addEventListener('input', (event) => { ui.library.query = event.target.value; renderLibrary(); });
  $('#departmentFilter').addEventListener('change', (event) => setLibraryFilter('department', event.target.value));
  $('#difficultyFilter').addEventListener('change', (event) => setLibraryFilter('difficulty', event.target.value));
  $('#phaseFilter').addEventListener('change', (event) => setLibraryFilter('phase', event.target.value));
  $('#statusFilter').addEventListener('change', (event) => setLibraryFilter('status', event.target.value));
  $('#exportBtn').addEventListener('click', exportProgress);
  $('#importBtn').addEventListener('click', () => $('#importInput').click());
  $('#importInput').addEventListener('change', (event) => { if (event.target.files[0]) importProgress(event.target.files[0]); event.target.value = ''; });

  renderAll();
})();
