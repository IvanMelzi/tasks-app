import React from 'react'
import './App.css';
import SideBar from './components/SideBar/SideBar';
import Home from './containers/Home/Home';
import { Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <SideBar className="side-bar" />
      <main>
        <Route path="/" exact component={Home} />{/* 
        <Route path="/history" component={FavoritesPage} />
        <Route path="/performance" component={FavoritesPage} /> */}
      </main>
    </React.Fragment>
  );
}

export default App;
