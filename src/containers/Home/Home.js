import React, { useState } from 'react';
import './Home.css';
import NewTask from '../NewTask/NewTask'
import TaskList from '../TaskList/TaskList';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Chip from '@material-ui/core/Chip';
import FilterListIcon from '@material-ui/icons/FilterList';

const Home = props => {

  const [filter, setFilter] = useState(false);
  const [value, setValue] = React.useState();

  let formRadio = null;

  const handleClick = () => {
    setFilter(!filter);
    if (filter) {
      setValue(null);
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  if (filter) {
    formRadio = (
      <FormControl component="fieldset">
        <RadioGroup row onChange={handleChange}>
          <FormControlLabel
            style={{marginRight: "24px"}}
            value="1"
            control={<Radio color="primary" />}
            label="< 30m" />
          <FormControlLabel
            style={{marginRight: "24px"}}
            value="30"
            control={<Radio color="primary" />}
            label="30m - 1h" />
          <FormControlLabel
            style={{marginRight: "-24px"}}
            value="60"
            control={<Radio color="primary" />}
            label="> 1h" />
        </RadioGroup>
      </FormControl>
    );
  }


  return (
    <div className="all-tasks-list">      
        <NewTask
            key="newTask"
            title="Titulo"
            description="desc"
        />
        <div className="home-filter">
          <Chip
            size="medium"
            icon={<FilterListIcon />}
            label="Filtar"
            onClick={handleClick} />
            <div className="home-radio-group">
              {formRadio}
            </div>
        </div>
        <TaskList filter={value}></TaskList>
    </div>

  );
};

export default Home;
