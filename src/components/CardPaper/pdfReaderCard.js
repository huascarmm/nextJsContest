import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { withStyles } from '@material-ui/core/styles';

import {
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Divider
} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
  cardWrapper: {
    maxWidth: 820,
    width: '100%',
    padding: '10px',
    marginBottom: theme.spacing(3)
  },
  cardContent: { width: '100%', overflowX: 'auto' },
  [theme.breakpoints.down('xs')]: {
    botones: {
      flexDirection: 'column'
    }
  }
});

class PdfReaderCard extends Component {
  state = { numPages: null, pageNumber: 1 };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () => this.setState(state => ({ pageNumber: state.pageNumber - 1 }));

  goToNextPage = () => this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  render() {
    const { pageNumber, numPages } = this.state;
    const { fileUrl, classes } = this.props;
    return (
      <Grid container justify="center">
        <Card className={classes.cardWrapper} raised>
          <CardContent>
            <div className={classes.cardContent}>
              <Document
                file={fileUrl}
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} width={750} />
              </Document>
            </div>
          </CardContent>
          <Divider />
          <CardActions>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              className={classes.botones}
            >
              <div>
                Página
                {' '}
                <b>{pageNumber}</b>
                {' '}
de
                {' '}
                <b>{numPages}</b>
              </div>
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.goToPrevPage}
                >
                  Previa
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.goToNextPage}
                >
                  Siguiente
                </Button>
              </div>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

PdfReaderCard.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(PdfReaderCard);
