import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  FormControl,
  Button,
  withStyles,
  FormLabel,
  MenuItem,
  Chip,
  FormControlLabel,
  IconButton,
  Checkbox
} from '@material-ui/core';
import classNames from 'classnames';
import { reduxForm, formValueSelector, Field } from 'redux-form/immutable';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import treeChanges from 'tree-changes';
import { CloudUpload } from '@material-ui/icons';
import FileIcon from '@material-ui/icons/Description';
import isImage from '@components/Forms/helpers/helpers';
import {
  SelectRedux,
  MultiSelectRedux,
  TextFieldRedux,
  EditorRedux,
  UploadRedux
} from './ReduxFormMUI';
// import Loading from '../Loading';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 15
  },
  dropItem: {
    borderColor: theme.palette.divider,
    background: theme.palette.background.default,
    borderRadius: theme.rounded.medium,
    color: theme.palette.text.disabled,
    textAlign: 'center',
    border: '2px dashed'
  },
  formControl: {
    marginBottom: 20
  },
  field: {
    width: '100%'
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  margin: {
    margin: theme.spacing(3),
  },
  textField: {
    flexBasis: 200,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(0.25),
  },
  alignSelf: {
    alignSelf: 'flex-end'
  },
  buttonPreview: {
    backgroundColor: '#546E7A',
    marginRight: '10px',
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
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  smallPreviewImg: {
    height: '100% !important',
    width: 'initial !important',
    maxWidth: '100%',
  },
});

const selector = formValueSelector('FormPosts');

const required = value => (value == null ? 'Required' : undefined);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


class FormPosts extends Component {
  state = {
    // editorState: EditorState.createEmpty(),
    subCategory: false,
    subCategories: [],
    checked: false,

    image: undefined,
    pdf: undefined,
  };

  componentDidUpdate(prevProps) {
    const {
      _postsCategoryId, categories, _image, _pdf
    } = this.props;
    const { changed } = treeChanges(prevProps, this.props);
    if (changed('_postsCategoryId')) {
      const _category = categories.find(category => category.id === _postsCategoryId);
      const isSub = typeof _category.subCategories === 'object';
      this.updateState({
        subCategory: isSub,
        subCategories: isSub ? _category.subCategories : []
      });
    }
    if (changed('_image')) {
      this.updateState({ image: _image });
    }
    if (changed('_pdf')) {
      this.updateState({ document: _pdf });
    }
  }

  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  updateState(state) {
    this.setState(state);
  }

