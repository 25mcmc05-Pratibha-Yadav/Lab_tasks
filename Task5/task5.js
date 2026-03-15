var tasks = [];


function addTask() {
    var taskText = document.getElementById("taskInput").value;
    var taskDate = document.getElementById("dateInput").value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    var task = {
        text: taskText,
        date: taskDate,
        completed: false
    };

    tasks.push(task);

    sortByDate();
    displayTasks(tasks);

    document.getElementById("taskInput").value = "";
    document.getElementById("dateInput").value = "";
}


function displayTasks(taskArray) {
    var list = document.getElementById("taskList");
    list.innerHTML = "";

    for (var i = 0; i < taskArray.length; i++) {
        var li = document.createElement("li");

        li.innerHTML = taskArray[i].text + " (Due: " + taskArray[i].date + ") ";

        if (taskArray[i].completed === true) {
            li.className = "completed";
        }

        
        var completeBtn = document.createElement("button");
        completeBtn.innerHTML = "Done";
        completeBtn.onclick = (function(index) {
            return function() {
                tasks[index].completed = true;
                displayTasks(tasks);
            };
        })(i);

       
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.onclick = (function(index) {
            return function() {
                tasks.splice(index, 1);
                displayTasks(tasks);
            };
        })(i);

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    }
}


function showAll() {
    displayTasks(tasks);
}

function showCompleted() {
    var completedTasks = [];
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].completed === true) {
            completedTasks.push(tasks[i]);
        }
    }
    displayTasks(completedTasks);
}

function showPending() {
    var pendingTasks = [];
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].completed === false) {
            pendingTasks.push(tasks[i]);
        }
    }
    displayTasks(pendingTasks);
}


function sortByDate() {
    tasks.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
    });
}
