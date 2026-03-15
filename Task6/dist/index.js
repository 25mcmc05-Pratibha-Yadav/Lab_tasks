var _a, _b, _c, _d;
let list = [];
let index = 0;
const addTask = () => {
    // 1) User Input: done
    // 2) User date input : done
    // 3) checking if it is null: done
    // 4) check whether it is empty or not if empty then alert message and return: done
    //5) create a new task: done
    //6) add the task into list:done
    //7) call renderlist func:done
    //8)empty the task and date input
    const taskInput = document.querySelector("#task");
    const taskDate = document.querySelector("#date");
    if (!taskInput || !taskDate) {
        console.error("Required element is not present");
        return;
    }
    if (taskInput.value.trim().length == 0 || taskDate.value == "") {
        alert("Task and date can not be empty");
        return;
    }
    const task = {
        task: taskInput.value,
        date: new Date(taskDate.value),
        complete: false,
        id: index++,
    };
    list.push(task);
    renderList(list);
    taskInput.value = "";
    taskDate.value = "";
};
const renderList = (tasks) => {
    //1) emptying the ul:done
    //2) using foreach loop for every element of the list
    //3) creating li and also add the class itemList
    //4) check if the task is completed then add class "completed" to the li
    //5) create a span
    //6) add task and date into the span
    //7)create a button and its text content as complete
    //8)addEventListener on complete button and call renderList
    //9) create a remove button
    //10)addEventListener on remove button and call renderList
    //11) appendchild  Span
    //12) appendchild complete
    //13) appendchild remove
    //14) appendchild li inside ul
    const ul = document.querySelector("#list");
    if (!ul) {
        return;
    }
    ul.innerHTML = "";
    tasks.forEach((data) => {
        const li = document.createElement("li");
        li.classList.add("task-item");
        if (data.complete) {
            li.classList.add("completed");
        }
        const span = document.createElement("span");
        span.textContent = `${data.task} - ${data.date.toDateString()}`;
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Completed";
        completeBtn.addEventListener("click", () => {
            data.complete = !data.complete;
            renderList(list);
        });
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            list = list.filter((task) => task.id != data.id);
            renderList(list);
        });
        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(removeBtn);
        ul.appendChild(li);
    });
};
const all = () => {
    renderList(list);
};
const completed = () => {
    const newList = list.filter((task) => task.complete == true);
    renderList(newList);
};
const pending = () => {
    const newList = list.filter((task) => task.complete == false);
    renderList(newList);
};
(_a = document.getElementById("all")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", all);
(_b = document.getElementById("complete")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", completed);
(_c = document.getElementById("pending")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", pending);
(_d = document.getElementById("add")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", addTask);
export {};
//# sourceMappingURL=index.js.map