  render() {
    const {
      checked,
      subCategory,
      subCategories,
      image,
      pdf,
    } = this.state;
    const {
      classes,
      sended,
      handleSubmit,
      reset,
      disabled,
      advanced,
      departmentMunicipal
    } = this.props;
    if (sended) {
      reset();
    }
    const imageFileOpen = () => {
      document.getElementById('imageFile').click();
    };
    const changeBtn = () => (
      <div className="middle">
        <IconButton>
          <CloudUpload className="removeBtn" />
        </IconButton>
      </div>
    );
    const previews = filesArray => filesArray.map((file, index) => {
      const base64Img = URL.createObjectURL(file);
      if (isImage(file)) {
        return (
          <div key={index.toString()}>
            <div className="imageContainer col fileIconImg" style={{ height: '250px' }}>
              <figure className="imgWrap" style={{ height: '100%' }}>
                <img className={classes.smallPreviewImg} src={base64Img} alt="preview" />
              </figure>
              {changeBtn('image')}
            </div>
          </div>
        );
      }
      return (
        <div key={index.toString()}>
          <div className="imageContainer col fileIconImg" style={{ height: '250px' }}>
            <FileIcon className={classes.smallPreviewImg} alt="preview" />
            {changeBtn('pdf')}
          </div>
        </div>
      );
    });
    return (
      <Grid container component="form" spacing={3} onSubmit={handleSubmit}>
        {subCategory && (
          <Grid item xs={12} sm={6} className={classes.formControl}>
            <FormLabel Component="label">Sub Categoría</FormLabel>
            <Field
              className={classes.field}
              name="subCategoryId"
              component={SelectRedux}
              inputProps={{
                name: 'subCategoryId',
                id: 'subCategoryId',
                placeholder: 'Seleccione'
              }}
              disabled={disabled}
            >
              {subCategories.map(sub => (
                <MenuItem key={sub.id} value={sub.id}>
                  {sub.name}
                </MenuItem>
              ))}
            </Field>
          </Grid>
        )}
        <Grid item xs={12} sm={subCategory ? 6 : 12} className={classes.formControl}>
          <FormLabel component="label">Departamento municipal</FormLabel>
          <Field
            name="municipal_department"
            component={MultiSelectRedux}
            placeholder="Seleccione un departamento municipal"
            inputProps={{
              placeholder: 'Seleccione un departamento municipal'
            }}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
            validate={required}
            fullWidth
            required
            disabled={disabled}
          >
            {departmentMunicipal.map(nm => (
              <MenuItem key={nm} value={nm}>
                {nm}
              </MenuItem>
            ))}
          </Field>
        </Grid>
        <Grid item xs={12} className={classes.formControl}>
          <FormLabel Component="label">Titulo</FormLabel>
          <Field
            className={classes.field}
            component={TextFieldRedux}
            name="title"
            placeholder="Ingrese un titulo para una nueva publicación"
            validate={required}
            disabled={disabled}
            required
          />
        </Grid>
        <Grid item xs={12} className={classes.formControl}>
          <Grid container direction="row" justify="space-between">
            <Grid className={classes.alignSelf}>
              <FormLabel Component="label">Imagen</FormLabel>
            </Grid>
            {advanced && (
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={checked}
                    onChange={this.handleChangeCheck('checked')}
                    value="checkedA"
                  />
                )}
                label="Sin imagen"
              />
            )}
          </Grid>
          {!checked && (
            <FormControl
              className={classNames(classes.dropItem, 'dropZone')}
              onClick={imageFileOpen}
            >
              <div className="dropzoneTextStyle" style={{ top: image ? '-7px' : '25%' }}>
                <Field
                  id="imageFile"
                  name="image"
                  component={UploadRedux}
                  accept="image/*"
                  style={{ display: 'none' }}
                  disabled={disabled}
                />
                {!image && (
                  <Fragment>
                    <p className="dropzoneParagraph">
                      {'Arrastra y suelta los archivos aquí o haz clic'}
                    </p>
                    <div className={classes.uploadIconSize}>
                      <CloudUpload />
                    </div>
                  </Fragment>
                )}
                {image && previews([image])}
              </div>
            </FormControl>
          )}
        </Grid>
        <Grid item xs={12} className={classes.formControl}>
          <FormControl>
            <Button
              variant="contained"
              component="label"
            >
              Subir un archivo pdf
              <CloudUpload className={classes.rightIcon} />
              <Field
                name="document"
                component={UploadRedux}
                accept=".pdf"
                id="icon-button-photo"
                style={{ display: 'none' }}
                disabled={disabled}
              />
            </Button>
          </FormControl>
          {pdf && previews([pdf])}
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
        <Grid item xs={12} className={classes.formControl}>
          <Grid container direction="row" justify="flex-end">
            {sended && (
              <Grid item>
                {/* <Loading local variant="small" /> */}
                <div>...Loading</div>
              </Grid>
            )}
            <Grid item>
              <Button
                disabled={sended}
                type="submit"
                variant="outlined"
                color="secondary"
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
FormPosts.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,

  disabled: PropTypes.bool.isRequired,
  advanced: PropTypes.bool.isRequired,
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  departmentMunicipal: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  sended: PropTypes.bool.isRequired,

  _postsCategoryId: PropTypes.string.isRequired,
  _image: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  _pdf: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  initialValues: {
    userId: state.getIn(['user', 'userId']),
    municipalityId: state.getIn(['municipality', 'municipalityId']),
    postsCategoryId: state.getIn(['observable', 'selectedCategory']),
  },

  categories: state.getIn(['posts', 'categories']),
  sended: state.getIn(['posts', 'sending']),

  // form values
  _image: selector(state, 'image'),
  _pdf: selector(state, 'pdf'),
  _postsCategoryId: selector(state, 'postsCategoryId'),
});

const PostsFormRedux = reduxForm({
  form: 'FormPosts',
  enableReinitialize: true
});

const withConnect = connect(
  mapStateToProps
);

export default withStyles(styles)(
  compose(
    withConnect,
    PostsFormRedux
  )(FormPosts)
);
