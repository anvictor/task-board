import React from 'react';
import SignIn from './modules/SignIn/SignIn';
import TaskList from './modules/TaskList/TaskList';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import {
  setContact,
} from './redux/actions/index';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './App.css';

const mapStateToProps = store => {
  return {store}
};

const mapDispatchToProps = dispatch => ({
  setContactDispatch: (user) =>
    dispatch(setContact(user)),
});

function App(props) {
  const {store:{contact:{user}}} = props;
  const setContact = props.setContactDispatch;
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
          <Router>
              <Route exact path="/">
                <SignIn
                  setContact={setContact}
                />
              </Route>
              <Route exact path="/task-board/">
                <SignIn
                  setContact={setContact}
                />
              </Route>
              <Route exact path="/task-board/index.html">
                <SignIn
                  setContact={setContact}
                />
              </Route>
              <Route path="/task-board/SignIn">
                <SignIn
                  setContact={setContact}
                />
              </Route>
              <Route path="/task-board/tasks">
                <div className={'taskContainer'}>
                  <TaskList
                    contact={user}
                  />
                </div>
              </Route>
          </Router>
      </Container>
    </React.Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
