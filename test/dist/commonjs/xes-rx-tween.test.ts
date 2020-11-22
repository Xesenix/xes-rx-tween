import { integrationSuit } from '../../utils/integration';

integrationSuit('commonjs', () => {
	it('should export tweenObservable function', async () => {

		const { tweenObservable }: any = await import('../../../dist/commonjs/xes-rx-tween');

		expect(tweenObservable).toBeDefined();
		expect(typeof tweenObservable).toEqual('function');
		// expect(tweenObservable.name).toEqual('tweenObservable');
	});

	it('should export tweenObservable function', async () => {

		const { tweenObservable } = require('../../../dist/commonjs/xes-rx-tween');

		expect(tweenObservable).toBeDefined();
		expect(typeof tweenObservable).toEqual('function');
		// expect(tweenObservable.name).toEqual('tweenObservable');
	});
});
