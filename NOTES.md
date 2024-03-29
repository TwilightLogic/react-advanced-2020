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

### Conditional Rendering

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

#### Short Circuit

It's not about React, but all about JavaScript

```js
import React, { useState } from 'react';
// short-circuit evaluation
// ternary operator

const ShortCircuit = () => {
  const [text, setText] = useState('');
  const firstValue = text || 'hello world';
  const secondValue = text && 'hello world';

  return (
    <>
      {/* <h1>{firstValue}</h1>
      <h1>Value: {secondValue}</h1> */}
      {/* ❌ if () {console.log("hello world!")} */}

      <h1>{text || 'Lucas Law'}</h1>
      {/* We can use `&&` to display or hide the elements or components */}
      {text && <h1>Hello World</h1>}
    </>
  );
};

export default ShortCircuit;
```

#### Show and Hide a component

```js
import React, { useState, useEffect } from 'react';

const ShowHide = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="btn" onClick={() => setShow(!show)}>
        show/hide
      </button>
      {show && <Item />}
    </>
  );
};

const Item = () => {
  const [size, setSize] = useState(window.innerWidth);

  const checkSize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', checkSize);
    // cleanup function
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, []);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h1>window</h1>
      <h2>size: {size} px</h2>
    </div>
  );
};

export default ShowHide;
```

### Forms

#### Form - Basics

> ##### Why do we use `<label>`?
>
> Typically, you will place every `<input>` inside a `<label>` tag.
> This tells the browser that this label is associated with that input.
> When the user clicks the label, the browser will automatically focus the input.
> It’s also essential for accessibility: a screen reader will announce the label caption when the user focuses the associated input.

```js
import React, { useState } from 'react';

const ControlledInputs = () => {
  const handleSubmit = e => {
    // `e.preventDefault()` We can see the 'hello world' that without refreshing the page.
    e.preventDefault();
    console.log('Hello World');
  };
  return (
    <>
      <article>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="firstName">Name : </label>
            <input type="text" id="firstName" name="firstName" />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email : </label>
            <input type="text" id="email" name="email" />
          </div>
          <button type="submit" onClick={handleSubmit}>
            add person
          </button>
        </form>
      </article>
    </>
  );
};

export default ControlledInputs;
```

#### Controlled - Inputs

Let's think about how to connect the inputs in to our state? (how to access data of inputs that user input?)

Now here is the example that we connect the inputs into state:

```js
import React, { useState } from 'react';
// JS
// const input = document.getElementById('myText');
// const inputValue = input.value
// React
// value, onChange

const ControlledInputs = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    // `e.preventDefault()` We can see the 'hello world' that without refreshing the page.
    e.preventDefault();
    console.log('Hello World');
  };
  return (
    <>
      <article>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="firstName">Name : </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email : </label>
            <input type="text" id="email" name="email" value={email} />
          </div>
          <button type="submit" onClick={handleSubmit}>
            add person
          </button>
        </form>
      </article>
    </>
  );
};

export default ControlledInputs;
```

#### Add Items to the List

```js
import React, { useState } from 'react';
// JS
// const input = document.getElementById('myText');
// const inputValue = input.value
// React
// value, onChange

const ControlledInputs = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [people, setPeople] = useState([]);

  const handleSubmit = e => {
    // `e.preventDefault()` We can see the 'hello world' that without refreshing the page.
    e.preventDefault();

    // If the values are not empty, we will add a person to the `people` state
    if (firstName && email) {
      // const person = { firstName: firstName, email: email };
      // We can use ES6 features (shorthands way)
      // CHEAT: Setting date as id
      const person = { id: new Date().getTime().toString(), firstName, email };
      // WOW I like this coding style ⬇️
      setPeople(people => {
        return [...people, person];
      });
      // We will reset the inputs after setting people
      setFirstName('');
      setEmail('');
    } else {
      console.log('empty values');
    }
  };
  return (
    <>
      <article>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="firstName">Name : </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email : </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            add person
          </button>
        </form>
        {people.map(person => {
          const { id, firstName, email } = person;
          return (
            <div className="item" key={id}>
              <h4>{firstName}</h4>
              <p>{email}</p>
            </div>
          );
        })}
      </article>
    </>
  );
};

export default ControlledInputs;
```

