
function addTodoItem(taskName, taskDescription, taskDate, urgent, taskCategory,taskDetail) {
// Parent object
  var todoItem = {
    taskName: '',
    taskDescription: '',
    taskDate: '',
    urgent: false,
    taskCategory: '',
    taskOrder: 0
  };

  var todos = JSON.parse(localStorage.getItem("todoList")) || [];
  console.log(taskDetail)
  if(taskCategory == 'Education'){
    var educationTask = Object.create(todoItem); // prototype
    educationTask.taskName = taskName;
    educationTask.taskDescription = taskDescription;
    educationTask.taskDate = taskDate ;
    educationTask.urgent= urgent;
    educationTask.taskCategory= taskCategory;
    // educationTask.taskOrder= taskOrder;
    educationTask.educationField = taskDetail ; // unique field

    if(todos.length == 0){
      localStorage.setItem('todoList',JSON.stringify([educationTask]));
    }else{
      todos.push(educationTask)
      localStorage.setItem('todoList',JSON.stringify(todos));
    }

  }else{
    var groceriesTask = Object.create(todoItem); // prototype
    groceriesTask.taskName = taskName;
    groceriesTask.taskDescription = taskDescription;
    groceriesTask.taskDate = taskDate ;
    groceriesTask.urgent= urgent;
    groceriesTask.taskCategory= taskCategory;
    // groceriesTask.taskOrder= taskOrder;
    groceriesTask.groceryList = taskDetail; // unique field

    if(todos.length == 0){
      localStorage.setItem('todoList',JSON.stringify([groceriesTask]))
    }else{
      todos.push(groceriesTask)
      localStorage.setItem('todoList',JSON.stringify(todos));
    }
  }
  renderTodoTable();
  resetForm();
}

// Function to sort the list based on task order
function sortTodos(todos){
  return todos.sort(function(a, b) {
    return a.taskOrder - b.taskOrder;
  });
}

// Function to render the to-do table
function renderTodoTable() {
  var todoTableBody = document.getElementById('todoTableBody');
  todoTableBody.innerHTML = '';
  var todos = localStorage.getItem("todoList"); //todoList
  var todos = localStorage.getItem('todoList');
  todos = JSON.parse(todos) || [];
  console.log(todos)

  todos.forEach(function(todoItem) {
    var row = document.createElement('tr');
    row.draggable = true
    row.addEventListener('dragend',dragEnd)
    row.addEventListener('dragover',dragOver)
    row.addEventListener('dragstart',dragStart)

    var taskNameCell = document.createElement('td');
    taskNameCell.textContent = todoItem.taskName;
    row.appendChild(taskNameCell);

    var taskDescriptionCell = document.createElement('td');
    taskDescriptionCell.textContent = todoItem.taskDescription;
    row.appendChild(taskDescriptionCell);

    var taskdetailCell = document.createElement('td');
    taskdetailCell.textContent = Object.values(todoItem)[5];
    row.appendChild(taskdetailCell);

    var taskDateCell = document.createElement('td');
    taskDateCell.textContent = todoItem.taskDate;
    row.appendChild(taskDateCell);

    var urgentCell = document.createElement('td');
    urgentCell.textContent = todoItem.urgent ? 'Yes' : 'No';
    row.appendChild(urgentCell);

    var taskCategoryCell = document.createElement('td');
    taskCategoryCell.textContent = todoItem.taskCategory;
    row.appendChild(taskCategoryCell);

    // var taskOrderCell = document.createElement('td');
    // taskOrderCell.textContent = todoItem.taskOrder;
    // row.appendChild(taskOrderCell);

    var actionsCell = document.createElement('td');
    var viewBtn = document.createElement('button');
    viewBtn.classList.add('btn', 'btn-primary', 'viewBtn','mr-2');
    viewBtn.textContent = 'View';
    actionsCell.appendChild(viewBtn);

    var editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-success', 'editBtn');
    editBtn.textContent = 'Edit';
    actionsCell.appendChild(editBtn);

    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'deleteBtn','mr-2');
    deleteBtn.textContent = 'Delete';
    actionsCell.appendChild(deleteBtn);

    row.appendChild(actionsCell);

    todoTableBody.appendChild(row);
  });
}

// Function to reset the form
function resetForm() {
  document.getElementById('taskName').value = '';
  document.getElementById('taskDescription').value = '';
  document.getElementById('taskDate').value = '';
  document.getElementById('urgent').checked = false;
  document.getElementById('taskCategory').value = '';
  document.getElementById('subjectName').value = '';
  document.getElementById('groceryList').value = '';
  document.getElementById('school').style.display = 'none';
  document.getElementById('grocery').style.display = 'none';

}

// Function to show the view modal
function showViewModal(taskName, taskDescription, taskDate, urgent, taskCategory, taskOrder) {
  var viewModalList = document.getElementById('viewModalList');
  viewModalList.innerHTML = `
    <li class="list-group-item"><strong>Task Name:</strong> ${taskName}</li>
    <li class="list-group-item"><strong>Task Description:</strong> ${taskDescription}</li>
    <li class="list-group-item"><strong>Task Date:</strong> ${taskDate}</li>
    <li class="list-group-item"><strong>Urgent:</strong> ${urgent ? 'Yes' : 'No'}</li>
    <li class="list-group-item"><strong>Task Category:</strong> ${taskCategory}</li>
    <li class="list-group-item"><strong>Task Order:</strong> ${taskOrder}</li>
  `;

  var viewModal = new bootstrap.Modal(document.getElementById('viewModal'));
  viewModal.show();
}

