import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

import Tasks from './Tasks'

import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';
import { IconButton } from '@material-ui/core';


class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: null,
      loading: false
    }
  }

  componentDidMount() {
    this.setState({ project: this.props.project })
  }

  renderRemoveBtn() {
    const { project } = this.state
    const { onRemove } = this.props

    return (
      <IconButton onClick={() => onRemove(project)}>
        <DeleteIcon />
      </IconButton>
    )
  }


  render() {
    const { project } = this.state
    const { classes } = this.props

    if (!project) {
      return null
    }

    return (
      <Card className={classes.root}>
        <CardHeader
          title={project.name}
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

