import { animationFrame } from "rxjs/scheduler/animationFrame";
import { TeardownLogic } from "rxjs/Subscription";
import { IScheduler } from "rxjs/Scheduler";
import { Observable, Subscriber } from "rxjs/Rx";

/**
 * Emits values between 0 and 1 over duration of time.
 * Default scheduler uses requestAnimationFrame.
 *
 * @export
 * @class TweenObservable
 * @extends {Observable<number>}
 */
export class TweenObservable extends Observable<number> {
	/**
	 * Creates an instance of TweenObservable.
	 * @param {number} duration
	 * @param {IScheduler} [scheduler=animationFrame]
	 * @memberof TweenObservable
	 */
	constructor(
		protected duration: number,
		private scheduler: IScheduler = animationFrame
	) {
		super();
	}

	/**
	 * Factory for creating tween observable.
	 * @param {number} duration amount of time in milliseconds needed to finish tween
	 * @param {number} start    start value
	 * @param {number} end      end value
	 */
	static create(
		duration: number,
		start: number = 0,
		end: number = 1,
		scheduler: IScheduler = animationFrame
	) {
		return new TweenObservable(duration, scheduler).map(
			v => start + (end - start) * v
		);
	}

	static dispatch(state: any) {
		const { duration, startTime, scheduler, subscriber } = state;
		const delta = scheduler.now() - startTime;

		if (delta > duration) {
			subscriber.next(1);
			subscriber.complete();
		}

		subscriber.next(delta / duration);

		(this as any).schedule(state);
	}

	protected _subscribe(subscriber: Subscriber<number>): TeardownLogic {
		return this.scheduler.schedule(TweenObservable.dispatch, 0, {
			startTime: this.scheduler.now(),
			duration: this.duration,
			scheduler: this.scheduler,
			subscriber
		});
	}
}