#### Multiple - Inputs

We refractor the code.

As above of the code, there 4 `state` definitions in our component.

We want to keep code dry and cleaned.

> The notes are nested in code block.

```js
import React, { useState } from 'react';
// JS
// const input = document.getElementById('myText');
// const inputValue = input.value
// React
// value, onChange
// dynamic object keys

const ControlledInputs = () => {
  const [person, setPerson] = useState({ firstName: '', email: '', age: '' });
  const [people, setPeople] = useState([]);

  // Change the value(firstName, email, age) of state while user is changing the inputs
  const handleChange = e => {
    const name = e.target.name; // Set the `name` in `<input>` as the 'key'
    const value = e.target.value; // Set the `value` in `<input>` as the 'value'

    // https://react.dev/learn/updating-objects-in-state
    // 👉🏻 Using spread syntax to keep the previous values for all other fields.
    setPerson({
      ...person, // Copy other fields
      [name]: value, // Dynamically set the specific key
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Fields are not empty!
    if (person.firstName && person.email && person.age) {
      const newPerson = { ...person, id: new Date().getTime().toString() };
      setPeople([...people, newPerson]);
      // And remember to set `person` as an empty state
      setPerson({ firstName: '', email: '', age: '' });
    }
  };

  return (
    <>
      <article>
        <form className="form">
          <div className="form-control">
            <label htmlFor="firstName">Name : </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={person.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              name="email"
              value={person.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="age">Age : </label>
            <input
              type="text"
              id="age"
              name="age"
              value={person.age}
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            add person
          </button>
        </form>
        {people.map((person, index) => {
          const { id, firstName, email, age } = person;
          return (
            <div className="item" key={id}>
              <h4>{firstName}</h4>
              <p>{age}</p>
              <p>{email}</p>
            </div>
          );
        })}
      </article>
    </>
  );
};

export default ControlledInputs;
```

### useRef

**When to use `useRef`?**

- When we want a component to “remember” some information, but we don’t want that information to trigger new renders, we can use a ref.

> **`useRef` features**
>
> 1. preserves value
> 2. DOES NOT trigger re-render
> 3. target DOM nodes/elements

Here is the example:

```js
import React, { useEffect, useRef } from 'react';

const UseRefBasics = () => {
  const refContainer = useRef(null);
  const divContainer = useRef(null);

  // `useEffect` dose not trigger the re-renders
  useEffect(() => {
    console.log(refContainer.current);
    refContainer.current.focus();
  });

  const handleSubmit = e => {
    e.preventDefault();
    console.log(refContainer.current.value);
    console.log(divContainer.current);
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        {/* Now the `refContainer.current` is a node `<input type="text" />` while we set `ref={refContainer} */}
        <input type="text" ref={refContainer} />
        <button type="submit">submit</button>
      </form>
      <div ref={divContainer}>hello the fucking world</div>
    </>
  );
};

export default UseRefBasics;
```

### useReducer

#### useReducer - Intro

Why do we use **`useReducer`**?

- Sometimes there are many states to be updated spread across in many event handlers in our components that will get the code very overwhelming.
- For solving these kind of cases, we will consolidate all the **state update logic outside our component in a single function**, called a _reducer_.

When do we use **`useReducer`**?

Here are some scenarios where we might use useReducer:

1. Managing state with complex or deeply nested data structures: useReducer can be useful when we need to update state based on multiple sub-values or when we need to perform more complex operations on the state data.
2. Handling state transitions that depend on previous state: useReducer allows us to handle state transitions that depend on the current state in a more consistent and predictable way.
3. Managing multiple actions with a single reducer: If we have multiple actions that can modify the same state, we can use useReducer to manage all of these actions with a single reducer function, which can simplify our code and make it easier to reason about.
4. Improving performance by avoiding unnecessary re-renders: In some cases, using useReducer instead of useState can improve performance by avoiding unnecessary re-renders of components that are subscribed to the state updates.

We are using `useState` here for coming up with the `useReducer`

```js
// index.js

import React, { useState, useReducer } from 'react';
import Modal from './Modal';
import { data } from '../../../data';
// reducer function

