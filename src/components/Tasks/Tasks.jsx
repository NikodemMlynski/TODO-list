import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import Task from "./Task";
import classes from './Tasks.module.css';

export default function Tasks(){
    const {taskType, taskName} = useParams();
    const tasks = useSelector(state => state.tasks.value);
    const [displayedTasks, setDisplayedTasks] = useState([]);
    console.log(tasks);
    
    const sortTasksByPriority = (array) => array.slice().sort((a, b) => b.priority - a.priority); 

    useEffect(() => {
        switch(taskType){
            case 'today':
                setDisplayedTasks(filterTasks(findTodayTasks([...sortTasksByPriority(tasks)])) );
                break;
            case 'upcoming':
                setDisplayedTasks(filterTasks(findUpcomingTasks([...sortTasksByPriority(tasks)])));
                break;
            case 'completed':
                setDisplayedTasks(filterTasks(findCompletedTasks([...sortTasksByPriority(tasks)])));
                break;
        }
    }, [taskType, tasks, taskName])

    const findCompletedTasks = (tasks) => {
        const completedTasks = tasks.filter(task => task.completed === true);
        return completedTasks;
    }
    const findUpcomingTasks = (tasks) => {
        const today = new Date();
        const fiveDaysFromNow = new Date();
        fiveDaysFromNow.setDate(today.getDate() + 5); // Ustawiamy datę na 5 dni od dzisiaj
    
        const upcomingTasks = tasks.filter(task => {
            const taskDate = new Date(task.date); // Załóżmy, że pole 'date' w zadaniu reprezentuje datę zadania
            // Sprawdzamy, czy zadanie jest późniejsze niż dzisiaj i przed 5 dni
            return taskDate > today && taskDate <= fiveDaysFromNow;
        });
    
        return upcomingTasks;
    };
    

    const findTodayTasks = (tasks) => {
        const todayTasks = tasks.filter(task => {
            const taskDate = new Date(task.date);
            const today = new Date()
            if(taskDate.getDate() === today.getDate() && taskDate.getMonth() === today.getMonth() && taskDate.getFullYear() === today.getFullYear()) return task;
        })
        return todayTasks;
    }  

    const filterTasks = (tasks) => {
        if(!taskName) return tasks;
        const filteredArr = tasks.filter(task => task.title.toLowerCase().includes(taskName.toLowerCase()));
        console.log(filteredArr);
        return filteredArr;
    }
    

    return (
        <>
            <ul className={classes.list}>
                {displayedTasks.length === 0 && taskType === 'today' && <h3>There is no task here</h3>}
                {displayedTasks.length === 0 && taskType === 'completed' && <h3>There is no completed task here</h3>}
                {displayedTasks.length === 0 && taskType === 'upcoming' && <h3>There is no upcoming task here</h3>}
            {displayedTasks.map(task => (
                <Task key={task.id} {...task}/>
            ))}
        </ul>
        </>
    )
}