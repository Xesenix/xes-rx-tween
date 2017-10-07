[![Build Status](https://travis-ci.org/Xesenix/xes-rx-tween.svg?branch=master)](https://travis-ci.org/Xesenix/xes-rx-tween)
[![Coverage Status](https://coveralls.io/repos/github/Xesenix/xes-rx-tween/badge.svg?branch=master)](https://coveralls.io/github/Xesenix/xes-rx-tween?branch=master)
# Observable Tween with Rxjs

[![Greenkeeper badge](https://badges.greenkeeper.io/Xesenix/xes-rx-tween.svg)](https://greenkeeper.io/)

This library supplies you with observable for tweening over numbers.

# Usage

## Install

```bash
npm i xes-rx-tween
```

## Basic usage example:

```js
import { TweenObservable } from 'xes-rx-tween';

TweenObservable.create(2000, 0, 100).subscribe((interpolationValue) => {
	// do some stuff with interpolationValue for example
	object.x = interpolationValue;
})
```

You also can do some more stuff with tweened value for example use some tweening functions on them:

```js
import { TweenObservable } from 'xes-rx-tween';

const easingFunction = (x) => Math.sin(x * Math.PI);

TweenObservable.create(2000, 1, 1.5)
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
