export const integrationSuit = (label, cb) => (process.env.INTEGRATION_TEST === 'true')
	? describe(label, cb)
	: xdescribe(label, cb);
