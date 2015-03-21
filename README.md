# ps-if

Angular directive that is a hybrid of ngIf and ngShow.

## What this does

- Starts off like ngIf
- When condition changes it becomes an ngShow
- If timeout is specified, becomes an ngIf again once condition has been false for long enough.

## Usage

### 1. Depend on `ps.if`

browserify users: first do `require('ps-if')`

```js
angular.module('app', ['ps.if']);
```

### 2. Use psIf in places you'd use ngIf or ngShow

```html
<div ps-if="show" ps-cool-down-millis="5000">
  <big-expensive-directive/>
</div>
```

#### ps-if

Angular expression controlling if children are shown or not.

#### ps-cool-down-millis

Optional Angular expression (evaluated once). Once children have been hidden for this many milliseconds, directive acts like ngIf. If omitted, directive will act like ngShow forever.

## Install

`npm install ps-if --save`

or

`bower install ps-if --save`

## License

MIT