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

**Prerequisites to Know:**

- Typically, this code `setValue(value + 1)` is just replacing the value as `value + 1`.
- BUT, this code `setValue(preValue => {return preValue + 1})` means really something: **it is a way to tell React to “do something with the state value” instead of just replacing it. (Updater function: we can update the same state variable multiple times before the next render)**

**Here is the steps:**

1. `setValue(preValue => {return preValue + 1})`: `return preValue + 1` is a function. React adds it to a queue.
2. If we click the button so many times, it will add the function `return preValue + 1` to a queue one by one (Remember `setTimeout` is an asynchronous function).

### useEffect

more details: [useEffect#usage](https://react.dev/reference/react/useEffect#usage)

#### useEffect - Basics

Why do we use `useEffect`?

- `useEffect` is used when we want to set up side-effect that works out side of the component. (It's like connecting to an external system).

Here is the example that we are going to set the page title <code>document.title = \`New Messages(${value})\`</code> (It is the code that out of React, right?)

```js
import React, { useState, useEffect } from 'react';
// by default runs after every re-render
// cleanup function
// second parameter
const UseEffectBasics = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    console.log('call useEffect');
    document.title = `New Messages(${value})`;
  });

  console.log('render component');
  return (
    <>
      <h2>{value}</h2>
      <button className="btn" onClick={() => setValue(value + 1)}>
        click me
      </button>
    </>
  );
  // We can see 2 times log in our dev tool
  // Because of the `<React.StrictMode></React.StrictMode>`
  // Remove the `<App />` out of the `<React.StrictMode></React.StrictMode>`, and we can see only one log in console
};

export default UseEffectBasics;
```

#### useEffect - Conditional

We cannot nest the `useEffect` in conditional state. `useEffect` has to be in the top level of the code.

```js
import React, { useState, useEffect } from 'react';
const UseEffectBasics = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log('call useEffect');
    if (value > 1) {
      document.title = `New Messages(${value})`;
    }
  });

  console.log('render component');
  return (
    <>
      <h2>{value}</h2>
      <button className="btn" onClick={() => setValue(value + 1)}>
        click me
      </button>
    </>
  );
};

export default UseEffectBasics;
```

#### useEffect - Dependency List

If you want to run the `useEffect` on the initial render (for only once, and it won't call `useEffect` while the `value` changed which triggered the re-render), just need to add an empty array `[]` in the second parameter of `useEffect`.

```js
import React, { useState, useEffect } from 'react';
const UseEffectBasics = () => {
  const [value, setValue] = useState(0);

  // The dependencies list: `value` ⬇️
  // If we change the `value`, it will trigger this `useEffect` one more time.
  useEffect(() => {
    console.log('call useEffect');
    if (value > 1) {
      document.title = `New Messages(${value})`;
    }
  }, [value]);

  // Only call it once when initializing the render
  useEffect(() => {
    console.log('hello useEffect');
  }, []);

  console.log('render component');
  return (
    <>
      <h2>{value}</h2>
      <button className="btn" onClick={() => setValue(value + 1)}>
        click me
      </button>
    </>
  );
};

export default UseEffectBasics;
```

##### So, why do we need `reactive dependencies`? （example from react.dev）

A `list of dependencies` including every value from your component used inside of those functions.

Sometimes, we need to fetch data while using `useEffect`. But the data(reactive value) are out of the `useEffect` function. We can't "choose" the dependencies of our Effect. Every `reactive value` used by our Effect’s code must be declared as a dependency. Our Effect’s dependency list is determined by the surrounding code:

```js
function ChatRoom({ roomId }) {
  // `roomId` is a reactive value
  const [serverUrl, setServerUrl] = useState('https://localhost:1234'); // `serverUrl` is a reactive value too

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // This Effect reads these reactive values
    connection.connect();
    return () => connection.disconnect();
  }, [serverUrl, roomId]); // ✅ So you must specify them as dependencies of your Effect
  // ...
}
```

If either `serverUrl` or `roomId` change, our Effect will reconnect to the chat using the new values.

#### useEffect - Cleanup Function

The cleanup function should **stop or undo** whatever the setup function was doing.

Just like the name implies, the useEffect cleanup is a function in the useEffect Hook that allows us to tidy up our code before our component unmounts. When our code runs and reruns for every render, useEffect also cleans up after itself using the cleanup function.

```js
import React, { useState, useEffect } from 'react';

// cleanup function
// second argument

const UseEffectCleanup = () => {
  const [size, setSize] = useState(window.innerWidth);

  const checkSize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', checkSize);

    // If we don't use cleanup function.
    // We will see bunch of event listeners in 'Elements' of out browser.
    // Cleanup logic should be “symmetrical” to the setup logic (`window.addEventListener` here)
    // , and should stop or undo whatever setup did:
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  });

  return (
    <>
      <h1>Window</h1>
      <h2>{size}</h2>
    </>
  );
};

export default UseEffectCleanup;
```

#### useEffect - Fetching Data

What if we put `setUsers(users)` on `getUsers()` which is in `useEffect` ?

Here is a scenario:

```js
import React, { useState, useEffect } from 'react';

const url = 'https://api.github.com/users';

const UseEffectFetchData = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch(url);
    const users = await response.json();
    // What if we put `setUsers(users)` here?
    // Recap:
    // What is `setUsers()` doing?
    // 1. Preserve the value `users`
    // 2. Triggers re-render
    // So:
    // We `setUsers(users)` here, and update the `users` value.
    // It triggers re-render after updating `users`.
    // After re-render, it will call `getUsers()` again in `useEffect()`
    // Finally, we will get an infinite loop
    // 💡 SOLUTION: add an empty array as dependencies list (Only triggers `useEffect` once when rendering at first time)
    setUsers(users);
    console.log(users);
  };

  // `useEffect` cannot be an async function and returns any `Promises`
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h3>github users</h3>
    </>
  );
};

export default UseEffectFetchData;
```

### Multiple Returns

#### Multiple Returns - Basics

It is just a conditional returns example

```js
import React, { useState, useEffect } from 'react';

const url = 'https://api.github.com/users/QuincyLarson';
const MultipleReturns = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return <h2>multiple returns</h2>;
};

export default MultipleReturns;
```

#### Multiple Returns - Fetching Example

```js
import React, { useState, useEffect } from 'react';

const url = 'https://api.github.com/users/QuincyLarson';

const MultipleReturns = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState('default user');

  // Fetching data
  // Using `then` without `async/await`
  // `Response.json()` Returns Value: ⬇️
  // A Promise that resolves to a JavaScript object.
  // This object could be anything that can be represented by JSON — an object
  // , an array, a string, a number...
  useEffect(() => {
    fetch(url)
      .then(resp => resp.json())
      .then(user => {
        const { login } = user;
        setUser(login);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h2>Error...</h2>
      </div>
    );
  }

  return <h2>{user}</h2>;
};

export default MultipleReturns;
```
