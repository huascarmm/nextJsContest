import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-animated-slider';
import { Hidden } from '@material-ui/core';
import FileStorageApi from '../../api/services/file.storage.service';

class AnimatedSlider extends Component {
  isImage = (file) => FileStorageApi.getLinkTo(file);

  render() {
    const { content } = this.props;
    return (
      <div>
        <Slider className="slider-wrapper">
          {content && content.map((item, index) => (
            <div
              key={index.toString()}
              className="slider-content"
              style={{ background: `url('${this.isImage(item.fileStorage)}') no-repeat center center` }}
            >
              <div className="inner">
                <Hidden mdDown>
                  <p>{item.fileStorage.alt}</p>
                </Hidden>
              </div>
              <section>
                <span>
                  Imagen de&nbsp;
                  <strong>
                    Galería
                  </strong>
                </span>
              </section>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
AnimatedSlider.propTypes = {
  content: PropTypes.array.isRequired
};

export default AnimatedSlider;
