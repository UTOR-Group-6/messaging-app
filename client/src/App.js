import React, { useEffect } from 'react';
import Chat from './pages/Chat';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/chat' component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
