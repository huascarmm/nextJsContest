import React from 'react';
import { Link } from 'server/router.module';

// const NavLinkAdapter = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const LinkAdapter = React.forwardRef((props, ref) => (
  <Link route={props.to} params={props.params}>
    <a {...props} ref={ref} rel="noopener noreferrer">
      {props.children}
    </a>
  </Link>
));

export default LinkAdapter;