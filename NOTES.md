# Notes

### Hooks

#### General Rules of Hooks

- We must use `use` in the beginning of the components
- Components must be uppercase
- Must be in the function/component body
- Cannot call conditionally

#### useState

##### Intro

> We do you think while we are pressing the button?
>
> Will the title variable in JSX be changed?

```js
// 1-error-example.js
import React from 'react';

const ErrorExample = () => {
  let title = 'Random Title';

  const handleClick = () => {
    title = 'hello the fucking world';
    console.log('yeah');
  };

  return (
    <React.Fragment>
      {/* Do you think the `title` here will be change? */}
      <h2>{title}</h2>
      <button type="button" className="btn" onClick={handleClick}>
        change title
      </button>
    </React.Fragment>
  );
};

export default ErrorExample;
```

```js
// App.js
import React from 'react';
import Setup from './tutorial/1-useState/setup/1-error-example';

function App() {
  return (
    <div className="container">
      <Setup />
    </div>
  );
}

export default App;
```

Actually, nothing's happened. WHY?

- We've changed the value, but we are not re-rendering the component.
- We have no way to preserve the value `hello the fucking world` of `title` in between renders as well.

So, here are two things that we want:

1. We want to keep the values between the renders
2. And we also want to trigger the re-render

**Here is the scenario where `useState` comes into play**

```js
// 2-useState-basics.js
// `useState` is a named export (remember adding the curly braces)
import React, { useState } from 'react';

const UseStateBasics = () => {
  console.log(useState());
  return <h2>useState basic example</h2>;
};

export default UseStateBasics;
```

We can see the log in browser that it returned an array `[undefined, f]`

- `first parm`: the state value that we're going to use
- `second parm`: the function that controls the value (setter function)

We can see the example:

```js
// 2-useState-basics.js
// `useState` is a named export (remember adding the curly braces)
import React, { useState } from 'react';

const UseStateBasics = () => {
  console.log(useState('hello world'));
  // If we want to access the data of array:
  // set `1` as the default value here
  const value = useState(1)[0];
  const handler = useState(1)[1];
  console.log(value, handler);

  return <h2>useState basic example</h2>;
};

export default UseStateBasics;
```

And we can set variable of `useState()`

```js
const [text, setText] = useState('random title');
```

> Here is name convention:
> if the value is `text`, and we will set the `setText` as the function name here

Here is the finished example

```js
// 2-useState-basics.js
import React, { useState } from 'react';

const UseStateBasics = () => {
  const [text, setText] = useState('random title');
  // The only argument to useState is the initial value of our state variable.
  // In this example, the text's initial value is set to 'random title' with useState('random title').

  const handleClick = () => {
    // It depends on what the text value that we are going to change.
    // We changed it into 'hello world' here.
    // Just need to add 'hello world' into the `(` and `)`
    text === 'random title' ? setText('hello world') : setText('random title');
  };

  return (
    <React.Fragment>
      <h2>{text}</h2>
      <button type="button" className="btn" onClick={handleClick}>
        change title
      </button>
    </React.Fragment>
  );
};

export default UseStateBasics;
```

##### useState - Array Examples

This is an example to use array in `useState`

```js
import React from 'react';
import { data } from '../../../data';

const UseStateArray = () => {
  const [people, setPeople] = React.useState(data);
  return (
    <>
      {people.map(person => {
        const { id, name } = person;
        return (
          <div key={id} className="item">
            <h4>{name}</h4>
          </div>
        );
      })}
    </>
  );
};

export default UseStateArray;
```
