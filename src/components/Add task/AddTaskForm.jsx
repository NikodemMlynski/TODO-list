import { useDispatch, useSelector } from 'react-redux';
import classes from './AddTaskForm.module.css';
import { addTask, updateTask } from '../../store/taskReducer';
import { useParams } from 'react-router-dom';

export default function AddTaskForm(){
    const dispatch = useDispatch();
    const {taskId} = useParams();
    const tasks = useSelector(state => state.tasks.value);
    const task = tasks.find(task => task.id == taskId);
    console.log(tasks);
    console.log(task);

    const handleAddTask = (task) => {
        dispatch(addTask({task: {...task}}));
    }

    const handleEditTask = (task) => {
        dispatch(updateTask({task: {...task}}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const dataObj = {}
        data.forEach((value, key) => {
            dataObj[key] = value;
        })
        console.log(dataObj);
        if(taskId){
            handleEditTask({...dataObj, id: taskId, completed: task ? task.completed : false});
            return;
        }
        handleAddTask(dataObj);
    }
    return (
        <form className={classes.add_task_form} onSubmit={handleSubmit}>
            <InputContainer id={'title'} label={'Title'} type={'text'} task={task} />
            <InputContainer id={'time'} label={'Time'} type={'time'} task={task}/>
            <InputContainer id={'date'} label={'Date'} type={'date'} task={task}/>
            <InputContainer id={'priority'} label={'Priority'} type={'range'} max={5} min={0} task={task}/>
            <p className={`${classes.input_container} ${classes.textarea_container}`}>
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" cols="30" rows="6"></textarea>
            </p>
            
            <button className={classes.submitButton}>Submit</button>
        </form>
    )
}

const InputContainer = ({task, className, id, label, type, ...props}) => (
    <p className={className || classes.input_container}>
        <label htmlFor={id}>{label}</label>
        <input type={type || 'text'} name={id} id={id} {...props} defaultValue={task ? task[id] : ''}/>
    </p>
)