const Index = () => {
  const [name, setName] = useState('');
  const [people, setPeople] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();

    if (name) {
      setShowModal(true);
      setPeople([...people, { id: new Date().getTime().toString(), name }]);
      setName('');
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {/* &&: For showing the component */}
      {showModal && <Modal />}
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <button type="submit">add </button>
      </form>
      {people.map(person => {
        return (
          <div key={person.id}>
            <h4>{person.name}</h4>
          </div>
        );
      })}
    </>
  );
};

export default Index;
```

#### useReducer - Refractor

Examples from [React.dev](https://react.dev/learn/extracting-state-logic-into-a-reducer)

Reducers are a different way to handle state. We can migrate from `useState` to `useReducer` in three steps:

**1. Move from setting state to dispatching actions.**

> **Note**
> Dispatching Actions
>
> - Instead of telling React “what to do” by setting state, we specify "what the user just did" by dispatching "actions" from your event handlers.
> - The object in `dispatch` is called an "action"
>
> ```js
> function handleDeleteTask(taskId) {
>   dispatch({
>     // "action" object:
>     type: 'deleted', // Choose a name that says what happened!
>     id: taskId,
>   });
> }
> ```

> **Note**
> This `dispatch()` function will tell the `reducer()` what is the type that we are going to operate with our state. And `dispatch()` will forward 2 params to `reducer()` which one is `type` and another one is `payload`(data)

**2. Write a reducer function.**

> **Note**
>
> - A reducer function is where we will put our state logic. It takes two arguments, the **current state** and the **action object**, and it returns next state.
> - React will set the state to what you return from the reducer.

```js
function yourReducer(state, action) {
  // return next state for React to set
}
```

**3. Use the reducer from your component.**

We added items as a list here

```js
import React, { useState, useReducer } from 'react';
import Modal from './Modal';
import { data } from '../../../data';

// 1. Determine the initial state:
const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: '',
};

// 2. Create the reducer function
const reducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const newPeople = [...state.people, action.payload];
    return {
      ...state,
      people: newPeople,
      isModalOpen: true,
      modalContent: 'Item added',
    };
  }
  // We still wanna return our state here
  if (action.type === 'NO_VALUE') {
    return {
      ...state,
      isModalOpen: true,
      modalContent: 'Please enter value',
    };
  }
  throw new Error('no matching action type');
};

const Index = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    // 3. Dispatch actions to update state
    if (name) {
      // We have `setName()` to assign the e.target.value to name
      const newItem = { id: new Date().getTime().toString(), name };
      // Name convention
      dispatch({ type: 'ADD_ITEM', payload: newItem });
      setName('');
    } else {
      dispatch({ type: 'NO_VALUE' });
    }
  };

  return (
    <>
      {state.isModalOpen && <Modal modalContent={state.modalContent} />}
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <button type="submit">add </button>
      </form>
      {state.people.map(person => {
        return (
          <div key={person.id}>
            <h4>{person.name}</h4>
          </div>
        );
      })}
    </>
  );
};

export default Index;
```

> **✨ Recap**
>
> 1. Determine the initial state: Before using useReducer, we need to determine the initial state of our component. This should be an object that represents the starting values of all the state variables we need to manage.
> 2. Create the reducer function: The reducer function takes in the current state and an action object and returns the new state. It's important to keep the reducer function pure, meaning it should not modify the original state object, but instead return a new object that represents the updated state.
> 3. Dispatch actions to update state: Once we have the reducer function and initial state, we can use the useReducer hook to create a state object and a dispatch function. We can use the dispatch function to send action objects to the reducer function, which will update the state accordingly.
> 4. Use the state object in our component: We can then use the state object to render our component based on the current state. We can also pass the dispatch function down to child components as needed.

### Prop Drilling

It refers to the process of passing data down through multiple layers of components in a component tree by passing props explicitly to each intermediate component, even if some of them don't actually need the data.

Ok this is the scenario.

Look at this example, if we are going to pass the `removePerson` function to `SinglePerson` component, what we are going to do?

We are going to set props over and over again, right? (This is the "prop drilling")

```js
import React, { useState } from 'react';
import { data } from '../../../data';

// more components
// fix - context api, redux (for more complex cases)

