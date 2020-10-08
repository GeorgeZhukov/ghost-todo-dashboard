import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import RefreshIcon from '@material-ui/icons/Refresh';

import { withStyles } from '@material-ui/core/styles';

import api from '../services/api'
import Project from './Project';
import NewProject from './NewProject'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      snackopen: false,
      snackmsg: '',
      snackerrormsg: ''
    }

    this.refreshProjects = this.refreshProjects.bind(this);
    this.removeProject = this.removeProject.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.showSuccessMsg = this.showSuccessMsg.bind(this);
    this.showErrorMsg = this.showErrorMsg.bind(this);
  }

  componentDidMount() {
    this.refreshProjects()
  }

  showSuccessMsg(message) {
    return this.setState({snackopen: true, snackmsg: message })
  }

  showErrorMsg(message) {
    return this.setState({snackopen: true, snackerrormsg: message })
  }

  refreshProjects() {
    return api.get('/projects/').then((response) => {
      this.setState({ projects: response.data })
    }).catch((error) => {
      const { detail } = error.response.data;
      this.showErrorMsg(detail)
    })
  }

  removeProject(project) {
    this.setState({snackopen: true})
    return api.delete(`/projects/${project.id}`).then((response) => {
      // this.refreshProjects()
      const projects = this.state.projects.filter((item) => item.id !== project.id)

      this.setState({ projects })
      this.showSuccessMsg('Project successfully removed')
    }).catch((error) => {
      const { detail } = error.response.data;

      this.showErrorMsg(detail)
    })
  }

  renderProjects() {
    const { projects } = this.state;

    if (projects.length === 0) {
      return (<Typography variant="overline" display="block" gutterBottom>No projects</Typography>)
    }

    return projects.map((project) => <Project project={project} key={project.id} onRemove={this.removeProject} />)
  }

  handleClose (event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({snackopen: false, snackerrormsg: '', snackmsg: ''});
  }

  render() {
    const { snackopen, snackerrormsg, snackmsg } = this.state;

    return (
      <Container>
        <Grid container justify="flex-end">
          <ButtonGroup disableElevation>
            <Button onClick={this.refreshProjects} startIcon={<RefreshIcon />}>
              Refresh
            </Button>
            <Button onClick={this.props.handleLogout}>
              Logout
            </Button>
          </ButtonGroup>
        </Grid>

        { this.renderProjects() }

        <NewProject onCreated={this.refreshProjects} />

        <Snackbar open={snackopen} onClose={this.handleClose} autoHideDuration={3000}>
          <Alert  severity={snackmsg.length > 0 ? 'success' : 'error'}> { snackmsg.length > 0 ? snackmsg : snackerrormsg }</Alert>
        </Snackbar>
      </Container>
    );
  }
}

const styles = {
  root: {
    marginTop: 20,
  },
  addProjectBtn: {
    marginTop: 20,
  }
};


export default withStyles(styles)(Projects);

