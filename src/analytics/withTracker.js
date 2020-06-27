import React, { Component } from 'react';

import VersaTag from './VersaTag';
import ga from './ga';

const withTracker = WrappedComponent =>
  class extends Component {
    componentDidMount() {
      // eslint-disable-next-line react/destructuring-assignment
      const { pathname, search } = this.props.location;
      // needs to wait for react helmet (which is a child) to run before sending page as it won't have the title added in most cases until after helmet renders (unless page is hit directly and response is from server)
      setTimeout(() => {
        if (pathname) ga.send('pageview', pathname + search);
      }, 0);
    }

    componentWillReceiveProps(nextProps) {
      // eslint-disable-next-line react/destructuring-assignment
      const currentPage = this.props.location.pathname + this.props.location.search;
      const nextPage = nextProps.location.pathname + nextProps.location.search;
      if (currentPage !== nextPage) {
        // needs to wait for react helmet (which is a child) to run before sending page as it won't have the title added in most cases until after helmet renders (unless page is hit directly and response is from server)
        setTimeout(() => {
          ga.send('pageview', nextPage);
        }, 0);
      }
    }

    render() {
      const {
        location: { pathname, search },
      } = this.props;
      return (
        <>
          {/* add search and pathname params in so React.memo VersaTag component reruns every time either one changes */}
          <VersaTag search={search} pathname={pathname} />
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };

export default withTracker;
