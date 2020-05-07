import React from 'react';
import './History.css';

import Card from '../../components/Card/Card';

import { useStore } from '../../hooks-store/store';

const History = props => {

    console.log('[RENDERING] History');

    const state = useStore()[0];

    const tasks = state.tasks.filter(tasks => tasks.status === 'FINISHED');
    let content = <h1>¡Aún no tienes tareas terminadas!</h1>;
     
    const convertTime = (time) => {
        let timeLeft = {};

        if (time > 0) {
            timeLeft = {
                d: Math.floor(time / (1000 * 60 * 60 * 24)),
                h: Math.floor((time / (1000 * 60 * 60)) % 24),
                m: Math.floor((time / 1000 / 60) % 60),
                s: Math.floor((time / 1000) % 60)
            };
        }

        const timerComponents = [];

        Object.keys(timeLeft).forEach(interval => {
          if (!timeLeft[interval]) {
            return;
          }
          timerComponents.push(
            <span key={timeLeft[interval]+ new Date()}>
              {timeLeft[interval]} {interval}{" "}
            </span>
          );
        });
        return timerComponents;
    }

    if (tasks.length > 0) {
        content = tasks.map(task => (
            <Card key={task.id} style={{ marginBottom: '1rem' }}>
                <div className="history-task-container">
                    <div className="history-task-row">
                        <span>{task.name}</span>
                        <div className="history-time-remain">
                            <span>{'Terminada en: \xa0'}</span>
                            <span>{convertTime(task.estimaded_time - task.remaining_time)}</span>
                        </div>
                    </div>
                    <div className="history-time-finished">
                        <span>{'Fecha de término: \xa0\xa0' + task.finish_date.toLocaleDateString()}</span>
                    </div>
                </div>
            </Card>
        ))
    }
    return (
        <div className="history-tasks-list">      
            <div>
                {content}
            </div>
        </div>

    );
};

export default History;
