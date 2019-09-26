import {
	animationFrameScheduler,
	TeardownLogic,
	Observable,
	Subscriber,
	Subscription
} from "rxjs";
import { map } from "rxjs/operators";

interface IScheduler {
	now(): number;
	schedule(
		work: (state: any) => void,
		delay?: number,
		state?: any
	): Subscription;
}

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
	 * @param {IScheduler} [scheduler=animationFrameScheduler]
	 * @memberof TweenObservable
	 */
	constructor(
		protected duration: number,
		private scheduler: IScheduler | null = animationFrameScheduler
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
		duration: number = 1000,
		start: number = 0,
		end: number = 1,
		scheduler: IScheduler | null = animationFrameScheduler
	) {
		return new TweenObservable(duration, scheduler).pipe(
			map(v => start + (end - start) * v)
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

	public _subscribe(subscriber: Subscriber<number>): TeardownLogic {
		if (this.scheduler) {
			return this.scheduler.schedule(TweenObservable.dispatch, 0, {
				startTime: this.scheduler.now(),
				duration: this.duration,
				scheduler: this.scheduler,
				subscriber
			});
		}
		subscriber.next(1);
		subscriber.complete();
	}
}
