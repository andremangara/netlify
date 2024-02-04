// const todoInput = document.getElementById("todo-input");
// const listContainer = document.getElementById("todo-list");

// function addTask() {
//     if (todoInput.value === '') {
//         alert("tulis sesuatu!");
//     } else {
//         let list = document.createElement("li");
//         list.innerHTML = todoInput.value;
//         listContainer.appendChild(list);
//         let span = document.createElement("span");
//         span.innerHTML = "X";
//         listContainer.appendChild(span);
//     }
//     todoInput.value = '';
//     saveList();
// }

// listContainer.addEventListener("click", function (e) {
//     if (e.target.tagName === "LI") {
//         e.target.classList.toggle("checked");
//         saveList();
//     } else if (e.target.tagName === "SPAN") {
//         e.target.parentElement.remove();
//         saveList();
//     }
// }, false);

// function saveList() {
//     localStorage.setItem("data", listContainer.innerHTML);
// }

// function showList() {
//     listContainer.innerHTML = localStorage.getItem("data");
// }

// showList();

/* Metthod for add todo  */
let addTodo = () => {
    let todoText = document.getElementById('todo-input').value;
    if (todoText != '') {
        setData(todoText); // handler for adding item into local storage
        listTodo(); // handler for showing item from local storage
        document.getElementById('todo-input').value = '';
    }
}

/* handler for print todo  */
let listTodo = () => {
    let html = ``;
    let data = getData(); // handler for getting item from local storage
    if (data) {
        html += `<ol>`;
        data.forEach((value, item
        ) => {
            html += `<li>${value} &nbsp;&nbsp;&nbsp;<button id="remove-button" onclick="removeData(${item})">X</button></li>`;
        });
        html += `</ol>`;
    }
    document.getElementById('todo-list').innerHTML = html;
}

/* handler for get todo  */
let getData = (item = null) => {
    /*
    * localStorage.getItem(<itemname>) main method 
    * (predefined method of js) for getting item from localstorage
    */
    let data = JSON.parse(localStorage.getItem('mytodo'));
    if (data) {

        if (item) {
            if (data.indexOf(item) != -1) {
                return data[item];
            } else {
                return false;
            }
        }
        return data;
    }
    return false;
}

listTodo(); // call print handler for showing data into list 

/* handler for set data/item todo  */
let setData = (item) => {
    if (getData(item) != false) {
        alert("Item already added in todo");
    } else {
        let data = getData(); // call getdata handler for getting  data from list 
        data = (data != false) ? data : [];
        data.push(item);
        data = JSON.stringify(data);
        /*
        * localStorage.setItem(<itemname>,<itemvalue>) main method 
        * (predefined method of js) for set item into localstorage
        */
        localStorage.setItem('mytodo', data);
    }
}

/* handler for remove item from localstorage */
let removeData = (itemId) => {
    let data = getData();
    if (data) {
        let newData = data.filter((v, i) => { return i != itemId });
        newData = JSON.stringify(newData);
        localStorage.setItem('mytodo', newData);
        listTodo();
    } else {
        alert("no data found");
    }

}

document.getElementById("todo-list").addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
}, false);