import React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

import api from '../services/api'
import config from '../config';

class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: null,
      tasks: [],
      newTask: {
        name: {
          value: '',
          error: null
        }
      }
    }

    this.addTask = this.addTask.bind(this)
    this.removeTask = this.removeTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.renderList = this.renderList.bind(this)
    this.updateNewTaskName = this.updateNewTaskName.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({ project: this.props.project }, this.refreshTasks)
  }

  addTask() {

    const params = {
      project: this.state.project.url,
      name: this.state.newTask.name.value,
    }


    return api.post(config.urls.tasks, params).then((resp) => {
      this.refreshTasks()

      this.setState({
        newTask: {
          name: {
            value: '',
            error: null
          }
        }
      })
    }).catch((error) => {
      this.setState({
        newTask: {
          ...this.state.newTask,
          name: {
            ...this.state.newTask.name,
            error: error.response.data.name
          }
        }
      })

    })
  }

  refreshTasks() {
    return api.get(config.urls.tasks, { params: { project: this.state.project.id }}).then((tasks) => {
      this.setState({ tasks: tasks.data })
    })
  }

  removeTask(task) {
    return api.delete(`${config.urls.tasks}${task.id}`).then(response => {
      const tasks = this.state.tasks.filter((item) => item.id !== task.id)
      this.setState({ tasks })
    })
  }

  editTask(task) {
    const t = this.state.tasks.find((item) => item.id === task.id)

    t.edit = !t.edit

    if (t.edit === false) {
      return api.put(`${config.urls.tasks}${task.id}/`, task).then((resp) => {
        this.refreshTasks()
      })
    }

    this.setState({ tasks: this.state.tasks })
  }

  updateTaskName(task, newName) {
    task.name = newName
    this.setState({ tasks: this.state.tasks })
  }

  onSubmit(event) {
    event.preventDefault();
    this.addTask();
  }

  renderList() {
    const { newTask: { name } } = this.state
    return (<List component="nav" aria-label="main mailbox folders">
      {this.state.tasks.map((task) => (
        <ListItem button key={task.id}>
          { task.edit && <TextField label="Name" size="small" value={task.name} onChange={(event) => this.updateTaskName(task, event.target.value)} />}
          { !task.edit && <ListItemText primary={task.name} />}
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" color="primary" onClick={() => this.editTask(task)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" color="secondary" onClick={() => this.removeTask(task)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
      <ListItem button>
        <form onSubmit={this.onSubmit}>
          <TextField
            label="Name"
            size="small"
            value={name.value}
            error={!!name.error}
            helperText={name.error}
            onChange={this.updateNewTaskName}
          />

          <ListItemSecondaryAction>
            <IconButton type="submit" edge="end" aria-label="delete" color="primary">
              <AddIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </form>


      </ListItem>
    </List>)
  }

  updateNewTaskName(event) {
    const newName = event.target.value;
    return this.setState({
      newTask: {
        ...this.state.newTask,
        name: {
          value: newName,
          error: null
        }
      }
    })
  }

  render() {

    return (
      <div>
        {this.renderList()}
      </div>
    )
  }
}

const styles = {
  root: {
    marginTop: 20,
  },
};


export default withStyles(styles)(Tasks);

