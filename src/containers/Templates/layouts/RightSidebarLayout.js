import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { withStyles, Typography, Fade } from '@material-ui/core';
import { Sidebar, BreadCrumb, Header, ImageFooter } from '@components';
//import Decoration from '../Decoration';
import styles from '../appStyles-jss';
//import ImageFooter from '../../../components/Footer/ImageFooter';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';

const Decoration = dynamic(() => import('../Decoration'))

class RightSidebarLayout extends React.Component {
  render() {
    const {
      classes,
      children,
      toggleDrawer,
      sidebarOpen,
      router,
      loadTransition,
      pageLoaded,
      mode,
      gradient,
      deco,
      bgPosition,
      changeMode,
      place,
      titleException,
      handleOpenGuide,
    } = this.props;
    return (
      <Fragment>
        <Header
          toggleDrawerOpen={toggleDrawer}
          margin={sidebarOpen}
          gradient={gradient}
          position="right-sidebar"
          changeMode={changeMode}
          mode={mode}
          title={place}
          openGuide={handleOpenGuide}
        />
        <main
          className={classNames(
            classes.content,
            !sidebarOpen ? classes.contentPaddingRight : ''
          )}
          id="mainContent"
        >
          <Decoration
            mode={mode}
            gradient={gradient}
            decoration={deco}
            bgPosition={bgPosition}
            horizontalMenu={false}
          />
          <section
            className={classNames(classes.mainWrap, classes.sidebarLayout)}
          >
            {titleException.indexOf(router.pathname) < 0 && (
              <div className={classes.pageTitle}>
                <Typography
                  component="h4"
                  className={
                    bgPosition === 'header'
                      ? classes.darkTitle
                      : classes.lightTitle
                  }
                  variant="h4"
                >
                  {place.replace(/_/gi, ' ')}
                </Typography>
                <BreadCrumb
                  separator=" / "
                  theme={bgPosition === 'header' ? 'dark' : 'light'}
                />
              </div>
            )}
            {!pageLoaded && (
              <img
                src="/images/spinner.gif"
                alt="spinner"
                className={classes.circularProgress}
              />
            )}
            <Fade
              in={pageLoaded}
              mountOnEnter
              unmountOnExit
              {...(pageLoaded ? { timeout: 700 } : {})}
            >
              <div
                className={!pageLoaded ? classes.hideApp : ''}
                style={{
                  minHeight: '90%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {children}
                <ImageFooter />
              </div>
            </Fade>
          </section>
        </main>
        <Sidebar
          open={sidebarOpen}
          toggleDrawerOpen={toggleDrawer}
          loadTransition={loadTransition}
          leftSidebar={false}
        />
      </Fragment>
    );
  }
}

RightSidebarLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  router: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  titleException: PropTypes.array.isRequired,
  handleOpenGuide: PropTypes.func.isRequired,
};

export default withRouter(
  withStyles(styles)(RightSidebarLayout)
);
