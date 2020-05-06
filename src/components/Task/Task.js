import React from 'react';

import './Task.css';

import Button from '@material-ui/core/Button';

import { Edit, PlayArrow, Pause, Restore, Delete } from '@material-ui/icons';

const Task = React.memo(props => {

    console.log('[RENDERING] Task');

    let play_icon = <PlayArrow color={props.shouldDisabledButtons ? "disabled" : "inherit"} />;

    if (props.task.status === 'ACTIVE') {
        play_icon = <Pause />;
    }

    let button_component = (
        <Button
            onClick={() => props.startTask(props.task.id)}
            variant="contained"
            color="primary">
                Empezar Tarea
        </Button>
    );

    if (props.shouldDisabledButtons) {
        button_component = (
            <Button
                onClick={() => props.startTask(props.task.id)}
                variant="contained"
                disabled>
                    Empezar tarea
            </Button>
        )
    }

    if (props.shouldFinishTask) {
        button_component = (
            <Button
                onClick={() => props.finishTask(props.task.id)}
                variant="contained"
                color="secondary">
                    Terminar Tarea
            </Button>
        )
    }

    let play_pause_container = null;
    if (props.task.status === 'ACTIVE') {
        play_pause_container = (
            <div onClick={() => props.pauseTask(props.task.id)}>
                {play_icon}
            </div>
        )
    } else {
        play_pause_container = (
            <div onClick={() => props.startTask(props.task.id)}>
                {play_icon}
            </div>
        )
    }

    const convertTime = (time) => {
        let timeLeft = {};

        if (time > 0) {
            timeLeft = {
                d: Math.floor(time / (1000 * 60 * 60 * 24)),
                h: Math.floor((time / (1000 * 60 * 60)) % 24),
                m: Math.floor((time / 1000 / 60) % 60),
                s: Math.floor((time / 1000) % 60)
            };
        } else {
            props.finishTask(props.task.id)
        }

        const timerComponents = [];

        Object.keys(timeLeft).forEach(interval => {
          if (!timeLeft[interval]) {
            return;
          }
          timerComponents.push(
            <span key={timeLeft[interval]+props.task.id}>
              {timeLeft[interval]} {interval}{" "}
            </span>
          );
        });
        return timerComponents;
    }
    
    return (
        <div className="simple-task-container">
            <div className="simple-task-row">
                <span>{props.task.name}</span>
                <div className="task-time-remain">
                    <span>{'Tiempo estimado: \xa0\xa0'}</span>
                    <span>{convertTime(props.task.remaining_time)}</span>
                </div>
            </div>
            <div className="simple-task-controls">
                {button_component}
                <div className="task-time-controls">
                    <Edit />
                    {play_pause_container}
                    <Restore
                        onClick={() => props.restartTask(props.task.id)}
                        color={props.shouldDisabledButtons ? "disabled" : "inherit"} />
                    <Delete onClick={() => props.deleteTask(props.task.id)} color="secondary"/>
                </div>
            </div>
        </div>
    );
});

export default Task;
