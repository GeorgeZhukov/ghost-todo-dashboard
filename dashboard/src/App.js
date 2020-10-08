import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import './App.css';

import Login from './components/Login';
import Projects from './components/Projects';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

    this.loggedIn = this.loggedIn.bind(this);
    this.content = this.content.bind(this);
  }

  loggedIn() {
    return !!this.state.user;
  }

  content() {
    if (this.loggedIn()) {
      const logout = () => {
        this.setState({ user: null })
      }
      return <Projects logout={logout} projects={this.state.user.projects} />
    }

    const handleLogin = (user) => {
      this.setState({ user })
    }

    return <Login onLogin={handleLogin}/>
  }

  render() {
    const { classes } = this.props;

    return (
      <Container fixed>
        <Grid className={classes.root} justify="center" container spacing={3}>
          <Grid item sm={6}>
            { this.content() }
          </Grid>
        </Grid>
      </Container>
    );

  }
}

const styles = {
  root: {
    marginTop: 100,
  },
};

export default withStyles(styles)(App);
