import React from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Type from '@styles/Typography.scss';
import Slider from 'react-animated-slider';
// import { Link } from 'react-router-dom';
// import {Loading} from '@components';
import '@styles/vendors/react-animated-slider/react-animated-slider.css';

const styles = (theme) => ({
  tag: {
    background: fade(theme.palette.primary.light, 0.8),
    color: theme.palette.primary.dark,
    position: 'absolute',
    right: 10,
    top: 10,
    padding: theme.spacing(1),
    borderRadius: theme.rounded.big,
    fontSize: 11,
    fontWeight: theme.typography.fontWeightMedium,
    boxShadow: theme.shadows[3],
  },
  title: {
    color: theme.palette.common.white,
  },
});

function SliderWidget(props) {
  const { classes, posts } = props;
  return posts.length !== undefined ? (
    <div>
      <Slider
        className="slider-wrapper large"
        autoplay={5000}
        touchDisabled
      >
        {posts.map((item, index) => (
          <div
            key={index.toString()}
            className="slider-content"
            style={{
              background: `url('${item.image}') no-repeat center center`,
            }}
          >
            {item.tag !== undefined && (
              <span className={classes.tag}>{item.tag}</span>
            )}
            <div className="inner">
              <Typography
                variant="subtitle1"
                component="h3"
                className={classNames(classes.title, Type.light)}
                gutterBottom
              >
                {item.title}
              </Typography>
              {item.type === 'article' && (
                <Button
                  variant="contained"
                  color="primary"
                  // component={Link}
                  // to={item.link}
                >
                  {item.button}
                </Button>
              )}
              {item.type === 'video' && (
                <Button variant="contained" color="primary">
                  <Icon>play_arrow</Icon>
                  {item.button}
                </Button>
              )}
            </div>
            {item.label !== undefined && (
              <section>
                <img src={item.userProfile} alt={item.user} />
                <span>
                  {item.label}
                  &nbsp;
                  <strong>{item.to}</strong>
                </span>
              </section>
            )}
          </div>
        ))}
      </Slider>
    </div>
  ) : (
    // <Loading local />
    <div>...Loading</div>
  );
}

SliderWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  posts: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default withStyles(styles)(SliderWidget);
