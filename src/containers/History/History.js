import React from 'react';
import './History.css';

import Card from '../../components/Card/Card';

import Button from '@material-ui/core/Button';

import { useStore } from '../../hooks-store/store';

const History = props => {

    const state = useStore()[0];
    const dispatch = useStore()[1];

    let tasks = [];
    if (state.tasks) {
        tasks = state.tasks.filter(tasks => tasks.status === 'FINISHED');
    }
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
            <span key={timeLeft[interval]+ new Date() + Math.random()*1000}>
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
                            <span><strong>{'Terminada en: \xa0'}</strong></span>
                            <span>{convertTime(task.estimaded_time - task.remaining_time)}</span>
                        </div>
                    </div>
                    <div className="history-task-row">
                        <span>{'Fecha de término: \xa0\xa0' + new Date(task.finish_date).toLocaleDateString()}</span>
                        <div className="history-time-remain">
                            <span><strong>{'Tiempo estimado: \xa0'}</strong></span>
                            <span>{convertTime(task.estimaded_time)}</span>
                        </div>
                    </div>
                </div>
            </Card>
        ))
    }

    const addRandomTasks = () => {
        const random_tasks = [];

        for (let i=0; i < 50; i++) {
            const id = '_' + i + Math.random().toString(36).substr(2, 7)
            const date = new Date();
            date.setDate(date.getDate() - ((Math.random() * 5) + 1));

            const estimaded_time = ((Math.random() * 90) + 1) * 60000;
            let remaining_time = estimaded_time * ((Math.random() * (100 - 80 + 1)) + 80) / 100;
            remaining_time = estimaded_time - remaining_time;

            const newTask = {
                id: id,
                name: 'Tarea: ' + id,
                estimaded_time: estimaded_time,
                remaining_time: remaining_time,
                finish_date: date,
                finished: true,
                status: 'FINISHED'
            };
            random_tasks.push(newTask);
        }
        dispatch('RANDOM_TASKS', random_tasks);
    }

    return (
        <div className="history-tasks-list">
            <Button
                style={{marginBottom: '16px'}}
                onClick={addRandomTasks}
                variant="contained"
                color="primary">
                    Agregar 50 tareas
            </Button>
            <div>
                {content}
            </div>
        </div>

    );
};

export default History;
