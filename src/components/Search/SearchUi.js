import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import LinkAdapter from '@components/LinkAdapter';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import suggestionsApi from '@api/ui/menu';
import styles from './search-jss';
import { Router } from 'server/router.module';

const menu = [];
// imprime un un textfieldcon un REF
function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      className={classes.inputHeader}
      fullWidth
      InputProps={{
        inputRef: ref,
        ...other
      }}
    />
  );
}
// imprime menuItem que son buttons, previamente habiendo comparada suggestion name com query
function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);
  return (
    <MenuItem
      button
      selected={isHighlighted}
      component={LinkAdapter}
      to={suggestion.link}
    >
      <div>
        {parts.map((part, index) => (part.highlight ? (
          <span key={String(index)} style={{ fontWeight: 700 }}>
            {part.text}
          </span>
        ) : (
          <strong key={String(index)} style={{ fontWeight: 300 }}>
            {part.text}
          </strong>
        ))
        )}
      </div>
    </MenuItem>
  );
}
// imprime Paper con un children
function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return <Paper {...containerProps}>{children}</Paper>;
}
// saca los name
function getSuggestionValue(suggestion) {
  return suggestion.name;
}
// filtra los resultados a medida que se escribe
function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;
  return inputLength === 0
    ? []
    : menu.filter(suggestion => {
      const keep = (!inputValue
            || suggestion.name.toLowerCase().indexOf(inputValue.toLowerCase())
              !== -1)
          && count < 5;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

class SearchUi extends React.Component {
  // trabaja con value y suggestions
  state = {
    value: '',
    suggestions: []
  };

  // en el mount recorre un API, lo recorre, ve si tiene child, lo recorre, lo añade a un menu
  componentDidMount() {
    suggestionsApi.map(item => {
      if (item.child) {
        item.child.map(itemChild => {
          if (itemChild.link) {
            menu.push(itemChild);
          }
          return menu;
        });
      }
      return false;
    });
  }

  // Suggestions al escribir
  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // resetea sugestions
  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  // establece el value
  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // al hacer enter lo ingresa a history el suggestions link
  handleSuggestionSelected = (event, { suggestion, method }) => {
    if (method === 'enter') {
      Router.pushRoute(suggestion.link);
    }
  };

  render() {
    const { classes, handleSearch } = this.props;
    const { suggestions, value } = this.state;
    // deveulve un Autosuggest
    return (
      <Autosuggest
        theme={{
          container: classes.containerSearch,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={renderInput}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={this.handleSuggestionSelected}
        renderSuggestion={renderSuggestion}
        className={classes.autocomplete}
        inputProps={{
          classes,
          placeholder: 'Buscar',
          value,
          onChange: this.handleChange,
          onKeyUp: handleSearch
        }}
      />
    );
  }
}

SearchUi.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired
};
export default withStyles(styles)(SearchUi);
