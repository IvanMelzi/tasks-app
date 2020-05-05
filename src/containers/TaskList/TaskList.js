import React from 'react';

import Card from '../../components/Card/Card';
import Task from '../../components/Task/Task';

import { useStore } from '../../hooks-store/store';

const TaskList = props => {

    const state = useStore()[0];
    const dispatch = useStore(false)[1];

    const removeTaskHandler = (taskId) => {
        dispatch('DELETE_TASK', taskId);
    };

    const startTaskHandler = (taskId) => {
        dispatch('START_TASK', taskId);
    };

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
                        deleteTask={removeTaskHandler}
                        task={task} />
                </Card>
            ))}
        </div>

    );
};

export default TaskList;
