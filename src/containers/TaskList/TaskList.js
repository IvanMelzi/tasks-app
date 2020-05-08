import React, { useState } from 'react';

// Local Components.
import Card from '../../components/Card/Card';
import Task from '../../components/Task/Task';

// Global state.
import { useStore } from '../../hooks-store/store';

const TaskList = React.memo(props => {

    // Global State and actions.
    const state = useStore()[0];
    const dispatch = useStore()[1];

    // Use state set time interval.
    const [tempo, setTempo] = useState(true);

    // Dispatch remove task.
    const removeTaskHandler = (taskId) => {
        clearInterval(tempo);
        dispatch('DELETE_TASK', taskId);
    };

    // Dispatch start task.
    const startTaskHandler = (taskId) => {
        dispatch('START_TASK', taskId);

        setTempo(setInterval(() => {
            dispatch('SAVE_TIME', taskId);
        }, 1000))
    };

    // Dispatch pause task.
    const pauseTaskHandler = (taskId) => {
        dispatch('PAUSE_TASK', taskId);
        clearInterval(tempo);
    }

    // Dispatch restart time task.
    const restartTaskHandler = (taskId) => {
        dispatch('RESTART_TIME', taskId);
    };

    // Dispatch finish task.
    const finishTaskHandler = (taskId) => {
        clearInterval(tempo);
        dispatch('FINISH_TASK', taskId);
    };

    // Dispatch save edit task.
    const saveTaskHandler = (taskUpdated) => {
        dispatch('SAVE_TASK', taskUpdated);
    };
    
    // Disable no active tasks.
    const disabled = state.current_task ? true : false;
    let taskSelectedId = null;
    if (state.current_task) {
        taskSelectedId = state.current_task.id;
    }

    // Empty state.
    let tasks = <h1>¡Aún no tienes tareas, agrega una para verla!</h1>;

    // Set filter tasks.
    if (state.tasks) {
        console.log(props.filter);
        tasks = state.tasks.filter(tasks => tasks.status !== 'FINISHED');

        if (props.filter) {
            if (props.filter === '60') {
                tasks = state.tasks.filter(tasks => tasks.estimaded_time > (1000*60*60));
            } else if (props.filter === '30') {
                tasks = state.tasks.filter(tasks => (
                    tasks.estimaded_time <= (1000*60*60) && tasks.estimaded_time > (1000*60*30)
                ));
            } else if (props.filter === '1') {
                tasks = state.tasks.filter(tasks => tasks.estimaded_time <= (1000*60*30)); 
            }
        }
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
