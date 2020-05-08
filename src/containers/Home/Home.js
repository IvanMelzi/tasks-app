import React, { useState } from 'react';
import './Home.css';

// Local Components
import NewTask from '../NewTask/NewTask'
import TaskList from '../TaskList/TaskList';

// Material UI components
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import FilterListIcon from '@material-ui/icons/FilterList';

const Home = props => {

  //Use state show filter boolean.
  const [filter, setFilter] = useState(false);

  //Use state set radio button.
  const [value, setValue] = React.useState();

  // Form Radio container.
  let formRadio = null;

  // Handle show filter click.
  const handleClick = () => {
    setFilter(!filter);
    if (filter) {
      setValue(null);
    }
  };

  // Handle radio selection.
  const handleChange = (event) => {
    setValue(event.target.value);
  }

  // Show radio group if filter is active.
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
