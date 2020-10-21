import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

import { withStyles } from '@material-ui/core/styles';


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

  render() {
    const { project } = this.state
    const { classes, onRemove } = this.props

    if (!project) {
      return null
    }

    return (
      <Card className={classes.root}>
        <CardHeader
          title={project.name}
          subheader={project.created_at}
        />
        <CardContent>

        </CardContent>
        <CardActions disableSpacing>
          <Button
            size="small"
            onClick={() => onRemove(project)}
            startIcon={<DeleteIcon />}
          >Remove</Button>
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

