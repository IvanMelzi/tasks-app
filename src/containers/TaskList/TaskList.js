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
        clearInterval(tempo);
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

    const restartTaskHandler = (taskId) => {
        dispatch('RESTART_TIME', taskId);
    };

    const finishTaskHandler = (taskId) => {
        clearInterval(tempo);
        dispatch('FINISH_TASK', taskId);
    };

    const saveTaskHandler = (taskUpdated) => {
        dispatch('SAVE_TASK', taskUpdated);
    };
    
    const disabled = state.current_task ? true : false;
    let taskSelectedId = null;
    if (state.current_task) {
        taskSelectedId = state.current_task.id;
    }

    let tasks = <h1>¡Aún no tienes tareas, agrega una para verla!</h1>;

    if (state.tasks) {
        tasks = state.tasks.filter(tasks => tasks.status !== 'FINISHED');
        tasks = (
            <div>
                {tasks.map(task => (
                    <Card key={task.id} style={{ marginBottom: '1rem' }}>
                        <Task
                            shouldFinishTask={task.id === taskSelectedId}
                            shouldDisabledButtons={(disabled && task.id !== taskSelectedId)}
                            restartTask={restartTaskHandler}
                            startTask={startTaskHandler}
                            pauseTask={pauseTaskHandler}
                            deleteTask={removeTaskHandler}
                            finishTask={finishTaskHandler}
                            saveTask={saveTaskHandler}
                            task={task} />
                    </Card>
                ))}
            </div>
        );
    }


    return (tasks);
});

export default TaskList;
