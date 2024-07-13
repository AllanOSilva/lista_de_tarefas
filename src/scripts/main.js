document.addEventListener('contextmenu', function(event){
    event.preventDefault();
    alert('O clique com o botão direito do mouse está desabilitado nesta página.');
})

let userInput = document.querySelector(".container .add-task-box input");
let addBtn = document.querySelector(".container .add-task-box .add-btn");
let allTasksBox = document.querySelector(".container .all-tasks")
let no_of_tasks_txt = document.querySelector(".container .others .no-of-tasks");
let limpaLista = document.querySelector(".container .others .clear-all-btn");
let outrasCaixas = document.querySelector(".container .others");

//armazenando localmente as tarefas 
let todos = JSON.parse(localStorage.getItem("all-todos") || "[]");

addBtn.addEventListener("click",()=>{
    if (userInput.value != ""){
        createTodo(userInput.value);
    }
    else{
        alert("Input de tarefas vazio!")
    }
})

let createTodo = (userTask)=>{
    let taskInfo ={
        tasks: userTask, status: "pendente"
    };
    todos.push(taskInfo); //colocando as tarefas no array
    localStorage.setItem("all-todos",JSON.stringify(todos));
    userInput.value = "";
    showTasks();
    contadorDeTarefas();
}

let showTasks =()=>{
    let li = "";
    todos.forEach((todo, id) => {
        let isCompleted = todo.status =="completo" ?"checked" : "";
        li += `<div class="task">
                <input type="checkbox" name = "" id="${id}" onclick="!taskComplete(this)" ${isCompleted}>
                <span class="userTask ${isCompleted}>">${todo.tasks}</span>
                <div class="btns">
                    <button class="dlt-btn" onclick="deleteTask(${id})"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>`;
    })
    allTasksBox.innerHTML =li || 
    `<p class="clipboard-icon"><i class="fa-solid fa-clipboard"></i></p>
    <p class="no-task-message">Sem tarefas ainda</p>`
    ;
    contadorDeTarefas();
    if (todos.length == 0){
        outrasCaixas.style.display = "none";
    }else{
        outrasCaixas.style.display = "block";
    }
}

let taskComplete = (elem) =>{
    if (elem.checked){
        elem.nextElementSibling.classList.add("checked")
        //atualizando o status da tarefa(task) para "completo"
        todos[elem.id].status="completo"
    } else{
        elem.nextElementSibling.classList.remove("checked");
        todos[elem.id].status="pendente"
    }
    localStorage.setItem("all-todos",JSON.stringify(todos));

}

let deleteTask =(deleteId)=>{
    //removend tarefa selecionada
    todos.splice(deleteId,1);
    localStorage.setItem("all-todos",JSON.stringify(todos));
    showTasks();
}

let contadorDeTarefas =()=>{
    let no_of_tasks = todos.length;
    no_of_tasks_txt.innerHTML = `Você tem <strong>${no_of_tasks}</strong> tarefas`;
}

limpaLista.addEventListener("click",()=>{
    todos =[];
    localStorage.setItem("all-todos",JSON.stringify(todos));
    showTasks();
});
showTasks();