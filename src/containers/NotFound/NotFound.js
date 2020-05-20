import React from 'react';
import { Helmet } from 'react-helmet';
import { ErrorWrap } from '@components';

const title = ' - Page Not Found';
const description = '';

const NotFound = (props) => {
  if (props.staticContext) {
    props.staticContext.status = 404; // eslint-disable-line
  }
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <ErrorWrap title="404" desc="Página no encontrada :(" />
    </div>
  )
}
export default NotFound;
