import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";

export type TaskType ={
    title: string,
    isDone: boolean,
    id: string
}
export type FilterValuesType = "all" | "active" | "completed"
function App() {
    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML", isDone: true},
        { id: v1(), title: "CSS", isDone: true},
        { id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "Rest Api", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])

    function removeTask( id: string) {
        let filterTasks = tasks.filter(task => task.id != id)
        setTasks(filterTasks)
    }

    function addTask(newTaskTitle: string){
        let newTask = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    let [filter, setFilter] = useState<FilterValuesType>("all")


    let tasksForTodolist = tasks

    if(filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }

    function changeFilter(value: FilterValuesType){
        setFilter(value)
    }
    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter = {changeFilter}
                      addTask = {addTask}
            />
        </div>
    );
}

export default App;
