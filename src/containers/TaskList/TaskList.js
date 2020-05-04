import React from 'react';

import Card from '../../components/Card/Card';

import { useStore } from '../../hooks-store/store';

const TaskList = props => {
    const state = useStore()[0];
    
    return (
        <div className="tasks-list">
            {state.tasks.map(task => (
                <Card key={task.id} style={{ marginBottom: '1rem' }}>
                    <p>{task.name}</p>
                    <p>{task.status}</p>
                </Card>
            ))}
        </div>

    );
};

export default TaskList;
