document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('create-task-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newTaskRow = document.createElement("tr");

    const taskDescriptionElement = event.target.querySelector("#new-task-description");
    const newTaskDescription = createTableCell('description', taskDescriptionElement.value);
    newTaskRow.appendChild(newTaskDescription);

    const taskDueDateElement = event.target.querySelector("#new-task-duedate");
    const newTaskDueDate = createTableCell('due-date', taskDueDateElement.value);
    newTaskRow.appendChild(newTaskDueDate);

    const taskPriorityElement = event.target.querySelector("#new-task-priority");
    const newTaskPriority = createTableCell('priority', taskPriorityElement.value);
    newTaskRow.appendChild(newTaskPriority);

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

    taskDescriptionElement.value = "";
    taskDueDateElement.value = "";
    taskPriorityElement.value = "Low";
  });
});

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
    let firstProperty = first.querySelector(`.${sortingProperty}`).textContent;
    let secondProperty = second.querySelector(`.${sortingProperty}`).textContent;

    if (sortingProperty === 'priority') {
      const priorityObj = {'Low': 3, 'Medium': 2, 'High': 1};
      firstProperty = priorityObj[firstProperty];
      secondProperty = priorityObj[secondProperty];
    }

    if (firstProperty < secondProperty) {return -1};
    if (firstProperty > secondProperty) {return 1};
    return 0;
  });

  for (const row of taskRowsArray) {
    taskTableBody.insertBefore(row, null);
  }
}

function handleClickEdit(event) {

}