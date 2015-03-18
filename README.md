# ps-if

Combines ngIf and ngShow using a timeout to switch between them.

## What this does

- Starts off like ngIf
- When condition changes it acts lke ngShow
- After being hidden for some timeout, becomes an ngIf again

## Usage

### 1. Depend on `ps.if`

```js
angular.module('app', ['ps.if']);
```

### 2. Use psIf in places you'd use ngIf or ngShow

```html
<div ps-if="show" ps-cool-down-millis="5000">
  <span>child</span>
</div>
```

#### ps-if

Angular expression controlling if children are shown or not.

#### ps-cool-down-millis

Angular expression (evaluated once). Once children have been hidden for this many milliseconds, directive acts like ngIf.

## Install



## License

MIT