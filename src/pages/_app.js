import React from 'react'
import App from 'next/app'
import ReactDOM from "react-dom";
import 'src/styles/layout/base.scss';

import { Router } from 'next/router'
import withRedux from 'next-redux-wrapper';
import { Provider } from "react-redux";
import configureStore from 'src/redux/configureStore';
import ThemeWrapper, { AppContext } from 'src/containers/App/ThemeWrapper'
import PageChange from '@components/Loading/PageChange'

Router.events.on("routeChangeStart", url => {
	console.log(`Loading: ${url}`);
	document.body.classList.add("body-page-transition");
	ReactDOM.render(
		<PageChange path={url} />,
		document.getElementById("page-transition")
	);
});
Router.events.on("routeChangeComplete", () => {
	ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
	document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
	ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
	document.body.classList.remove("body-page-transition");
});

class Application extends App {
	// static async getInitialProps({ Component, ctx }) {
	// 	let pageProps = {};
	// 	if (Component.getInitialProps) {
	// 		pageProps = await Component.getInitialProps(ctx);
	// 	}
	// 	return { pageProps };
	// }

	componentDidMount() {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}

	render() {
		const { Component, store, pageProps } = this.props;
		return (
			<Provider store={store}>
				<ThemeWrapper>
					<AppContext.Consumer>
						{changeMode => (
							<Component {...pageProps} changeMode={changeMode} />
						)}
					</AppContext.Consumer>
				</ThemeWrapper>
			</Provider>
		)
	}
}

export default withRedux(configureStore)(Application);