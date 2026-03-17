const input = document.getElementById("taskInput")
const dateInput = document.getElementById("dateInput")
const addBtn = document.getElementById("addBtn")
const taskList = document.getElementById("taskList")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks))
}

function getStatus(date){
if(!date) return ""

const today = new Date().toISOString().split("T")[0]

if(date < today){
return "overdue"
}else if(date === today){
return "today"
}
return ""
}

function renderTasks(){

taskList.innerHTML = ""

tasks.forEach((task,index)=>{

const li = document.createElement("li")

const statusClass = getStatus(task.date)

li.innerHTML = `
<input type="checkbox" ${task.done ? "checked" : ""}>

<div>
<span class="${task.done ? "completed" : ""}">
${task.text}
</span>
<span class="date ${statusClass}">
${task.date ? task.date : ""}
${statusClass === "overdue" ? " (Lewat deadline!)" : ""}
${statusClass === "today" ? " (Hari ini!)" : ""}
</span>
</div>

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
const date = dateInput.value

if(text === "") return

tasks.push({
text:text,
date:date,
done:false
})

input.value=""
dateInput.value=""

saveTasks()
renderTasks()

}

addBtn.addEventListener("click",addTask)

/* 🔥 FIX ENTER */
document.addEventListener("keydown",(e)=>{
if(e.key === "Enter"){
const active = document.activeElement

if(active.id === "taskInput" || active.id === "dateInput"){
addTask()
}
}
})

renderTasks()