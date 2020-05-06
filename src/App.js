import React from 'react'
import './App.css';
import SideBar from './components/SideBar/SideBar';
import HomePage from './containers/Home/Home';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <SideBar className="side-bar" />
      <main>
        <Route path="/" exact component={ HomePage } />{/* 
        <Route path="/history" component={FavoritesPage} />
        <Route path="/performance" component={FavoritesPage} /> */}
      </main>
    </div>
  );
}

export default App;
