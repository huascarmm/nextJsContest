import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PapperBlock from './PapperBlock';

class Estrategics extends Component {
  state = {
    title: '',
    icon: ''
  };

  componentWillMount() {
    const { type } = this.props;
    switch (type) {
      case 'mission':
        this.setState({
          title: 'Misión',
          icon: 'ios-flag'
        });
        break;

      case 'vision':
        this.setState({
          title: 'Visión',
          icon: 'ios-eye'
        });
        break;
      default:
        break;
    }
  }

  render() {
    const { title, icon } = this.state;
    return (
      <PapperBlock overflowX title={title} icon={icon} desc="">
        aqui texto de mision
      </PapperBlock>
    );
  }
}

Estrategics.propTypes = {
  type: PropTypes.string.isRequired
};
export default Estrategics;
