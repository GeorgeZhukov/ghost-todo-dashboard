import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';

import Tasks from './Tasks'

import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';
import { IconButton } from '@material-ui/core';
import api from '../services/api'
import config from '../config'


class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: null,
      loading: false,
      nameEdit: false,
    }

    this.toggleNameEdit = this.toggleNameEdit.bind(this)
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this)
  }

  componentDidMount() {
    this.setState({ project: this.props.project })
  }

  saveProject(project) {
    return api.put(`${config.urls.projects}${project.id}/`, {name: project.name}).then((response) => {
      console.info('project updated')
    }).catch((error) => {
      const { name } = error.response.data;

      alert(name)
    })
  }

  toggleNameEdit() {
    const { nameEdit, project } = this.state

    if (nameEdit) {
      this.saveProject(project)
    }

    return this.setState({nameEdit: !nameEdit})
  }

  renderRemoveBtn() {
    const { project } = this.state
    const { onRemove } = this.props

    return (
      <div>
        <IconButton onClick={this.toggleNameEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onRemove(project)}>
          <DeleteIcon />
        </IconButton>
      </div>
    )
  }


  handleProjectNameChange(event) {
    const name = event.target.value

    return this.setState({
      project: {
        ...this.state.project,
        name,
      }
    })
  }

  renderProjectEditNameForm() {
    const { project } = this.state

    return (
      <form onSubmit={this.toggleNameEdit}>
        <TextField
          id="standard-basic"
          label="Project name"
          value={project.name}
          onChange={this.handleProjectNameChange}
          size="small" />
      </form>
    )
  }

  render() {
    const { project, nameEdit } = this.state
    const { classes } = this.props

    if (!project) {
      return null
    }

    return (
      <Card className={classes.root}>
        <CardHeader
          title={nameEdit ? this.renderProjectEditNameForm() : project.name}
          subheader={moment(project.created_at).format('MMMM Do YYYY, h:mm:ss a')}
          action={this.renderRemoveBtn()}
        />
        <CardContent>
          <Tasks project={project} />
        </CardContent>
        <CardActions disableSpacing>

        </CardActions>
      </Card>
    );
  }
}

const styles = {
  root: {
    marginTop: 20,
  },
};


export default withStyles(styles)(Project);

