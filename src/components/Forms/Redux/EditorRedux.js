import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import '@styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import treeChanges from 'tree-changes';

/* EditorRedux */
class EditorRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      _toolbar: {},
    };
  }

  componentWillMount() {
    const { ...rest } = this.props;
    this.setState({ _toolbar: rest.toolbar });
  }

  onEditorStateChange = editorState => {
    const { input: { onChange, value } } = this.props;


    const newValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const { changed } = treeChanges({ value }, { value: newValue });

    if (changed('value') && typeof newValue === 'string') {
      onChange(newValue);
    }

    this.setState({
      editorState
    });
  };

  render() {
    const { meta, input, ...rest } = this.props;
    const { editorState, _toolbar } = this.state;
    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
        {...rest}
        toolbar={_toolbar}
      />
    );
  }
}

EditorRedux.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

EditorRedux.defaultProps = {
  meta: null,
};
/* End */

export default EditorRedux;
