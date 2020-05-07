import React, { useState } from 'react';

import './Task.css';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import { Edit, PlayArrow, Pause, Restore, Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      display: 'flex',
      flexWrap: 'wrap',
      width: "12rem",
      [theme.breakpoints.up('sm')]: {
        width: "20rem",
      },
    },
  },
}));

const Task = React.memo(props => {

    console.log('[RENDERING] Task');

    const [editTask, setEditTask] = useState(false);
    const [taskName, setTaskName] = React.useState('');
    const [timeInput, setTimeInput] = React.useState('');

    let play_pause_container = null;
    let edit_container = null;

    let play_icon = <PlayArrow color={props.shouldDisabledButtons ? "disabled" : "inherit"} />;

    const classes = useStyles();

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

    const editTaskState = (value) => {
        setEditTask(value);
        setTimeInput(props.task.estimaded_time);
        setTaskName(props.task.name);
    }

    const saveTaskHandler = () => {
        setEditTask(false);
        const task_updated = {
            id: props.task.id,
            name: taskName,
            time: timeInput
        }
        props.saveTask(task_updated);
    }

    const onlyNumbers = /^[0-9]*$/;

    const handleChange = (event) => {
        setTaskName(event.target.value);
        if (event.target.value.trim().length === 0) {
            setTaskName('');
        }
    };

    const handleTimeInputChange = (event) => {
        if (onlyNumbers.test(event.target.value)) {
            setTimeInput(event.target.value * 60000);
        }
    };
    
    if (props.task.status === 'ACTIVE') {
        play_pause_container = (
            <div onClick={() => props.pauseTask(props.task.id)}>
                {play_icon}
            </div>
        );
        edit_container = (
            <Edit color="disabled"/>
        );
    } else {
        play_pause_container = (
            <div onClick={() => props.startTask(props.task.id)}>
                {play_icon}
            </div>
        )
        edit_container = (
            <div onClick={() => editTaskState(true)}>
                 <Edit color="inherit"/>
            </div>
        );
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

    let taskContainer = (
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
                    {edit_container}
                    {play_pause_container}
                    <Restore
                        onClick={() => props.restartTask(props.task.id)}
                        color={props.shouldDisabledButtons ? "disabled" : "inherit"} />
                    <Delete onClick={() => props.deleteTask(props.task.id)} color="secondary"/>
                </div>
            </div>
        </div>
    );

    if (editTask) {
        taskContainer = (
            <div className="simple-task-container">
                <div className="simple-task-row">
                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <TextField
                                id="Task Edited"
                                value={taskName}
                                onChange={handleChange} />
                        </div>
                    </form>
                    <div className="task-time-remain">
                        <span>{'Tiempo estimado: \xa0\xa0'}</span>
                        <div className="time-task-input">
                            <form autoComplete="off">
                                <Input
                                    id="time-edit"
                                    label="Tiempo"
                                    value={timeInput / 60000}
                                    onChange={handleTimeInputChange}
                                    endAdornment={<InputAdornment position="end">min</InputAdornment>}
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                    'aria-label': 'weight',
                                    }}
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="simple-task-controls">
                <Button
                    style={{marginRight: "16px"}}
                    onClick={saveTaskHandler}
                    variant="outlined"
                    color="secondary">
                        Guardar
                </Button>
                <Button
                    onClick={() => editTaskState(false)}
                    color="secondary">
                        Cancelar
                </Button>
                </div>
            </div>
        );
    }
    
    return (taskContainer);
});

export default Task;
