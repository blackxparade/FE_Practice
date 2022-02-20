// The Webpack Dev Server uses Express under the hood
module.exports = function DevServerConfig({ publicPath = '/', apiPath = '/' } = {}) {
	return {
		historyApiFallback: { index: publicPath },
		devMiddleware: { publicPath },
		port: 3001,
		static: false,
		/* scaffolding-disable unless keepExamples */
		// Using an external API could be a mock-server or the real thing
		proxy: proxy({
			path: `${withoutOrigin(apiPath)}joke-api`,
			target: 'http://api.icndb.com',
		}),
		/*
		// Opting for a fully self sufficient development experience
		onBeforeSetupMiddleware: setupMockApi({ apiPath }),
		*/
		/* scaffolding-enable */
	};
};

/* scaffolding-disable unless keepExamples */
function proxy({ path, target }) {
	const pathRewrite = { [`^${path}`]: '/' };
	return { [path]: { target, pathRewrite, changeOrigin: true } };
}

/*
// The volume of a local mock server tends to grow rapidly
// If this approach is used, it may be a good idea to extract example endpoints and responses
// somewhere else, eg to a root "/dev" directory.
function setupMockApi({ apiPath }) {
	// A Webpack Dev Sever hook accepts an Express app to tweak in order to make development simpler
	return ({ app }) => {
		// Often a Dev server simply proxies API calls to another host
		app.get(`${apiPath}joke-api/jokes/random`, (_req, res) => res.json({
			type: 'success',
			value: {
				id: 513,
				joke: 'Chuck Norris does not code in cycles, he codes in strikes.',
				categories: ['nerdy'],
			},
		}));
	};
}
*/

function withoutOrigin(path) {
	if (path.startsWith('/')) { return path; }
	const { origin } = new URL(path);
	return path.replace(origin, '');
}
/* scaffolding-enable */
