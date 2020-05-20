import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import LinkAdapter from '@components/LinkAdapter';
import styles from './breadCrumb-jss';
import { withRouter } from 'next/router';

const Breadcrumbs = props => {
  const {
    classes, theme, separator, router
  } = props;

  let parts = router.pathname.split('/');
  const place = parts[parts.length - 1];
  parts = parts.slice(1, parts.length - 1);
  return (
    <section
      className={classNames(
        theme === 'dark' ? classes.dark : classes.light,
        classes.breadcrumbs
      )}
    >
      {parts.length > 0 ? (
        <p>
          Tu estás aqui:
          <span>
            {parts.map((part, partIndex) => {
              const path = ['', ...parts.slice(0, partIndex + 1)].join('/');
              return (
                <Fragment key={path}>
                  <LinkAdapter to={path}>{part.replace(/_/gi, ' ')}</LinkAdapter>
                  {separator.replace(/_/gi, ' ')}
                </Fragment>
              );
            })}
                &nbsp;
                {place.replace(/_/gi, ' ')}
          </span>
        </p>
      ) : (
          ''
        )}
    </section>
  );
};

Breadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  separator: PropTypes.string.isRequired
};

export default withRouter(withStyles(styles)(Breadcrumbs));
