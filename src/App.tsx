import React, { useState } from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import { v1 } from 'uuid';
import { transpileModule } from 'typescript';
import { AddItemForm } from './AddItemForm';

export type FilterValueType = 'all' | 'active' | 'completed';
type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

function removeTask(id: string, todolistId: string) {
    let tasksObj = tasks[todolistId];
    let filteredTasks = tasksObj.filter((t: {id: string; }) => t.id !==id);
    tasks[todolistId] = filteredTasks;

    setTasks({...tasks});
}

function addTask(title: string, todolistId: string) {
    let task = {id: v1(), title: title, isDone: false};
    let tasksObj = tasks[todolistId];
    let newTasks = [task, ...tasksObj];
    tasks[todolistId] = newTasks;
    setTasks({...tasks});
}

function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find(t => t.id === taskId);
    if (task) {
       task.isDone = isDone;
       setTasks({...tasks});
    }  
}

function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find(t => t.id === taskId);
    if (task) {
       task.title = newTitle;
       setTasks({...tasks});
    }  
}

function changeFilter(value: FilterValueType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
        todolist.filter = value;
        setTodolists([...todolists]);
    }
}

function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === id);
    if (todolist) {
        todolist.title =newTitle;
        setTodolists([...todolists]);
    }
}

let todolistId1 = v1();
let todolistId2 = v1();

let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "all"},
    { id: todolistId2, title: "What to buy", filter: "all"}
])

let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist);
    delete tasks[todolistId];
    setTasks({...tasks});
}

let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
        { id: v1(), title: "HTML&CSS", isDone: true},
        { id: v1(), title: "JS", isDone: true},
        { id: v1(), title: "ReactJS", isDone: false},
        { id: v1(), title: "Rest API", isDone: false},
        { id: v1(), title: "GraphQL", isDone: false}
    ],
    [todolistId2]: [
        { id: v1(), title: "Book", isDone: false},
        { id: v1(), title: "Milk", isDone: true}
    ],
    })
function addTodolist(title: string) {
    let todolist: TodolistType = {
        id: v1(),
        filter: 'all',
        title: title,
    }
    setTodolists([todolist, ...todolists]);
    setTasks({...tasks, [todolist.id]: []
    })
}
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
           {
            todolists.map((tl) => {
                let tasksForTodolist = tasks[tl.id];

                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                }

                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                }
                return  <Todolist 
                    key={tl.id}
                    id = {tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist} 
                    removeTask={removeTask} 
                    changeFilter = {changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}/>
            })
           }
           
        </div>
    );
}

export default App;
