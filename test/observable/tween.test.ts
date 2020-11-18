import { delay as delayTime } from "rxjs/operators";
import { setTimeout } from "timers";

import { tweenObservable } from "../../src/observable/tween";

// jest.useFakeTimers()

describe("tweenObservable", () => {
	[
		{
			delay: 0,
			duration: 4000,
		},
		{
			delay: 200,
			duration: 1500,
		},
		{
			delay: 0,
			duration: 1000,
		},
		{
			delay: 1000,
			duration: 500,
		},
		{
			delay: 2000,
			duration: 700,
		},
	].forEach(({ delay, duration }) => {
		it(`should end execution after ${
			delay + duration
		}ms including ${delay}ms delay and return growing values between 0 and 1`, (done) => {
			const startTime = Date.now();
			const startValue = 0;
			const endValue = 1;
			let lastValue = startValue;

			const tween = tweenObservable(duration);

			tween.pipe(delayTime(delay)).subscribe(
				(v) => {
					expect(v).toBeGreaterThanOrEqual(lastValue);
					expect(v).toBeLessThanOrEqual(endValue);
					lastValue = v;
				},
				() => {},
				() => {
					const executionTime = Date.now() - startTime;
					expect(lastValue).toEqual(endValue);
					expect(executionTime).toBeGreaterThanOrEqual(delay + duration);
					expect(executionTime).toBeLessThanOrEqual(delay + duration + 30);
					done();
				}
			);
		});
	});

	it("should stop execution on unsubscribe", (done) => {
		const duration = 1000;
		const errorTime = 500;
		const tween = tweenObservable(duration);

		const subscription = tween.subscribe(
			(v) => {},
			() => {
				done.fail(`shouldn't throw error`);
			},
			() => {
				done.fail(`shouldn't complete`);
			}
		);

		setTimeout(() => subscription.unsubscribe(), errorTime);
		setTimeout(done, duration + 100);
	});

	[
		{
			duration: 2000,
			startValue: 0,
			endValue: 1,
		},
		{
			duration: 1500,
			startValue: -10,
			endValue: 1,
		},
		{
			duration: 1000,
			startValue: 10,
			endValue: 100,
		},
		{
			duration: 500,
			startValue: 400,
			endValue: 20,
		},
		{
			duration: 1500,
			startValue: -50,
			endValue: -20,
		},
	].forEach(({ duration, startValue, endValue }) => {
		it(`should end execution after ${duration}ms duration and return values from ${startValue} to ${endValue}`, (done) => {
			const startTime = Date.now();
			let lastValue = startValue;

			const tween = tweenObservable(duration, startValue, endValue);

			tween.subscribe(
				(v) => {
					if (startValue < endValue) {
						expect(v).toBeGreaterThanOrEqual(lastValue);
						expect(v).toBeLessThanOrEqual(endValue);
					} else {
						expect(v).toBeLessThanOrEqual(lastValue);
						expect(v).toBeGreaterThanOrEqual(endValue);
					}
					lastValue = v;
				},
				() => {},
				() => {
					const executionTime = Date.now() - startTime;
					expect(lastValue).toEqual(endValue);
					expect(executionTime).toBeGreaterThanOrEqual(duration);
					expect(executionTime).toBeLessThanOrEqual(duration + 30);
					done();
				}
			);
		});
	});

	it(`should end execution after 1000ms duration and return values from 0 to 1 when no params were provided`, (done) => {
		const startTime = Date.now();
		let lastValue = 0;

		const tween = tweenObservable();

		tween.subscribe(
			(v) => {
				expect(v).toBeGreaterThanOrEqual(lastValue);
				expect(v).toBeLessThanOrEqual(1);

				lastValue = v;
			},
			() => {},
			() => {
				const executionTime = Date.now() - startTime;
				expect(lastValue).toEqual(1);
				expect(executionTime).toBeGreaterThanOrEqual(1000);
				expect(executionTime).toBeLessThanOrEqual(1020);
				done();
			}
		);
	});

	it(`should end execution immediately and return value 1 when null scheduler`, (done) => {
		const startTime = Date.now();
		let lastValue = 0;

		const tween = tweenObservable(1000, 0, 1, null);

		tween.subscribe(
			(v) => {
				expect(v).toBeGreaterThanOrEqual(lastValue);
				expect(v).toBeLessThanOrEqual(1);

				lastValue = v;
			},
			() => {},
			() => {
				const executionTime = Date.now() - startTime;
				expect(lastValue).toEqual(1);
				expect(executionTime).toBeGreaterThanOrEqual(0);
				expect(executionTime).toBeLessThanOrEqual(20);
				done();
			}
		);
	});
});
