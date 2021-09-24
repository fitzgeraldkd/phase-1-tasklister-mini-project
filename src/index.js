document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('create-task-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskDescriptionElement = event.target.querySelector("#new-task-description");

    const newTaskDiv = document.createElement("div");

    const newTaskDeleteBtn = document.createElement("button");
    newTaskDeleteBtn.textContent = "X";
    newTaskDeleteBtn.addEventListener("click", (event) => {
      event.target.parentElement.remove();
    });

    newTaskDiv.appendChild(newTaskDeleteBtn);

    const newTaskDescription = document.createElement("span");
    newTaskDescription.textContent = taskDescriptionElement.value;
    newTaskDiv.appendChild(newTaskDescription);

    const taskList = document.querySelector("#tasks");
    taskList.appendChild(newTaskDiv);

    taskDescriptionElement.value = "";
  });
});

