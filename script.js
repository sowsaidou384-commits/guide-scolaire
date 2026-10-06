const subjects = [
  {
    name: 'Mathématiques',
    category: 'maths',
    description: 'Algèbre, géométrie et entraînement régulier pour progresser pas à pas.',
  },
  {
    name: 'Sciences',
    category: 'science',
    description: 'Observation, expérimentations et compréhension des mécanismes naturels.',
  },
  {
    name: 'Français',
    category: 'humanites',
    description: 'Lecture, écriture et analyse de textes pour renforcer la langue.',
  },
  {
    name: 'Anglais',
    category: 'langues',
    description: 'Vocabulaire, grammaire et expression orale pour gagner en confiance.',
  },
  {
    name: 'Arabe',
    category: 'langues',
    description: 'Lecture, écriture et compréhension du texte arabe pour renforcer la langue.',
  },
  {
    name: 'Histoire-Géographie',
    category: 'humanites',
    description: 'Comprendre les événements, les cartes et les grands repères du monde.',
  },
  {
    name: 'Instruction religieuse',
    category: 'humanites',
    description: 'Approfondir les principes islamiques, la morale et la culture religieuse.',
  },
  {
    name: 'Physique-Chimie',
    category: 'science',
    description: 'Exercices concrets et méthodes pour maîtriser les notions clés.',
  },
];

const subjectList = document.querySelector('#subject-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const taskList = document.querySelector('#task-list');
const taskProgress = document.querySelector('#task-progress');

const tasks = [
  { id: 1, text: 'Réviser les fractions de maths', done: false },
  { id: 2, text: 'Préparer le devoir de sciences', done: true },
  { id: 3, text: 'Relire les notes de français', done: false },
];

function renderSubjects(filter = 'all') {
  const visibleSubjects = filter === 'all'
    ? subjects
    : subjects.filter((subject) => subject.category === filter);

  subjectList.innerHTML = visibleSubjects
    .map(
      (subject) => `
        <article class="subject-card subject-card--${subject.category}">
          <span class="subject-badge subject-badge--${subject.category}">${subject.category}</span>
          <h3>${subject.name}</h3>
          <p>${subject.description}</p>
        </article>
      `
    )
    .join('');
}

function renderTasks() {
  if (!taskList) return;

  taskList.innerHTML = tasks
    .map(
      (task) => `
        <li class="task-item ${task.done ? 'done' : ''}">
          <input type="checkbox" id="task-${task.id}" ${task.done ? 'checked' : ''} />
          <label for="task-${task.id}">${task.text}</label>
        </li>
      `
    )
    .join('');

  const completedCount = tasks.filter((task) => task.done).length;
  taskProgress.textContent = completedCount;

  taskList.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const taskId = Number(event.target.id.replace('task-', ''));
      const task = tasks.find((item) => item.id === taskId);
      if (task) {
        task.done = event.target.checked;
        renderTasks();
      }
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    renderSubjects(button.dataset.filter);
  });
});

renderSubjects();
renderTasks();
