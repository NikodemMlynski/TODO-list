import { NavLink } from "react-router-dom";

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
                <li className="today_button"><NavLink to={'today'}>Today</NavLink></li>
                <li className="upcoming_button"><NavLink to={'upcoming'}>Upcoming</NavLink></li>
                <li className="completed_button"><NavLink to={'completed'}>Completed</NavLink></li>
            </ul>
        </aside>
    )
}