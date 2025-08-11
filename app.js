window.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Retrieve tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Function to display tasks on screen
  function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = 'task-item';
      if (task.completed) {
        li.classList.add('completed');
      }
      li.innerHTML = `
        <span>${task.text}</span>
        <div class="task-actions">
          <button class="complete-btn" data-index="${index}">${task.completed ? 'Undo' : 'Complete'}</button><button class="delete-btn" data-index="${index}">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }

  // Function to save tasks to localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Event listener to add a new task
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if(taskText !== '') {
      tasks.push({ text: taskText, completed: false });
      taskInput.value = '';
      saveTasks();
      displayTasks();
    }
  });

  // Event delegation for the complete and delete buttons
  taskList.addEventListener('click', (e) => {
    if(e.target.classList.contains('complete-btn')) {
      const index = e.target.dataset.index;
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      displayTasks();
    } else if(e.target.classList.contains('delete-btn')) {
      const index = e.target.dataset.index;
      tasks.splice(index, 1);
      saveTasks();
      displayTasks();
    }
  });

  // Initial display of tasks
  displayTasks();
});