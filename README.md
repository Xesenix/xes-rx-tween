[![Build Status](https://travis-ci.org/Xesenix/xes-rx-tween.svg?branch=master)](https://travis-ci.org/Xesenix/xes-rx-tween)
[![Coverage Status](https://coveralls.io/repos/github/Xesenix/xes-rx-tween/badge.svg?branch=master)](https://coveralls.io/github/Xesenix/xes-rx-tween?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/Xesenix/xes-rx-tween.svg)](https://greenkeeper.io/)
[![bitHound Overall Score](https://www.bithound.io/github/Xesenix/xes-rx-tween/badges/score.svg)](https://www.bithound.io/github/Xesenix/xes-rx-tween)
[![Known Vulnerabilities](https://snyk.io/test/github/xesenix/xes-rx-tween/badge.svg)](https://snyk.io/test/github/xesenix/xes-rx-tween)

# Observable Tween with Rxjs


This library supplies you with observable for tweening over numbers.

# Usage

## Install

```bash
npm i xes-rx-tween
```

## Basic usage example:

```js
import { tweenObservable } from 'xes-rx-tween';

tweenObservable(2000, 0, 100)
	.subscribe((interpolationValue) => {
		// do some stuff with interpolationValue for example
		object.x = interpolationValue;
	})
```

You also can do some more stuff with tweened value for example use some tweening functions on them:

```js
import { tweenObservable } from 'xes-rx-tween';

const easingFunction = (x) => Math.sin(x * Math.PI);

tweenObservable(2000, 1, 1.5)
	.map(easingFunction)
	.subscribe((interpolationValue) => {
		// do some stuff with interpolationValue for example
		object.scale = interpolationValue;
	})
```

## Tests

Single run

```bash
npm run test
```

Watch mode

```bash
npm run test:watch
```
