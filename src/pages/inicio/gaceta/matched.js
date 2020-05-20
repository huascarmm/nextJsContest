import Dashboard from 'src/containers/Templates/Dashboard'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { getPostAction } from '@actions/MunicipalityDataActions';
import { connect } from 'react-redux';
import injectSaga from '@utils/injectSaga';
import { compose } from 'recompose';
import { PdfReaderCard } from '@components';
import {
  WhatsappShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  TelegramIcon,
  LinkedinIcon,
  FacebookShareCount
} from 'react-share';
import { formatDate } from '@utils/usefull';
import postsSaga from '@redux/sagas/posts';
import { withRouter } from 'next/router';
import { Grid, IconButton, Typography, Paper } from '@material-ui/core';
const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  rootMargin: {
    marginBottom: theme.spacing(3)
  },
  subtitle: {
    marginBottom: theme.spacing(1)
  },
  socialsContainer: {
    display: 'flex',
    margin: '5px'
  },
  socialsItems: {
    margin: '0 5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  rootWrapper: {
    flexDirection: 'row-reverse'
  },
  [theme.breakpoints.down('xs')]: {
    rootWrapper: {
      flexDirection: 'column'
    }
  }
});

class PdfDateIntroLikes extends React.Component {
  componentWillMount() {
    const { getPost, router } = this.props;
    getPost(router.query.publicationId);
  }
  render() {
    const { changeMode, classes, post } = this.props;
    return (
      <Dashboard changeMode={changeMode}>
        <Grid container spacing={4} className={classes.rootWrapper}>
          <Grid item xs={12} md={4}>
            {post.contentPost === undefined ? (
              // <Loading local />
              <div>...Loading</div>
            ) : (
                <React.Fragment>
                  <Paper className={classes.root}>
                    <Grid
                      container
                      alignItems="center"
                      className={classes.tituloSocials}
                      direction="column"
                    >
                      <Typography variant="h5" className={classes.subtitle}>
                        Fecha de publicación:
                  </Typography>
                      {formatDate(new Date(post.datePost))}
                    </Grid>
                  </Paper>
                  <Paper className={classes.root}>
                    <Grid
                      container
                      alignItems="center"
                      className={classes.tituloSocials}
                      direction="column"
                    >
                      <Typography variant="h5" className={classes.subtitle}>
                        Presentación
                  </Typography>
                      <div className={classes.socialsContainer}>
                        <div className={classes.socialsItems}>
                          <FacebookShareButton url={uri2Share}>
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                          <FacebookShareCount url={uri2Share} />
                        </div>
                        <div className={classes.socialsItems}>
                          <WhatsappShareButton url={uri2Share}>
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                        </div>

                        <div className={classes.socialsItems}>
                          <TwitterShareButton url={uri2Share}>
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                        </div>
                        <div className={classes.socialsItems}>
                          <LinkedinShareButton url={uri2Share}>
                            <LinkedinIcon size={32} round />
                          </LinkedinShareButton>
                        </div>
                        <div className={classes.socialsItems}>
                          <EmailShareButton url={uri2Share}>
                            <EmailIcon size={32} round />
                          </EmailShareButton>
                        </div>
                        <div className={classes.socialsItems}>
                          <TelegramShareButton url={uri2Share}>
                            <TelegramIcon size={32} round />
                          </TelegramShareButton>
                        </div>
                      </div>
                    </Grid>

                    <Typography variant="body1">{post.contentPost}</Typography>
                  </Paper>

                  <Paper className={classes.root}>
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      className={classes.tituloSocials}
                    >
                      <IconButton
                        aria-label="Likes to this post"
                        className={classes.button}
                      >
                        <ThumbUpIcon
                          className={post.likesPost > 0 ? classes.liked : ''}
                        />
                        <span className={classes.num}>{post.likesPost}</span>
                      </IconButton>
                      <IconButton aria-label="Dislikes" className={classes.button}>
                        <ThumbDownAltIcon
                          className={post.disLikesPost > 0 ? classes.liked : ''}
                        />
                        <span className={classes.num}>{post.disLikesPost}</span>
                      </IconButton>
                    </Grid>
                  </Paper>
                </React.Fragment>
              )}
          </Grid>
          <Grid item xs={12} md={8}>
            {post.linkFile !== undefined ? (
              <PdfReaderCard fileUrl={post.linkFile} />
            ) : (
                // <Loading local />
                <div>...Loading</div>
              )}
          </Grid>
        </Grid>
      </Dashboard>
    )
  }
}
PdfDateIntroLikes.propTypes = {
  classes: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.getIn(['posts', 'post'])
});

const mapDispatchToProps = dispatch => ({
  getPost: bindActionCreators(getPostAction, dispatch)
});

const withSaga = injectSaga({
  key: 'PdfDateIntroLikes',
  saga: postsSaga
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withRouter(withStyles(styles)(
  compose(
    withSaga,
    withConnect
  )(PdfDateIntroLikes)
));
