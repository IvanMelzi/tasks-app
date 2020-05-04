import React from 'react';
import './Home.css';
import NewTask from '../NewTask/NewTask'

const Home = props => {
  return (
    <div className="tasks-list">      
        <NewTask
            key="newTask"
            title="Titulo"
            description="desc"
            isFav="no"
        />
    </div>

  );
};

export default Home;
