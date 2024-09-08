// Access form
const getFormEle = document.querySelector('#todoInput') as HTMLFormElement;

// Handle id
let handleId = 0;

// Todos
let todos: Array<{ todo: string; id: number }> = [];

// Function to save todos to localStorage
const saveTodosToLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Function to load todos from localStorage
const loadTodosFromLocalStorage = () => {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    handleId =
      todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
    createTodos();
  }
};

// Function to create and display todos
const createTodos = () => {
  const todosContainer = document.getElementById('todos');

  // Clear the container
  if (todosContainer) {
    todosContainer.innerHTML = '';
  }

  todos.forEach((todo) => {
    // Create a div for each todo item
    const createDiv = document.createElement('div');
    createDiv.setAttribute('class', 'todo');

    // Create a paragraph for each todo name
    const createTodoName = document.createElement('p');
    createTodoName.setAttribute('class', 'todoName');
    createTodoName.textContent = todo.todo;

    // Create an edit button for each todo
    const createEdit = document.createElement('button');
    createEdit.setAttribute('id', 'edit-btn');
    createEdit.textContent = 'Edit'; // Button text

    // Create a delete button for each todo
    const createDel = document.createElement('button');
    createDel.setAttribute('id', 'delete-btn');
    createDel.textContent = 'Delete';

    // Append the todo name, edit button, and delete button to the div
    createDiv.appendChild(createTodoName);
    createDiv.appendChild(createEdit);
    createDiv.appendChild(createDel);

    // Append the todo div to the container
    if (todosContainer) {
      todosContainer.appendChild(createDiv);
    }

    // Add event listeners for edit and delete buttons
    createEdit.addEventListener('click', () => handleEdit(todo.id));
    createDel.addEventListener('click', () => handleDelete(todo.id));
  });

  // Save todos to localStorage
  saveTodosToLocalStorage();
};

// Function to handle todo editing
const handleEdit = (id: number) => {
  const todoToEdit = todos.find((todo) => todo.id === id);
  if (todoToEdit) {
    const newTodoValue = prompt('Edit the todo:', todoToEdit.todo);
    if (newTodoValue) {
      todoToEdit.todo = newTodoValue;
      createTodos();
    }
  }
};

// Function to handle todo deletion
const handleDelete = (id: number) => {
  todos = todos.filter((todo) => todo.id !== id);
  createTodos();
};

// Load todos when the page loads
loadTodosFromLocalStorage();

// Handle form submission
if (getFormEle) {
  getFormEle.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputEle = document.getElementById('todo-input') as HTMLInputElement;
    const todoValue: string = inputEle.value;

    if (todoValue.trim() === '') {
      alert('Todo cannot be empty');
      return;
    }

    const todoToObj = {
      todo: todoValue,
      id: handleId++,
    };

    todos.push(todoToObj);
    createTodos();
    inputEle.value = ''; // Clear the input after adding the todo
  });
}
