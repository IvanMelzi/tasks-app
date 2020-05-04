import React from 'react';

import Card from '../../components/Card/Card';
import './NewTask.css';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

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
        margin: '8px',
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    },
}));

const onlyNumbers = /^[0-9]*$/;

const NewTask = props => {
    const classes = useStyles();

    const [taskName, setTaskName] = React.useState('Mi tarea');
    const [time, setTime] = React.useState('');
    const [timeInput, setTimeInput] = React.useState('');

    const timeInputForm = null;

    const handleChange = (event) => {
        setTaskName(event.target.value);
        if (event.target.value.trim().length === 0) {
            setTaskName('');
        }
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handleTimeInputChange = (event) => {
        if (onlyNumbers.test(event.target.value)) {
            setTimeInput(event.target.value);
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
                        value={time}
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
                                    value={timeInput}
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
                    <Button variant="outlined" color="primary">
                        Añadir
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default NewTask;
