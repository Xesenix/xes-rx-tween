import { animationFrameScheduler, Observable, Subscriber, SchedulerLike } from "rxjs";
import { map } from "rxjs/operators";

/**
 * Emits interpolated values between `start` and `end` over `duration` period of time.
 * Default scheduler uses requestAnimationFrame.
 */
export function tweenObservable(
	duration: number = 1000,
	start: number = 0,
	end: number = 1,
	scheduler: SchedulerLike | null = animationFrameScheduler
) {
	return new Observable((subscriber: Subscriber<number>) => {
		if (scheduler) {
			return scheduler.schedule(
				function (state) {
					if (state) {
						const { duration, startTime, scheduler, subscriber } = state;
						const delta = scheduler.now() - startTime;

						if (delta > duration) {
							subscriber.next(1);
							subscriber.complete();
						} else {
							subscriber.next(delta / duration);
							this.schedule(state);
						}
					}
				},
				0,
				{
					startTime: scheduler.now(),
					duration: duration,
					scheduler,
					subscriber,
				}
			);
		}

		subscriber.next(1);
		subscriber.complete();
	}).pipe(map((v) => start + (end - start) * v));
}
