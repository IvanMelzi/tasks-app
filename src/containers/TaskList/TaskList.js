import React from 'react';

import Card from '../../components/Card/Card';
import Task from '../../components/Task/Task';

import { useStore } from '../../hooks-store/store';

const TaskList = props => {
    const state = useStore()[0];
    
    return (
        <div className="tasks-list">
            {state.tasks.map(task => (
                <Card key={task.id} style={{ marginBottom: '1rem' }}>
                    <Task task={task}></Task>
                </Card>
            ))}
        </div>

    );
};

export default TaskList;