const PropDrilling = () => {
  const [people, setPeople] = useState(data);
  const removePerson = id => {
    setPeople(people => {
      return people.filter(people => people.id !== id);
    });
  };
  return (
    <section>
      <h3>prop drilling</h3>
      <List people={people} removePerson={removePerson} />
    </section>
  );
};

const List = ({ people, removePerson }) => {
  return (
    <>
      {people.map(person => {
        return (
          <SinglePerson
            key={person.id}
            {...person}
            removePerson={removePerson}
          />
        );
      })}
    </>
  );
};

const SinglePerson = ({ id, name, removePerson }) => {
  return (
    <div className="item">
      <h4>{name}</h4>
      <button onClick={() => removePerson(id)}>remove</button>
    </div>
  );
};

export default PropDrilling;
```

### useContext

useContext is a hook that allows components to consume data from a context without having to pass it down through intermediate components in the component tree.

In other words, useContext provides a way for a component to access data or functionality that has been defined in a higher-level component, without having to pass it down as a prop through every intermediate component.

Here is the example that we refractor the code above

```js
import React, { useState, useContext } from 'react';
import { data } from '../../../data';
// more components
// fix - context api, redux (for more complex cases)

const PersonContext = React.createContext();
// two components - Provider, Consumer

// `ContextAPI` is our parent component
const ContextAPI = () => {
  const [people, setPeople] = useState(data);
  const removePerson = id => {
    setPeople(people => {
      return people.filter(person => person.id !== id);
    });
  };
  return (
    // `PersonContext.Provider` component is for providing the context data to its children.
    <PersonContext.Provider value={{ removePerson, people }}>
      <h3>Context API / useContext</h3>
      <List />
    </PersonContext.Provider>
  );
};

const List = () => {
  // It is for a child component to retrieve the data ({removePerson, people})
  const mainData = useContext(PersonContext);
  console.log(mainData);

  return (
    <>
      {mainData.people.map(person => {
        return <SinglePerson key={person.id} {...person} />;
      })}
    </>
  );
};

const SinglePerson = ({ id, name }) => {
  const { removePerson } = useContext(PersonContext);
  console.log(data);
  return (
    <div className="item">
      <h4>{name}</h4>
      <button onClick={() => removePerson(id)}>remove</button>
    </div>
  );
};

export default ContextAPI;
```

Using useContext can make your code more concise and easier to read, as it eliminates the need to pass data through multiple levels of components. However, it should be used judiciously, as using too many contexts can make your code harder to understand and maintain.

### Custom Hooks - useFetch

It is the example to fetch a url

```js
// 1-fetch-example.js
import React, { useState, useEffect } from 'react';
import { useFetch } from './2-useFetch';

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/javascript-store-products';

const Example = () => {
  const { loading, products } = useFetch(url);
  console.log(products);

  return (
    <div>
      <h2>{loading ? 'loading...' : 'data'}</h2>
    </div>
  );
};

export default Example;
```

Here is our customized hook - `useFetch`

```js
import { useState, useEffect } from 'react';

// Custom hook
export const useFetch = url => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch(url);
    const products = await response.json();
    setProducts(products);
    setLoading(false);
  };

  // Call the `useEffect` when to `url` changed
  useEffect(() => {
    getProducts();
  }, [url]);

  return { loading, products };
};
```

### PropTypes

Think about a scenario:

```js
import React from 'react';

const Product = ({ image, name, price }) => {
  return (
    <article className="product">
      <img src={image.url} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
    </article>
  );
};

export default Product;
```

This is a `product.js` which fetched the data from API.
BUT, what if the API missing some properties here? (like image source, price or sth).
We will get a big fat error from our project.

How do we fix it?

1. Use `PropTypes` provided by React (deprecated from React-v15):

```js
import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ image, name, price }) => {
  console.log(image, name, price);
  return (
    <article className="product">
      <h4>single product</h4>
      {/* <img src={image.url} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p> */}
    </article>
  );
};