// Function to show the edit modal
function showEditModal(index) {
  var editModal = new bootstrap.Modal(document.getElementById('editModal'));
  var todos = localStorage.getItem("todoList"); //todoList
  todos = JSON.parse(todos)
  var todoItem = todos[index];

  document.getElementById('editTaskName').value = todoItem.taskName;
  document.getElementById('editTaskDescription').value = todoItem.taskDescription;
  document.getElementById('editTaskDate').value = todoItem.taskDate;
  document.getElementById('editUrgent').checked = todoItem.urgent;
  document.getElementById('editTaskCategory').value = todoItem.taskCategory;
  document.getElementById('editTaskOrder').value = todoItem.taskOrder;

  document.getElementById('editSubmitBtn').onclick = function() {
    handleEditAction(index);
  };

  editModal.show();
}

// Function to handle the edit action
function handleEditAction(index) {
  var todos = localStorage.getItem("todoList"); //todoList
  if (todos == null){
    todos = []
  }
  else{
    todos = JSON.parse(todos)
  }
  
  
  // Verify if the index is within the valid range
  if (index >= 0 && index < todos.length) {
    var todoItem = todos[index];
  
    // Update the properties of the todoItem object
    todoItem.taskName = document.getElementById('editTaskName').value;
    todoItem.taskDescription = document.getElementById('editTaskDescription').value;
    todoItem.taskDate = document.getElementById('editTaskDate').value;
    todoItem.urgent = document.getElementById('editUrgent').checked;
    todoItem.taskCategory = document.getElementById('editTaskCategory').value;
    todoItem.taskOrder = document.getElementById('editTaskOrder').value;
  
    // Update the item at the given index in the todos array
    todos[index] = todoItem;
  
    // Update the modified list in local storage
    localStorage.setItem('todoList', JSON.stringify(todos));
    renderTodoTable();
  } else {
    console.log("Invalid index"); // Handle the case of an invalid index
  }
  
  

  var editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
  editModal.hide();
}

// Function to handle the delete action
function handleDeleteAction(index) {
  var todos = JSON.parse(localStorage.getItem("todoList"));
  todos.splice(index, 1);
  localStorage.setItem('todoList',JSON.stringify(todos));
  renderTodoTable();
}

// Function to handle form submission
document.getElementById('todoForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var taskName = document.getElementById('taskName').value;
  var taskDescription = document.getElementById('taskDescription').value;
  var taskDate = document.getElementById('taskDate').value;
  var urgent = document.getElementById('urgent').checked;
  var taskCategory = document.getElementById('taskCategory').value;
  // var taskOrder = document.getElementById('taskOrder').value;
  var subjectName = document.getElementById('subjectName').value;
  var groceryList = document.getElementById('groceryList').value;
  console.log(subjectName)
  console.log(groceryList)
  
  addTodoItem(taskName, taskDescription, taskDate, urgent, taskCategory,subjectName === ""?groceryList:subjectName);
});

 // Clear all to-do list data
    var clearAllBtn = document.getElementById('clearAllBtn');
    clearAllBtn.addEventListener('click', function() {
    console.log("clear");
    if (confirm('Are you sure you want to clear all to-do list data?')) {
    localStorage.removeItem('todoList')
    renderTodoTable();// Clear the table body
    }
});

      // Toggle the visibility of the to-do list
    var toggleListBtn = document.getElementById('toggle-list-btn');
    toggleListBtn.addEventListener('click', function() {
    var todo = document.getElementById('todoTable');
    if (todo.style.display === 'none') {
      todo.style.display = 'table';
      toggleListBtn.textContent = 'Hide To-Do List';
    } else {
      todo.style.display = 'none';
      toggleListBtn.textContent = 'Show To-Do List';
    }
  });

// Event delegation for view, edit, and delete buttons
document.getElementById('todoTable').addEventListener('click', function(event) {
  var target = event.target;

  if (target.classList.contains('viewBtn')) {
    var row = target.closest('tr');
    var index = Array.from(row.parentNode.children).indexOf(row);
    var todos = localStorage.getItem("todoList"); //todoList
    todos = JSON.parse(todos)
    var todoItem = todos[index];

    var todoItem = todos[index];
    showViewModal(
      todoItem.taskName,
      todoItem.taskDescription,
      todoItem.taskDate,
      todoItem.urgent,
      todoItem.taskCategory,
      todoItem.taskOrder
    );
  } else if (target.classList.contains('editBtn')) {
    var row = target.closest('tr');
    var index = Array.from(row.parentNode.children).indexOf(row);
    showEditModal(index);
  } else if (target.classList.contains('deleteBtn')) {
    var row = target.closest('tr');
    var index = Array.from(row.parentNode.children).indexOf(row);
    handleDeleteAction(index);
  }
});

let selected = null;

function dragOver(e) {
    e.preventDefault();

    const target = e.target.closest('tr');
    if (target && target !== selected) {
        const parent = target.parentNode;
        const nextSibling = target.nextSibling;
        if (nextSibling === selected) {
            parent.insertBefore(selected, target); // Move up
        } else {
            parent.insertBefore(selected, nextSibling); // Move down
        }
    }
}

function dragEnd() {
    selected = null;
}

function dragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', null);
    selected = e.target.closest('tr');
}

// Event to display only the relevant fields
const dropdown = document.getElementById('taskCategory')
const schooldiv = document.getElementById('school')
const grocerydiv = document.getElementById('grocery')
const subjectName = document.getElementById('subjectName')
const groceryList = document.getElementById('groceryList')

dropdown.addEventListener('change', handleDropdownChange);

function handleDropdownChange() {
  const selectedOption = dropdown.value;

  if (selectedOption === 'Education') {
    schooldiv.style.display = 'block';
    grocerydiv.style.display = 'none';
  } else{
    grocerydiv.style.display = 'block';
    schooldiv.style.display = 'none';
  }
}

renderTodoTable()