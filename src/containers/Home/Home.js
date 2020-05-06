import React from 'react';
import './Home.css';
import NewTask from '../NewTask/NewTask'
import TaskList from '../TaskList/TaskList';

const Home = props => {
  return (
    <div className="all-tasks-list">      
        <NewTask
            key="newTask"
            title="Titulo"
            description="desc"
            isFav="no"
        />
        <TaskList></TaskList>
    </div>

  );
};

export default Home;