Product.propTypes = {
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Product;
```

2. We can also use `defaultProps` to fix it:

```js
import React from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../../../assets/default-image.jpeg';

const Product = ({ image, name, price }) => {
  console.log(image, name, price);
  return (
    <article className="product">
      <h4>single product</h4>
      <img src={image.url} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
    </article>
  );
};

Product.defaultProps = {
  name: 'default name',
  price: 3.99,
  image: { url: defaultImage },
};

export default Product;
```

### React Router

#### Intro

React Router is a popular routing library for React applications that allows you to handle URLs in your application and render the appropriate UI components based on the URL. It makes developing Single Page Applications (SPAs) easier because it allows you to dynamically render components without refreshing the entire page while keeping the URL in sync.

#### Basics Setup

```js
import React from 'react';
// react router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// pages
import Home from './Home';
import About from './About';
import People from './People';
import Error from './Error';
import Person from './Person';
// navbar
import Navbar from './Navbar';
const ReactRouterSetup = () => {
  return (
    <Router>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/people">
        <People />
      </Route>
    </Router>
  );
};

export default ReactRouterSetup;
```

It changed the website after we set the different path in url.

It generated some issues.
The home page will always be rendered because of its path "/".

We should use `exact` key word nested in `<Route exact path="/">` to avoid the multiple-rendering.

We add `Switch` component here

- `Switch` components **render only the first matching <Route> component**.

```js
import React from 'react';
// react router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// pages
import Home from './Home';
import About from './About';
import People from './People';
import Error from './Error';
import Person from './Person';
// navbar
import Navbar from './Navbar';
const ReactRouterSetup = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/people">
          <People />
        </Route>
        {/* STAR*: means it will always match */}
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};

