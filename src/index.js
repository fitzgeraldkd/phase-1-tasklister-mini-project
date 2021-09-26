document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('create-task-form');
  form.addEventListener('submit', handleAddTask);
});

function handleAddTask(event) {
  event.preventDefault();
  let form = event.target;

  const newTaskRow = document.createElement("tr");

  const newTaskData = [
    {
      inputId: "#new-task-description",
      cellClassName: "description"
    },
    {
      inputId: "#new-task-duedate",
      cellClassName: "due-date"
    },
    {
      inputId: "#new-task-priority",
      cellClassName: "priority",
      defaultInputValue: "Low"
    }
  ];
  newTaskData.forEach(cellData => {
    const dataInputElement = form.querySelector(cellData.inputId);
    const newCell = createTableCell(cellData.cellClassName, dataInputElement.value);
    newTaskRow.appendChild(newCell);
    if (cellData.cellClassName === 'priority') {
      newTaskRow.className = `priority-${dataInputElement.value.toLowerCase()}`;
    }
    dataInputElement.value = cellData.defaultInputValue ? cellData.defaultInputValue : "";
  });

  const newTaskEdit = createTableCell('edit');
  const newTaskEditLink = createEditLink();
  newTaskEdit.append(newTaskEditLink);
  newTaskRow.appendChild(newTaskEdit);

  const newTaskDelete = createTableCell('delete');
  const newTaskDeleteBtn = document.createElement("button");
  newTaskDeleteBtn.textContent = "X";
  newTaskDeleteBtn.addEventListener("click", (event) => {
    // event => button => td => tr
    event.target.parentElement.parentElement.remove();
  });
  newTaskDelete.appendChild(newTaskDeleteBtn);
  newTaskRow.appendChild(newTaskDelete);

  const taskList = document.querySelector("#tasks tbody");
  taskList.appendChild(newTaskRow);
}

function createTableCell(className='', textContent='') {
  let newCell = document.createElement('td');
  newCell.classList.add(className);
  newCell.textContent = textContent;
  return newCell;
}

function sortTasks(sortingProperty) {
  const taskTableBody = document.querySelector('#tasks tbody');
  const taskRowsArray = Array.from(taskTableBody.querySelectorAll('tr'));

  taskRowsArray.sort((first, second) => {
    let sortingCells = [
      first.querySelector(`.${sortingProperty}`),
      second.querySelector(`.${sortingProperty}`)
    ];
    const sortingValues = sortingCells.map((sortingCell) => {
      let sortingValue;
      if (sortingCell.querySelector('input, select') === null) {
        sortingValue = sortingCell.textContent;
      } else {
        sortingValue = sortingCell.firstChild.value;
      }
      if (sortingProperty === 'priority') {sortingValue = priorityOptions()[sortingValue];}
      return sortingValue;
    });

    if (sortingValues[0] < sortingValues[1]) {return -1};
    if (sortingValues[0] > sortingValues[1]) {return 1};
    return 0;
  });

  for (const row of taskRowsArray) {
    taskTableBody.insertBefore(row, null);
  }
}

function handleClickEdit(event) {
  let rowToEdit = event.target.parentElement.parentElement;

  let taskDescriptionCell = rowToEdit.querySelector('.description');
  let taskDescriptionInput = createFormInput('text', taskDescriptionCell.innerText);
  taskDescriptionCell.textContent = '';
  taskDescriptionCell.append(taskDescriptionInput);

  let taskDueDateCell = rowToEdit.querySelector('.due-date');
  let taskDueDateInput = createFormInput('date', taskDueDateCell.innerText);
  taskDueDateCell.textContent = '';
  taskDueDateCell.append(taskDueDateInput);

  let taskPriorityCell = rowToEdit.querySelector('.priority');
  let taskPriorityInput = createPrioritySelector();
  taskPriorityInput.value = taskPriorityCell.innerText;
  taskPriorityCell.innerText = "";
  taskPriorityCell.append(taskPriorityInput);

  let taskEditCell = rowToEdit.querySelector('.edit');
  let taskUpdateLink = createUpdateLink();
  taskEditCell.firstChild.remove();
  taskEditCell.append(taskUpdateLink);
}

function handleClickUpdate(event) {
  let rowToEdit = event.target.parentElement.parentElement;

  const inputCellClasses = ['description', 'due-date', 'priority'];
  for (const cellClass of inputCellClasses) {
    const cellToUpdate = rowToEdit.querySelector(`.${cellClass}`);
    const newValue = cellToUpdate.firstChild.value;
    cellToUpdate.innerText = newValue;

    if (cellClass === 'priority') {
      rowToEdit.className = `priority-${newValue.toLowerCase()}`;
    }
  }

  let taskEditCell = rowToEdit.querySelector('.edit');
  let taskEditLink = createEditLink();
  taskEditCell.firstChild.remove();
  taskEditCell.append(taskEditLink);
}

function createEditLink() {
  let editLink = document.createElement('a');
  editLink.textContent = 'Edit';
  editLink.href = '#';
  editLink.addEventListener('click', handleClickEdit);
  return editLink;
}

function createUpdateLink() {
  let updateLink = document.createElement('a');
  updateLink.textContent = 'Update';
  updateLink.href = '#';
  updateLink.addEventListener('click', handleClickUpdate);
  return updateLink;
}

function createFormInput(inputType, defaultValue) {
  let newInput = document.createElement('input');
  newInput.type = inputType;
  newInput.value = defaultValue;
  return newInput;
}

function createPrioritySelector() {
  let newSelect = document.createElement('select');
  let priorityObj = priorityOptions();
  for (const priority in priorityObj) {
    let newOption = document.createElement('option');
    newOption.value = priority;
    newOption.textContent = priority;
    newSelect.append(newOption);
  }
  return newSelect;
}

function priorityOptions() {
  return {'Low': 3, 'Medium': 2, 'High': 1};
}