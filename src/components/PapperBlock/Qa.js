import React, { Component } from 'react';
import PapperBlock from './PapperBlock';
import AccordeonSimple from '../Acoordeon/Simple';

class Qa extends Component {
  render() {
    const questions = [
      { title: 'Primera pregunta?', content: 'Answer 1' },
      { title: 'Segunda pregunta?', content: 'Answer 1' },
      { title: 'Tercera pregunta?', content: 'Answer 1' },
      { title: '¿Quarta pregunta?', content: 'Answer 1' },
      { title: '¿Quinta pregunta?', content: 'Answer 1' }
    ];
    return (
      <PapperBlock
        overflowX
        title="Preguntas y respuestas"
        icon="ios-help-circle"
        desc="Las preguntas mas comunes aquí"
      >
        <AccordeonSimple options={questions} />
      </PapperBlock>
    );
  }
}

export default Qa;
