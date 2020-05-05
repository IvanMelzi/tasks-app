import React from 'react';

import { useStore } from '../../hooks-store/store';
import './Task.css';

import Button from '@material-ui/core/Button';

import { Edit, PlayArrow, Pause, Restore, Delete } from '@material-ui/icons';

const Task = props => {

    console.log('[RENDERING] Task');
    console.log(props);

    let play_icon = <PlayArrow color={props.shouldDisabledButtons ? "disabled" : "inherit"} />;

    if (props.task.status === 'ACTIVE') {
        play_icon = <Pause />;
    }

    let button_component = (
        <Button variant="contained" color={props.shouldFinishTask ? "secondary" : "primary"}>
            {props.shouldFinishTask ? "Terminar Tarea" : "Empezar Tarea"}
        </Button>
    );

    if (props.shouldDisabledButtons) {
        button_component = (
            <Button variant="contained" disabled>
                Empezar tarea
            </Button>
        )
    }
    
    return (
        <div className="simple-task-container">
            <div className="simple-task-row">
                <span>{props.task.name}</span>
                <div className="task-time-remain">
                    <span>{'Tiempo estimado: \xa0\xa0'}</span>
                    <span>{ `${props.task.estimaded_time} min`}</span>
                </div>
            </div>
            <div className="simple-task-controls">
                {button_component}
                <div className="task-time-controls">
                    <Edit />
                    <div onClick={() => props.startTask(props.task.id)}>
                        {play_icon}
                    </div>
                    <Restore
                        color={props.shouldDisabledButtons ? "disabled" : "inherit"} />
                    <Delete onClick={() => props.deleteTask(props.task.id)} color="secondary"/>
                </div>
            </div>
        </div>
    );
};

export default Task;
/* 

<Delete
onClick={() => props.deleteTask(props.task.id)}
color={ props.shouldDisabledButtons ? "disabled" : "secondary" }/>

*/