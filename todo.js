

let $ = function (id) {
    return document.getElementById(id);
}


const storageName = 'todo_list';

let storage = {
    lsName: storageName,
    save: function (data) {
        localStorage.setItem(this.lsName, JSON.stringify(data))
    },
    read: function () {
        let data = localStorage.getItem(this.lsName);
        return JSON.parse(data);
    }
}

let todo_list = storage.read() || [];
// add to do list function

function addToDo(todo, task_day) {
    if (todo_list.length !== "") {
        //storage.save(todo_list);
        let check = true;
        for (let i in todo_list) {
            if (todo_list[i].todo === todo) {
                alert("ton tai");
                check = false
                break;
            }
        }
        if (check == true) {
            var todoMain = {
                todo: todo,
                task_day: task_day
            }
            todo_list.push(todoMain);
            storage.save(todo_list);
        }
    } else {
        todo_list.push(todoMain);
        storage.save(todo_list);
    }
    showList();
}

let showList = function () {
    html = "<tr> <th>To do</th> <th>Day</th> <th>Action</th> </tr>"
    let countTodo = 0;
    let sumDay = 0;
    for (let i in todo_list) {
        html = html +
            "<tr><td>" + todo_list[i].todo + "</td>" +
            "<td>" + todo_list[i].task_day + "</td>" +
            "<td><button id = 'delete' onclick = 'removeTodo(" + i + ")'> delete </button> </td> </tr>"
        countTodo = countTodo + 1;
        sumDay += Number(todo_list[i].task_day);
    }
    $("list").innerHTML = html;
    $("notification").innerHTML = `* You have ${countTodo} tasks and ${sumDay} days to complete`;
}

const removeTodo = (index) => {
    todo_list.splice(index, 1);
    showList(todo_list);
    storage.save(todo_list);
    showList();
};


window.onload = function () {
    $("btn-add-todo").onclick = function () {
        if (($("inputItem").value != "") && ($("task-day").value != "")) {
            addToDo(($("inputItem").value), ($("task-day").value));
            $("inputItem").value = "";
            $("task-day").value = "";
        } else {
            alert("Insert a item");
        }
    }
    showList();
}


