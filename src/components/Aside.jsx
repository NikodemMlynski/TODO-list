import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import classes from './Aside.module.css';

export default function Aside() {
    return (
        <aside className="aside">
            <header className="aside_header">
                <img src="src/images/profile.png" alt="user profile"/>
                <h3>Nikodem</h3>
            </header>
            <div className="add_button_container">
                <button><NavLink to={'/'} style={{padding: '0'}}>Add task</NavLink></button>
            </div>
            <ul className="task_list">
                <li className="today_button"><NavLink to={'today'}>Today</NavLink> <SearchInput name={'today'}/></li>
                <li className="upcoming_button"><NavLink to={'upcoming'}>Upcoming</NavLink> <SearchInput name={'upcoming'}/></li>
                <li className="completed_button"><NavLink to={'completed'}>Completed</NavLink> <SearchInput name={'completed'}/></li>
            </ul>
        </aside>
    )
}

const SearchInput = ({ name }) => {
    const {taskType} = useParams();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    useEffect(() => {
        let timerId;
        if(query.trim() !== ''){
            timerId = setTimeout(() => {
                navigate(`${taskType}/${encodeURIComponent(query)}`)
            }, 1000);
        }
        return () => clearTimeout(timerId);
    }, [query]);

    return (
        <div className={classes.div} style={{display: name === taskType ? 'block' : 'none'}}>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={'Search task'}/>
        </div>
    )
}