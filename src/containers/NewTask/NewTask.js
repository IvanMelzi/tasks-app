import React, { useEffect } from 'react';

import './NewTask.css';

// Local Components.
import Card from '../../components/Card/Card';

// Global state.
import { useStore } from '../../hooks-store/store';

//Material UI components.
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';

//Material UI styles
const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        display: 'flex',
        flexWrap: 'wrap',
      },
      '& input:valid + fieldset': {
        borderColor: 'green',
        borderWidth: 2,
      },
      '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important',
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    },
}));

const NewTask = React.memo(props => {

    // Material UI styles.
    const classes = useStyles();

    // Global actions.
    const dispatch = useStore(false)[1];

    //Use state edit task name.
    const [taskName, setTaskName] = React.useState('Mi tarea');

    //Use state edit task time.
    const [time, setTime] = React.useState('');

    //Use state edit task time input.
    const [timeInput, setTimeInput] = React.useState('');

    //Use state edit task time input.
    const [disableButton, setdisableButton] = React.useState(true);
    
    // Regex only numbers.
    const onlyNumbers = /^[0-9]*$/;
 
    // Disable button if the data has an error.
    useEffect(() => {
        if (taskName !== '' && time !== '') {
            if (time !== 0) {
                setdisableButton(false);
            } else {
                if (timeInput > 0) {
                    setdisableButton(false);
                } else {
                    setdisableButton(true);
                }
            }
        } else {
            setdisableButton(true);
        }

    }, [time, timeInput, taskName, disableButton]);
     
    // Add task action handler.
    const addTaskHandler = () => {
        const newTask = {
            id: '_' + Math.random().toString(36).substr(2, 7),
            name: taskName,
            estimaded_time: (time === 0 ? timeInput : time),
            remaining_time: (time === 0 ? timeInput : time),
            finished: false,
            status: 'PENDING'
        };
        dispatch('NEW_TASK', newTask);
    };

    // Handle input name change.
    const handleChange = (event) => {
        setTaskName(event.target.value);
        if (event.target.value.trim().length === 0) {
            setTaskName('');
        }
    };

    // Handle time change.
    const handleTimeChange = (event) => {
        setTime(event.target.value * 60000);
    };

    // Handle time input change and acept only numbers.
    const handleTimeInputChange = (event) => {
        if (onlyNumbers.test(event.target.value)) {
            if (event.target.value > 120) {
                alert("El tiempo no puede ser mayor a 120 min (2 horas)");
            } else {
                setTimeInput(event.target.value * 60000);
            }
        }
    };

   
    return (
        <Card style={{ marginBottom: '1rem' }}>
            <div className="task-container">
                <div className="task-form">
                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="Nombre de la tarea"
                                variant="outlined"
                                value={taskName}
                                onChange={handleChange}
                                />
                        </div>
                    </form>
                </div>
                <FormControl className={classes.formControl} style={{marginRight: '30px'}}>
                    <Select
                        value={ (time.length !== 0) ? time / 60000 : '' }
                        onChange={handleTimeChange}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}>
                            <MenuItem value={30}>30 minutos</MenuItem>
                            <MenuItem value={45}>45 minutos</MenuItem>
                            <MenuItem value={60}>1 hora</MenuItem>
                            <MenuItem value={0}>Otro</MenuItem>
                    </Select>
                    <FormHelperText>Tiempo para realizar la tarea</FormHelperText>
                </FormControl>
                {
                    time === 0 ?
                        <div className="time-task-input">
                            <form className={classes.formTimeControl} autoComplete="off">
                                <Input
                                    id="standard-basic"
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
                        </div> : 
                        null
                }
                <div className={classes.root} style={{marginLeft: 'auto', marginTop: '8px'}}>
                    {
                    disableButton ?
                        <Button
                            disabled
                            variant="outlined"
                            color="primary">
                                Añadir
                        </Button>   :
                        <Button
                            onClick={addTaskHandler}
                            variant="outlined"
                            color="primary">
                                Añadir
                        </Button>
                    }
                </div>
            </div>
        </Card>
    );
});

export default NewTask;
