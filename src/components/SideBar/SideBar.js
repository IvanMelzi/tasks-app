import React from 'react';
import { NavLink } from 'react-router-dom';

import './SideBar.css';

//Icons Imports
import tasksIcon from '../../assets/icons/tasks.svg';
import historyIcon from '../../assets/icons/history.svg';
import performanceIcon from '../../assets/icons/performance.svg';

/**
 * Side Bar with router links.
 *
 */
const SideBar = props => {
    return (
        <div className="main-side">
            <span><NavLink to="/" exact>Tareas</NavLink></span>
            <span className="icon">
                <NavLink to="/" exact>
                    <img src={tasksIcon} alt="tasks" />
                </NavLink>
            </span>

            <span><NavLink to="/history">Historial</NavLink></span>
            <span className="icon">
                <NavLink to="/history">
                    <img src={historyIcon} alt="history" />
                </NavLink>
            </span>

            <span><NavLink to="/performance">Desempeño</NavLink></span>
            <span className="icon">
                <NavLink to="/performance">
                    <img src={performanceIcon} alt="performance" />
                </NavLink>
            </span>        
        </div>
    );
}

export default SideBar;
