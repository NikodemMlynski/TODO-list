import classes from './Task.module.css';

import completeIcon from './../../images/complete.png';
import deleteIcon from './../../images/delete.png';
import editIcon from './../../images/edit.png';
import uncomplete from './../../images/uncomplete.png';
import { useDispatch } from 'react-redux';
import {completeTask, deleteTask} from './../../store/taskReducer';
import { useNavigate } from 'react-router-dom';

export default function Task({id, title, time, date, priority, description, completed }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const completeTaskFn = (id) => {
        dispatch(completeTask({id}))
    }
    const deleteTaskFn = (id) => {
        alert(id)
        dispatch(deleteTask({id}))
    }
    return (
        
        <li className={classes.li} key={id}>
            <article className={classes.article}>
                <header className={classes.header}>
                    <h3>{title}</h3>
                    <span>{time}</span>
                    <span>{date}</span>
                </header>
                <section className={classes.section}>
                    <p className={classes.description}>{description}</p>
                    <b>{priority}</b>
                    <button  onClick={() => completeTaskFn(id)}>{completed ? <img src={uncomplete} alt="" /> : <img src={completeIcon} alt="" /> }</button>
                    <section className={classes.actionButtons}>
                        <button onClick={() => navigate(`/edit/${id}`)}><img src={editIcon} alt="complete" /></button>
                        <button><img src={deleteIcon} onClick={() => deleteTaskFn(id)} alt="delete"  /></button>
                    </section>
                </section>
            </article>
        </li>
    )
}
// style={{width: '37px', height: '37px', padding: 0, marginTop: '-4px'}}