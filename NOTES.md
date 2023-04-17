# Notes

### Hooks

#### General Rules of Hooks

- We must use `use` in the beginning of the components
- Components must be uppercase
- Must be in the function/component body
- Cannot call conditionally

### useState

#### Intro

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

#### useState - Array Examples

This is an example to use array in `useState`

```js
// 3-useState-array.js
import React from 'react';
import { data } from '../../../data';

const UseStateArray = () => {
  const [people, setPeople] = React.useState(data);
  return (
    // <></>: <React.Fragment></React.Fragment>
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

#### useState - Object Examples

Why the content are wiped out when we clicked the button?

```js
// 4-useState-object.js
import React, { useState } from 'react';

const UseStateObject = () => {
  const [person, setPerson] = React.useState({
    name: 'Peter',
    age: 24,
    message: 'random message',
  });

  const changeMessage = () => {
    setPerson('hello world');
  };

  return (
    <>
      <h3>{person.name}</h3>
      <h3>{person.age}</h3>
      <h3>{person.message}</h3>
      <button type="button" className="btn" onClick={changeMessage}>
        change message
      </button>
    </>
  );
};

export default UseStateObject;
```

Because the `hello world` is a string.
But the parameter of `setPerson` is an object.
So it will wipe out all of the contents.

Here is the solution:
Just set the parameter of `setPerson` as an object.

```js
// 4-useState-object.js
import React, { useState } from 'react';

const UseStateObject = () => {
  const [person, setPerson] = React.useState({
    name: 'Peter',
    age: 24,
    message: 'random message',
  });

  const changeMessage = () => {
    setPerson({ message: 'hello world' });
  };

  return (
    <>
      <h3>{person.name}</h3>
      <h3>{person.age}</h3>
      <h3>{person.message}</h3>
      <button type="button" className="btn" onClick={changeMessage}>
        change message
      </button>
    </>
  );
};

export default UseStateObject;
```

❌ But another bad scenario occurs:
We can see the content in the browser only remains the `message`,
the `name` and `age` properties are gone.

Use **separate operator** to fix it:

```js
import React, { useState } from 'react';

const UseStateObject = () => {
  const [person, setPerson] = React.useState({
    name: 'Peter',
    age: 24,
    message: 'random message',
  });

  const changeMessage = () => {
    // Use **separate operator** here
    // which renders the item of person,
    // and we overwrite the `message` item.
    setPerson({ ...person, message: 'hello world' });
  };

  return (
    <>
      <h3>{person.name}</h3>
      <h3>{person.age}</h3>
      <h3>{person.message}</h3>
      <button type="button" className="btn" onClick={changeMessage}>
        change message
      </button>
    </>
  );
};

export default UseStateObject;
```

#### useState - Multiple State Values

Here is the results:

```js
import React, { useState } from 'react';

const UseStateObject = () => {
  const [person, setPerson] = React.useState({
    name: 'Peter',
    age: 24,
    message: 'random message',
  });

  const [name, setName] = React.useState('Mike');
  const [age, setAge] = React.useState('21');
  const [message, setMessage] = React.useState('random message');

  const changeMessage = () => {
    // Use **separate operator** here
    // which renders the item of person,
    // and we overwrite the `message` item.
    // setPerson({ ...person, message: 'hello world' });
    setMessage('hello world');
  };

  return (
    <>
      <h3>{name}</h3>
      <h3>{age}</h3>
      <h3>{message}</h3>
      <button type="button" className="btn" onClick={changeMessage}>
        change message
      </button>
    </>
  );
};

export default UseStateObject;
```

#### Simple Counter

Example:

```js
// 5-useState-counter.js
import React, { useState } from 'react';

const UseStateCounter = () => {
  const [value, setValue] = useState(0);
  const reset = () => {
    setValue(0);
  };

  return (
    <>
      <section style={{ margin: '4rem 0' }}>
        <h2>regular counter</h2>
        <h1>{value}</h1>
        <button className="btn" onClick={() => setValue(value - 1)}>
          decrease
        </button>
        <button className="btn" onClick={reset}>
          reset
        </button>
        <button className="btn" onClick={() => setValue(value + 1)}>
          increase
        </button>
      </section>
    </>
  );
};

export default UseStateCounter;
```

#### Functional Update Form

details in: [State as Snapshot](https://react.dev/learn/state-as-a-snapshot)

So here is a `complexIncrease` function that increase the value by 1.
What do you think if we **click the button for 3 times** ?

```js
import React, { useState } from 'react';

const UseStateCounter = () => {
  const [value, setValue] = useState(0);

  const reset = () => {
    setValue(0);
  };

  const complexIncrease = () => {
    setTimeout(() => {
      setValue(value + 1);
    }, 2000);
  };

  return (
    <>
      <section style={{ margin: '4rem 0' }}>
        <h2>more complex counter</h2>
        <h1>{value}</h1>
        <button className="btn" onClick={complexIncrease}>
          increase later
        </button>
      </section>
    </>
  );
};

export default UseStateCounter;
```

It actually increase **one** time. Why?

Because **setting state only changes it for the next render.** (💥 Super **IMPORTANT** to know)

> I know we've already clicked the `increase later` button so many times.
> But it only changes the state while finished the rendering.
> When we click the button like 10 times, it actually is rendering (but not rendered, right?).

A state variable’s value never changes within a render, even if its event handler’s code is asynchronous.

#### Queueing a Series of State Updates

Consider: Why adding a parameter to `setValue` will make multiple-clicks event works?

```js
import React, { useState } from 'react';

const UseStateCounter = () => {
  const [value, setValue] = useState(0);

  const reset = () => {
    setValue(0);
  };

  const complexIncrease = () => {
    setTimeout(() => {
      setValue(preValue => {
        return preValue + 1;
      });
    }, 2000);
  };

  return (
    <>
      <section style={{ margin: '4rem 0' }}>
        <h2>regular counter</h2>
        <h1>{value}</h1>
        <button className="btn" onClick={() => setValue(value - 1)}>
          decrease
        </button>
        <button className="btn" onClick={reset}>
          reset
        </button>
        <button className="btn" onClick={() => setValue(value + 1)}>
          increase
        </button>
      </section>

      <section style={{ margin: '4rem 0' }}>
        <h2>more complex counter</h2>
        <h1>{value}</h1>
        <button className="btn" onClick={complexIncrease}>
          increase later
        </button>
      </section>
    </>
  );
};

export default UseStateCounter;
```
