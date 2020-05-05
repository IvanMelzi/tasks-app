import React from 'react';

import { useStore } from '../../hooks-store/store';
import './Task.css';

import Button from '@material-ui/core/Button';

import { Edit, PlayArrow, Pause, Restore, Delete } from '@material-ui/icons';

const Task = React.memo(props => {

    console.log('[RENDERING]  Task');
    const dispatch = useStore(false)[1];

    const removeTaskHandler = (taskId) => {
        dispatch('DELETE_TASK', taskId);
    };

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
                <Button variant="contained" color="secondary">
                    Terminar tarea
                </Button>
                <div className="task-time-controls">
                    <Edit />
                    <PlayArrow />
                    <Pause />
                    <Restore />
                    <Delete onClick={() => removeTaskHandler(props.task.id)} color="secondary"/>
                </div>
            </div>
        </div>
    );
});

export default Task;

/* id: 'p1',
name: 'Red Scarf',
estimaded_time: 'A pretty red scarf.',
remaining_time: false,
finished: false,
status: 'PENDING' */