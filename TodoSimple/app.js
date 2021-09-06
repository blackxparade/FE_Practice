let dragged;

function addTodo() {
    let todo = document.createElement("div");
    todo.classList.add("todo");
    todo.setAttribute("draggable", "true");

    let todoLeft = document.createElement("div");
    todoLeft.classList.add("todo-left");

    let cb = document.createElement("input");
    cb.setAttribute("type", "checkbox");
    cb.onclick = () => {strikeTodo(cb);};
    let todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    todoText.textContent = document.querySelector(".new-todo-input").value;
    document.querySelector(".new-todo-input").value = "";
    todoLeft.appendChild(cb);
    todoLeft.appendChild(todoText);

    let remove = document.createElement("button");
    remove.classList.add("remove-todo");
    remove.onclick = () => {removeTodo(remove);};

    let icon = document.createElement("i");
    icon.classList.add("fas");
    icon.classList.add("fa-minus-circle");
    remove.appendChild(icon);

    todo.appendChild(todoLeft);
    todo.appendChild(remove);

    document.querySelector(".todo-list").prepend(todo);
    document.querySelector(".todo-list").style.borderTop = "1px solid lightgray";
    document.querySelector(".add-todo").style.color = "slategray";
}

function removeTodo(e) {
    e.parentElement.classList.add("deleting");
    e.addEventListener("transitionend", () => {
        console.log(e.parentElement);
        e.parentElement.remove();
      });
    
    if (document.getElementsByClassName("todo").length <= 1) {
        console.log('asd');
        document.querySelector(".todo-list").style.borderTop = "0px";
    }
}

function strikeTodo(e) {
    let todoText = e.nextElementSibling;
    let todo = e.parentElement.parentElement;

    if (e.checked) {
        todoText.style.textDecoration = "line-through";
        todo.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
        todo.style.boxShadow = "none";
        document.querySelector(".todo-list").appendChild(todo);
    } else {
        todoText.style.textDecoration = "";
        todo.style.backgroundColor = "white";
        todo.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.15)";
        document.querySelector(".todo-list").prepend(todo);
    }
}

window.onload=function(){
    let todoInput = document.querySelector(".new-todo-input");
    todoInput.addEventListener("keypress", function (e) {
        if (e.key === 'Enter' && todoInput.value !== "") {
          addTodo();
        }
    });

    todoInput.addEventListener("input", (e) => {
        if (e.target.value !== "") {
            document.querySelector(".add-todo").style.color = "black";
        } else {
            document.querySelector(".add-todo").style.color = "slategray";
        }
    });

    document.addEventListener("drag", function(event) {

    }, false);

    document.addEventListener("dragstart", function(event) {
        dragged = event.target;
        event.target.style.opacity = .3;
    });
      
    document.addEventListener("dragend", function(event) {
        event.target.style.opacity = "";
    });

    document.addEventListener("dragover", function(event) {
        event.preventDefault();
      }, false);

    document.addEventListener("dragenter", function(event) {
        if (event.target.className === "todo") {
            event.target.style.background = "lightgray";
        }
    });

    document.addEventListener("dragleave", function(event) {
        if (event.target.className === "todo") {
            event.target.style.background = "";
        }
    });

    document.addEventListener("drop", function(event) {
        event.preventDefault();
        
        let todos = event.target.parentElement.childNodes;
        let draggedIndex = 0;
        let targetIndex = 0;
        for (let i=0; i<todos.length; i++) {
            if (todos[i] === dragged) {
                draggedIndex = i;
            }

            if (todos[i] === event.target) {
                targetIndex = i;
            }
        }

        if (event.target.className === "todo" && draggedIndex > targetIndex) {
            event.target.style.background = "";
            event.target.insertAdjacentElement("beforebegin", dragged);
        }

        if (event.target.className === "todo" && draggedIndex < targetIndex) {
            event.target.style.background = "";
            event.target.insertAdjacentElement("afterend", dragged);
        }
    });
  }