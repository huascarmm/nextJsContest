/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Typography,
  Grid,
  Tooltip,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Icon
} from '@material-ui/core';
import {
  Send,
  RemoveCircle,
  AddCircle
} from '@material-ui/icons';
import Zoom from '@material-ui/core/Zoom';

const styles = theme => ({

});

class FormChannel extends Component {
  state = {
    submitAdding: false,
    type: '',
    content: '',
    description: ''
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { listChannel, listOptions, } = newProps;
    if (Array.isArray(listChannel)) {
      this.setState({ type: listChannel[0].type });
    }
    if (Array.isArray(listOptions)) {
      this.setState({ description: listOptions[0].type });
    }
  }

  onSubmitAdding = () => {
    const { submitAdding } = this.state;
    this.setState({ submitAdding: !submitAdding });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  fieldPush = () => {
    const { fields } = this.props;
    const {
      type,
      content,
      description,
      submitAdding
    } = this.state;
    fields.push({ type, content, description });
    this.setState({
      type: '',
      content: '',
      description: '',
      submitAdding: !submitAdding
    });
  }

  render() {
    const {
      classes,
      listChannel,
      listOptions,
      title,
      placeholder,
    } = this.props;
    const {
      submitAdding, type, content, description
    } = this.state;
    return (
      <Fragment>
        <Grid container justify="space-between">
          <Typography align="center" component="p">
            {title}
          </Typography>
          <Tooltip title={!submitAdding ? `Agregar ${title}` : 'Descartar'} aria-label="Añadir">
            <IconButton onClick={this.onSubmitAdding}>
              {!submitAdding ? <AddCircle /> : <RemoveCircle />}
            </IconButton>
          </Tooltip>
        </Grid>
        {submitAdding && (
          <Grid container spacing={3}>
            <Grid item md={4}>
              <TextField
                select
                value={type}
                onChange={this.handleChange('type')}
                size="small"
                required
              >
                {listChannel.map((contact) => (
                  <MenuItem key={`${contact.type}-${title}`} value={contact.type}>
                    {contact.title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md>
              <TextField
                value={content}
                onChange={this.handleChange('content')}
                size="small"
                placeholder={placeholder}
                margin="none"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        style={{ alignSelf: 'center' }}
                        aria-label={`Agregar a la lista ${title}`}
                        onClick={this.fieldPush}
                      >
                        <Send />
                      </IconButton>
                    </InputAdornment>
                  ),
                  startAdornment: listOptions && (
                    <TextField
                      select
                      value={description}
                      margin="none"
                      onChange={this.handleChange('description')}
                      size="small"
                    // style={{ paddingBottom: '4px' }}
                    >
                      {listOptions.map((option) => (
                        <MenuItem key={`${option.type}-${title}`} value={option.type}>
                          <Tooltip
                            placement="right"
                            title={option.title}
                            aria-label={option.title}
                            TransitionComponent={Zoom}
                          >
                            <Icon color="primary" style={{ fontSize: 18 }}>{option.icon}</Icon>
                          </Tooltip>
                        </MenuItem>
                      ))}
                    </TextField>
                  )
                }}
              />
            </Grid>
          </Grid>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(FormChannel);
