// Get references to DOM elements
const addButton = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load tasks from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to render the todo list
function renderTodos() {
    todoList.innerHTML = ''; // Clear existing tasks
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo.text;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTodo(index);

        // Append delete button to the li
        li.appendChild(deleteButton);
        
        // Append li to the ul
        todoList.appendChild(li);
    });
}

// Function to add a new task
function addTodo() {
    const taskText = todoInput.value.trim();
    if (taskText) {
        const newTodo = {
            text: taskText
        };
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        todoInput.value = ''; // Clear input field
    }
}

// Function to delete a task
function deleteTodo(index) {
    todos.splice(index, 1); // Remove task from the array
    saveTodos(); // Save updated tasks
    renderTodos(); // Re-render tasks
}

// Event listener for the "Add Task" button
addButton.addEventListener('click', addTodo);

// Event listener to allow pressing Enter to add a task
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Render the initial list
renderTodos();
