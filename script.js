const input = document.getElementById("taskInput")
const addBtn = document.getElementById("addBtn")
const taskList = document.getElementById("taskList")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveTasks(){

localStorage.setItem("tasks", JSON.stringify(tasks))

}

function renderTasks(){

taskList.innerHTML = ""

tasks.forEach((task,index)=>{

const li = document.createElement("li")

li.innerHTML = `
<input type="checkbox" ${task.done ? "checked" : ""}>
<span class="${task.done ? "completed" : ""}">
${task.text}
</span>
<button class="delete">Delete</button>
`

const checkbox = li.querySelector("input")
const deleteBtn = li.querySelector(".delete")

checkbox.addEventListener("change",()=>{

task.done = checkbox.checked

saveTasks()
renderTasks()

})

deleteBtn.addEventListener("click",()=>{

tasks.splice(index,1)

saveTasks()
renderTasks()

})

taskList.appendChild(li)

})

}

function addTask(){

const text = input.value.trim()

if(text === "") return

tasks.push({

text:text,
done:false

})

input.value=""

saveTasks()

renderTasks()

}

addBtn.addEventListener("click",addTask)

input.addEventListener("keypress",(e)=>{

if(e.key === "Enter"){

addTask()

}

})

renderTasks() 