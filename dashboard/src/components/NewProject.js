import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';

import { withStyles } from '@material-ui/core/styles';

import api from '../services/api'

class NewProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        isOpen: false,
        name: {
          value: '',
          error: null,
        },
      },

    }

    this.addProject = this.addProject.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleUpdateProjectName = this.handleUpdateProjectName.bind(this);
  }

  showDialog(show) {
    return this.setState({
      form: {
        ...this.state.form,
        isOpen: show
      }
    })
  }

  addProject() {
    const params = {
      owner: 'http://localhost:8000/users/1/',
      name: this.state.form.name.value,
    }

    return api.post('/projects/', params).then((response) => {
      const project = response.data;

      this.setState({
        form: {
          ...this.state.form,
          name: {
            value: '',
            error: null,
          }
        }
      })

      this.props.onCreated(project);

      return project
    }).catch((error) => {
      const data = error.response.data;

      this.setState({
        form: {
          ...this.state.form,
          name: {
            ...this.state.form.name,
            error: data.name,
          }
        }
      })

      return false
    })
  }

  onSubmit(event) {
    event.preventDefault();

    return this.addProject().then((project) => this.showDialog(!project))
  }

  handleUpdateProjectName (event) {
    return this.setState({
      form: {
        ...this.state.form,
        name: {
          value: event.target.value,
          error: null
        }
      }
    })
  }

  render() {
    const { form: { name, isOpen } } = this.state

    return (
      <div>
        <Grid container justify="center" className={this.props.classes.addProjectBtn}>
          <Button
            startIcon={<AddIcon />}
            onClick={() => this.showDialog(true)}
          >
            Add Project
          </Button>
        </Grid>

        <Dialog open={isOpen} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new project enter the name.
            </DialogContentText>
            <form autoComplete="off" noValidate onSubmit={this.onSubmit} >
              <TextField
                autoFocus
                margin="dense"
                label="Project Name"
                onChange={this.handleUpdateProjectName}
                value={name.value}
                error={!!name.error}
                helperText={name.error}
                fullWidth
              />
            </form>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.showDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button type="submit" onClick={this.onSubmit} color="primary" disabled={!!name.error}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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


export default withStyles(styles)(NewProject);

