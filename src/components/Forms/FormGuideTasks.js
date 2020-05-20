import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Divider,
  Button,
  withStyles,
  MenuItem
} from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import treeChanges from 'tree-changes';
import {
  TextFieldRedux,
  UploadRedux
} from './ReduxFormMUI';
import TextFieldControlRedux from './Redux/TextFieldControlRedux';
import styles from '../Management/email-jss';

const selector = formValueSelector('FormGuideTasks');

class FormGuideTasks extends Component {
  state = {
    buttonText: 'Guardar',
    focusImage: true
  };

  componentDidUpdate(prevProps) {
    const { filestorage } = this.props;
    const { changed } = treeChanges(prevProps, this.props);
    if (changed('filestorage')) {
      if (Object.keys(filestorage).length > 0) {
        this.updateState({
          buttonText: 'Modificar',
          focusImage: true
        });
      } else {
        this.updateState({
          buttonText: 'Guardar',
          focusImage: false
        });
      }
    }
  }

  updateState(params) {
    this.setState(params);
  }

  render() {
    const {
      classes, handleSubmit, listDep, hierarchy
    } = this.props;
    const { buttonText, focusImage } = this.state;
    return (
      <form onSubmit={handleSubmit} className={classes.emailList}>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <Typography>Formulario</Typography>
          </Grid>
          <Field
            name="hierarchy.id"
            component={TextFieldRedux}
            style={{ display: 'none' }}
          />
          <Grid item md={7} xs={12}>
            <Field
              name="hierarchy.title"
              component={TextFieldRedux}
              label="Titulo"
              fullWidth
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <Field
              select
              component={TextFieldControlRedux}
              name="hierarchy.parentId"
              label="Select"
              fullWidth
            >
              {Boolean(listDep)
                && listDep.map(sub => {
                  if (hierarchy.id === sub.id) {
                    console.log(hierarchy);
                  }
                  return (
                    <MenuItem key={sub.id} value={sub.id}>
                      {sub.title}
                    </MenuItem>
                  );
                })}
            </Field>
          </Grid>
          <Grid item md={12} xs={12}>
            <Field
              component={TextFieldRedux}
              name="hierarchy.description"
              label="Descripción"
              multiline
              fullWidth
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Typography style={{ position: 'relative' }}>
              Manual de funciones
            </Typography>
            <Divider component="p" variant="inset" />
          </Grid>
          <Field
            name="guideTasks.id"
            component={TextFieldRedux}
            style={{ display: 'none' }}
          />
          <Grid item md={7} xs={12}>
            <Field
              component={TextFieldRedux}
              name="guideTasks.name"
              label="Nombre"
              fullWidth
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <Field
              component={TextFieldRedux}
              name="guideTasks.resolution"
              label="Resolución"
              fullWidth
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Field
              component={TextFieldRedux}
              name="guideTasks.description"
              label="Descripción"
              multiline
              fullWidth
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Field
              component={TextFieldRedux}
              name="guideTasks.contents['objectives']"
              label="Objetivos"
              multiline
              fullWidth
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Field
              component={TextFieldRedux}
              name="guideTasks.contents['functions']"
              label="Funciones"
              multiline
              fullWidth
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Field
              component={TextFieldRedux}
              name="guideTasks.contents['requisitos']"
              label="Requisitos"
              multiline
              fullWidth
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Button variant="contained" disabled={focusImage} component="label">
              Subir un archivo pdf
              <CloudUpload className={classes.rightIcon} />
              <Field
                name="filestorage.upload"
                component={UploadRedux}
                accept=".pdf"
                id="icon-button-photo"
                style={{ display: 'none' }}
              />
            </Button>
            <Button
              className={classes.addBtn}
              type="submit"
              variant="contained"
              color="primary"
            >
              {buttonText}
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}
FormGuideTasks.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  listDep: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  hierarchy: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  filestorage: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
FormGuideTasks.defaultProps = {
  hierarchy: {},
  guideTasks: {},
  filestorage: {}
};
const ReduxFormMapped = reduxForm({
  form: 'FormGuideTasks',
  enableReinitialize: true
});

const mapStateToProps = state => ({
  initialValues: state.getIn(['management', 'initValues']),
  hierarchy: selector(state, 'hierarchy'),
  guideTasks: selector(state, 'guideTasks'),
  filestorage: selector(state, 'filestorage'),
  ...state
});

const withConnect = connect(mapStateToProps);

export default withStyles(styles)(
  compose(
    withConnect,
    ReduxFormMapped
  )(FormGuideTasks)
);
