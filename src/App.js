import React from 'react'
import './App.css';
import SideBar from './components/SideBar/SideBar';
import HomePage from './containers/Home/Home';
import HistoryPage from './containers/History/History';
import PerformancePage from './containers/Performance/Performance';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <SideBar className="side-bar" />
      <main>
        <Route path="/" exact component={ HomePage } />
        <Route path="/history" component={ HistoryPage } />
        <Route path="/performance" component={ PerformancePage } />
      </main>
    </div>
  );
}

export default App;
