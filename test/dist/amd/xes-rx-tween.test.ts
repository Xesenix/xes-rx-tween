import { integrationSuit } from '../../utils/integration';

integrationSuit('amd', () => {
	let scope: any;

	beforeEach(() => {
		scope = {};
		// mock AMD define
		(global as any).define = (name: string, deps: string[], factory: Function) => {
			// console.log('mock define', { name, deps, factory });
			scope[name] = new Promise(async (resolve) => {
				const depsResolved = await Promise.all(deps.map(async (mod) => require(mod)));
				resolve(factory(...depsResolved));
			});
		};
	});

	test('should export tweenObservable function', async () => {

		await require('../../../dist/amd/xes-rx-tween');

		const promise = scope['xes-rx-tween'];

		expect(promise).toBeDefined();

		const { tweenObservable } = await promise;

		expect(tweenObservable).toBeDefined();
		expect(typeof tweenObservable).toEqual('function');
		// expect(tweenObservable.name).toEqual('tweenObservable');
	});
});
