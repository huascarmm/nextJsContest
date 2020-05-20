import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import {
  Grid,
  FormLabel,
  MenuItem,
  Button,
  TextField,
  Chip,
  withStyles
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { TextFieldRedux, EditorRedux } from './ReduxFormMUI';
// import Loading from '../Loading';
import UploadFieldRedux from './Redux/UploadFieldRedux';
import DropZoneRedux from './Redux/DropZoneRedux';
import TextFieldControlRedux from './Redux/TextFieldControlRedux';
import SearchLocationRedux from './Redux/SearchLocationRedux';

const required = value => (value == null ? 'Required' : undefined);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = theme => ({
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  textEditor: {
    background: theme.palette.background.paper,
    minHeight: 200,
    border: `1px solid ${theme.palette.divider}`,
    padding: '0 10px',
    color: theme.palette.text.primary
  },
  toolbarEditor: {
    background: theme.palette.background.default,
    border: 'none',
    '& > div': {
      background: theme.palette.background.paper,
      '& img': {
        filter: theme.palette.type === 'dark' ? 'invert(100%)' : 'invert(0%)'
      },
      '& a': {
        color: theme.palette.text.primary,
        '& > div': {
          borderTopColor: theme.palette.text.primary,
        }
      }
    }
  },
});

class FormProjects extends Component {
  render() {
    const {
      classes,
      sended,
      handleSubmit,
      reset,
      disabled,
      departmentMunicipal,
      process,
      latLng,
      advanced
    } = this.props;
    if (sended) reset();
    return (
      <Grid container component="form" spacing={3} onSubmit={handleSubmit}>
        <Grid item xs={12} sm={7}>
          <Field
            label="Departamento municipal"
            name="municipal_department"
            component={TextFieldControlRedux}
            select
            multiple
            SelectProps={{
              renderValue: selected => (
                <div>
                  {selected.map(value => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              ),
              MenuProps,
              multiple: true
            }}
            validate={required}
            disabled={disabled}
            fullWidth
            required
          >
            {departmentMunicipal.map(title => (
              <MenuItem key={title} value={title}>
                {title}
              </MenuItem>
            ))}
          </Field>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Field
            label="Tipo de situación"
            select
            name="process"
            component={TextFieldControlRedux}
            validate={required}
            disabled={disabled}
            fullWidth
            required
          >
            {process.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Field>
        </Grid>
        <Grid item xs={12}>
          <Field
            label="Titulo"
            name="title"
            component={TextFieldControlRedux}
            placeholder="Ingrese un titulo para una nueva publicación"
            validate={required}
            disabled={disabled}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            label="Galería"
            component={DropZoneRedux}
            name="gallery"
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            showPreviews
            maxSize={5000000}
            filesLimit={6}
            text="Seleccione imágenes para la obra"
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel Component="label">Localización</FormLabel>
          <Grid container>
            <Grid item xs={7}>
              <Field
                name="location"
                component={TextFieldRedux}
                placeholder="Dirección"
                validate={required}
                disabled={disabled}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                value={latLng ? `${latLng.lat};${latLng.lng}` : ''}
                placeholder="Seleccione ubicación"
                fullWidth
              />
            </Grid>
          </Grid>
          <Field
            name="latLng"
            component={SearchLocationRedux}
            subscribe="latLng"
            validate={required}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            label="Presupuesto"
            name="budget"
            component={TextFieldControlRedux}
            placeholder="Costo (Bs)"
            validate={required}
            disabled={disabled}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            label="Documento"
            name="document"
            component={UploadFieldRedux}
            acceptedFiles={['.pdf']}
            text="Cargar Archivo"
            validate={required}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} className={classes.formControl}>
          <FormLabel component="label">Descripción</FormLabel>
          <Field
            name="content"
            toolbarHidden={!advanced}
            component={EditorRedux}
            disabled={disabled}
            editorClassName={classes.textEditor}
            toolbarClassName={classes.toolbarEditor}
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily'],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                bold: { className: 'bordered-option-classname' },
                italic: { className: 'bordered-option-classname' },
                underline: { className: 'bordered-option-classname' },
                strikethrough: { className: 'bordered-option-classname' },
                code: { className: 'bordered-option-classname' },
              },
              blockType: {
                className: 'bordered-option-classname',
              },
              fontSize: {
                className: 'bordered-option-classname',
              },
              fontFamily: {
                className: 'bordered-option-classname',
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" justify="flex-end">
            <Grid item>
              <Button disabled={sended} type="submit" variant="contained">
                {sended && (
                  // <Loading local variant="small" />
                  <div>...Loading</div>
                )}
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
FormProjects.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  departmentMunicipal: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  process: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  reset: PropTypes.func.isRequired,
  sended: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  latLng: PropTypes.object.isRequired,

  advanced: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  initialValues: {
    userId: state.getIn(['user', 'userId']),
    municipalityId: state.getIn(['municipality', 'municipalityId']),
    postsCategoryId: state.getIn(['observable', 'selectedCategory']),
  },
  sended: state.getIn(['posts', 'sending']),
  latLng: state.getIn(['observable', 'latLng']),
  ...state
});

const FormProjectsRedux = reduxForm({
  form: 'FormProjects',
  enableReinitialize: true
});

const withConnect = connect(mapStateToProps);

export default withStyles(MenuProps)(compose(
  withConnect,
  FormProjectsRedux
)(FormProjects));
