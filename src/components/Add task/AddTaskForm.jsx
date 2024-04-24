import { useDispatch } from 'react-redux';
import classes from './AddTaskForm.module.css';
import { addTask } from '../../store/taskReducer';

export default function AddTaskForm(){
    const dispatch = useDispatch();

    const handleAddTask = (task) => {
        dispatch(addTask({task: {...task}}))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const dataObj = {}
        data.forEach((value, key) => {
            dataObj[key] = value;
        })
        console.log(dataObj);
        handleAddTask(dataObj);
    }
    return (
        <form className={classes.add_task_form} onSubmit={handleSubmit}>
            <InputContainer id={'title'} label={'Title'} type={'text'}/>
            <InputContainer id={'time'} label={'Time'} type={'time'}/>
            <InputContainer id={'date'} label={'Date'} type={'date'}/>
            <InputContainer id={'priority'} label={'Priority'} type={'range'} max={5} min={0}/>
            <p className={`${classes.input_container} ${classes.textarea_container}`}>
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" cols="30" rows="6"></textarea>
            </p>
            
            <button className={classes.submitButton}>Submit</button>
        </form>
    )
}

const InputContainer = ({className, id, label, type, ...props}) => (
    <p className={className || classes.input_container}>
        <label htmlFor={id}>{label}</label>
        <input type={type || 'text'} name={id} id={id} {...props}/>
    </p>
)