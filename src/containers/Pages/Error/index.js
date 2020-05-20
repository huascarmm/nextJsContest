import React from 'react';
import { Helmet } from 'react-helmet';
// import brand from '@api/dummy/brand';
import { ErrorWrap } from '@components';

const title = ' - Aplication Error';
const description = 'brand.desc';

const Error = (props) => {
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
      <ErrorWrap title="500" desc="Sorry, server goes wrong" />
    </div>
  )
}

export default Error;
