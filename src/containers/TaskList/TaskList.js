import React, { useState } from 'react';

import Card from '../../components/Card/Card';
import Task from '../../components/Task/Task';

import { useStore } from '../../hooks-store/store';

const TaskList = React.memo(props => {
    console.log('[RENDERING] TaskList');

    const state = useStore()[0];
    const dispatch = useStore()[1];

    const [tempo, setTempo] = useState(true);

    const removeTaskHandler = (taskId) => {
        dispatch('DELETE_TASK', taskId);
    };

    const startTaskHandler = (taskId) => {
        dispatch('START_TASK', taskId);

        setTempo(setInterval(() => {
            console.log('tiempo corriendo');
            dispatch('SAVE_TIME', taskId);
        }, 1000))
    };

    const pauseTaskHandler = (taskId) => {
        dispatch('PAUSE_TASK', taskId);

        clearInterval(tempo);
    }
    
    const disabled = state.current_task ? true : false;
    let taskSelectedId = null;
    if (state.current_task) {
        taskSelectedId = state.current_task.id;
    }

    return (
        <div>
            {state.tasks.map(task => (
                <Card key={task.id} style={{ marginBottom: '1rem' }}>
                    <Task
                        shouldFinishTask={task.id === taskSelectedId}
                        shouldDisabledButtons={(disabled && task.id !== taskSelectedId)}
                        startTask={startTaskHandler}
                        pauseTask={pauseTaskHandler}
                        deleteTask={removeTaskHandler}
                        task={task} />
                </Card>
            ))}
        </div>

    );
});

export default TaskList;