export default ReactRouterSetup;
```

We can also make a navbar for linking them with different paths.

1. We add `<Navbar />` component in our `index.js`

```js
import React from 'react';
// react router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// pages
import Home from './Home';
import About from './About';
import People from './People';
import Error from './Error';
import Person from './Person';
// navbar
import Navbar from './Navbar';
const ReactRouterSetup = () => {
  return (
    <Router>
      <Navbar />
      {/* `Switch` render only the first matching <Route> component.  */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/people">
          <People />
        </Route>
        {/* STAR*: means it will always match */}
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};

export default ReactRouterSetup;
```

2. set the `<Link>` components in `<Navbar />`

```js import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/people">People</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
```

#### Url Params and Placeholder

Now we can add each corresponding links to the people that rendered in people page by using `<Link to>` component.

> ##### We explain more details here:
>
> **BEHIND THE SCENES:**
>
> - We add `<Route path="/person/:id" children={<Person />}></Route>` in `index.js`,
> - which means that display the children page while we accessing the path `/person/:id`.
> - `:id` refers to a **dynamic parameter**. Don't get it wrong.
>
> **IN THE VIEWS:**
>
> - We made the `id` as a dynamic value in a link `/person/${person.id}` of `People.js` which
>   takes the `person.id` forwarding from `people.map()` method.
> - As we click one of the person of `People` component, it directs to the `Person` component
>   (person page).

Now if we click the person that rendered in people page,
it should direct the corresponding url and display the name.

```js
import React, { useState, useEffect } from 'react';
import { data } from '../../../data';
import { Link, useParams } from 'react-router-dom';

const Person = () => {
  const [name, setName] = useState('default name');
  const { id } = useParams();

  useEffect(() => {
    const newPerson = data.find(person => person.id === parseInt(id));
    setName(newPerson.name);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default Person;
```

### Performance Optimization

#### useMemo

useMemo is a hook provided by React that allows us to optimize the performance of our React application by memoizing the value of a function or computation. Memoization is the process of storing the result of a function call so that future calls to that function with the same input will return the cached result rather than computing the result again.

When we use useMemo, we pass in a function and a dependency array. React will call the function and memoize the result. The next time the component renders, React will check the dependency array to see if any of the values have changed. If none of the values have changed, React will return the memoized value instead of recomputing the result.

Here is an example:

Think about some logics here:

- After you finished the `calculateMostExpensive` function
- Think about it:
- Actually we don't really want to re-call the function again an again
- which because of the changed variable `products`.
- We are going to re-call the function while the most expensive value is changing.
- But where dose the value come from? (from the global variable `products`)
- So we are going to fix the problem that use the `useMemo`

```js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useFetch } from '../../9-custom-hooks/final/2-useFetch';

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/javascript-store-products';
const calculateMostExpensive = data => {
  console.log(data);

  // The most expensive value
  return (
    data.reduce((total, item) => {
      const price = item.fields.price;
      if (price > total) {
        total = price;
      }
      return total;
    }, 0) / 100
  );
};

// REMEMBER: every time props or state changes, component re-renders

const Index = () => {
  const { products } = useFetch(url);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState(0);

  const addToCart = useCallback(() => {
    console.log(cart);
    setCart(cart + 1);
  }, [cart]);

  // `useMemo` returns the values that the first param of `useMemo` returns
  const mostExpensive = useMemo(
    () => calculateMostExpensive(products),
    [products]
  );

  return (
    <>
      <h1>Count : {count}</h1>
      <button className="btn" onClick={() => setCount(count + 1)}>
        click me
      </button>
      <h1 style={{ marginTop: '3rem' }}>cart : {cart}</h1>
      <h1>Most expensive : ${mostExpensive}</h1>
      <BigList products={products} addToCart={addToCart} />
    </>
  );
};

const BigList = React.memo(({ products, addToCart }) => {
  useEffect(() => {
    console.log('big list called');
  });
  return (
    <section className="products">
      {products.map(product => {
        return (
          <SingleProduct
            key={product.id}
            {...product}
            addToCart={addToCart}
          ></SingleProduct>
        );
      })}
    </section>
  );
});

const SingleProduct = ({ fields, addToCart }) => {
  useEffect(() => {
    console.log('Single item called!');
  });

  let { name, price } = fields;
  price = price / 100;
  const image = fields.image[0].url;

  return (
    <article className="product">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <button onClick={addToCart}>add to cart</button>
    </article>
  );
};

export default Index;
```

> **Note**
>
> - `reduce()` takes TWO params(callback-function, initial-value)
> - `callback-function` takes FOUR params(accumulator, current value, index, array)
> - `callback-function` returns the `accumulator`
> - '0': is the initial value for `accumulator` (`accumulator` is `total` here)

#### useCallback

useCallback is a hook in React that is used to memoize a function so that it is not re-created every time the component re-renders. This can help improve performance by reducing unnecessary re-renders.

When a function is passed down to a child component as a prop, the child component will re-render every time the parent component re-renders, even if the function itself has not changed. This can be inefficient if the function is expensive to create or if it causes the child component to unnecessarily re-render.

useCallback solves this problem by memoizing the function, which means that the function is only re-created when its dependencies change. The dependencies are specified as the second argument to useCallback, and can be any values that the function depends on. If the dependencies have not changed since the last time the function was called, then the memoized function is returned instead of creating a new function.

Notice that only call `Single item called!` while we changed the `cart` state:

```js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useFetch } from '../../9-custom-hooks/final/2-useFetch';

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/javascript-store-products';

// REMEMBER: every time props or state changes, component re-renders

const Index = () => {
  const { products } = useFetch(url);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState(0);

  const addToCart = useCallback(() => {
    console.log(cart);
    setCart(cart + 1);
  }, [cart]);

  return (
    <>
      <h1>Count : {count}</h1>
      <button className="btn" onClick={() => setCount(count + 1)}>
        click me
      </button>
      <h1 style={{ marginTop: '3rem' }}>cart: {cart}</h1>
      <BigList products={products} addToCart={addToCart} />
    </>
  );
};

const BigList = React.memo(({ products, addToCart }) => {
  useEffect(() => {
    console.log('big list called');
  });
  return (
    <section className="products">
      {products.map(product => {
        return (
          <SingleProduct
            key={product.id}
            {...product}
            addToCart={addToCart}
          ></SingleProduct>
        );
      })}
    </section>
  );
});

const SingleProduct = ({ fields, addToCart }) => {
  useEffect(() => {
    // Will be called 12 times.
    // Because the `cart` state will be changed while we clicked the button
    // REMEMBER: every time props or state changes, component re-renders
    // We can fix that by using `useCallback`

    console.log('Single item called!');
  });

  let { name, price } = fields;
  price = price / 100;
  const image = fields.image[0].url;

  return (
    <article className="product">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <button onClick={addToCart}>add to cart</button>
    </article>
  );
};

export default Index;
```
