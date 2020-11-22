import * as fs from 'fs';
import * as path from 'path';
import { SourceMapConsumer } from 'source-map';

import { integrationSuit } from '../../utils/integration';

integrationSuit('umd', () => {
	const distPath = path.resolve(__dirname, '../../../dist/umd');

	test('should export tweenObservable function', async () => {

		const { tweenObservable } = await import(`${distPath}/xes-rx-tween`);

		expect(tweenObservable).toBeDefined();
		expect(typeof tweenObservable).toEqual('function');
		// expect(tweenObservable.name).toEqual('tweenObservable');
	});

	test('should export tweenObservable function', async () => {

		const { tweenObservable } = require(`${distPath}/xes-rx-tween`);

		expect(tweenObservable).toBeDefined();
		expect(typeof tweenObservable).toEqual('function');
		// expect(tweenObservable.name).toEqual('tweenObservable');
	});

	test('should generate sourcemap', async () => {
		const sourceMapRaw = fs.readFileSync(`${distPath}/main.js.map`, 'utf8');

		expect(sourceMapRaw).toBeDefined();

		const result = await SourceMapConsumer.with(
			sourceMapRaw,
			null,
			(c) => c.originalPositionFor({ line: 1, column: 650 })
		);

		expect(result.source).toEqual('webpack:///src/observable/tween.ts');
	});
});
