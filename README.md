# pcic-react-external-text

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

## Purpose

This package enables an application to externalize part or all of its text content
in what is known in some circles (e.g., Java, .Net) as a resource file.
Instead of being literally included in the source of the application,
text resources (from a one-word label to a phrase to an entire page of help)
are referred to indirectly by an identifier (e.g., `app.name`), and
rendered using the `ExternalText` component. What is rendered depends on the
content of the resource file. This decouples maintenance of the text
from maintenance of the app that uses it, and also simplifies reusing the
same text in different places in an app.

For convenience, the content of an item in the resource file can be
(and by default is) interpreted as Markdown and rendered into React
elements (which are always HTML elements).
This is the most common usage.

For other uses an item in the resource file can also be interpreted and rendered 
as a plain string (no Markdown interpretation).

Because texts in applications frequently need to include variable data from
the app, external texts are treated as JavaScript template literals, and
are evaluated in the context of an optional user-provided dictionary of
data values. For example, an external text may be the string
`You have ${num} messages.`. The app can provide a dictionary containing 
a value for `num` which is interpolated into the rendered text.

To further support modularization of texts, elements of the external text
source itself can be referred to within an external text string, courtesy
of the automatically provided context variable `$$`. For example, the text
`This application is called ${$$.app.name}` includes content of the the
item at path `app.name` in its rendering (e.g., the rendered text might
be `This application is called Climate Explorer`). Such self-reference
can be nested indefinitely deep.

This module is not too far from an internationalization (i18n) package,
but is considerably simpler and lighter-weight. It also provides
Markdown interpretation (which admittedly could be wrapped around an i18n
package).

## Installation

Depends on whether we actually publish to npm. If so:

```
npm install pcic-react-external-text
```

To install directly from GitHub:

```
npm install git+https://git@github.com/pacificclimate/pcic-react-external-text.git#<version>
```

## Demo

To run the package demo:

```shell script
npm install
npm start
```

After `npm start` you should see:

```text
Compiled successfully in 2099 ms.

The app is running at http://localhost:3000/
```

Browse to `localhost:3000` and you should see a React app that shows  page of text created via 
`pcic-react-external-text`.

## Usage

1. Prepare an external texts file. (This is usually done in parallel with
application development.) This file can be in any format, but ultimately
the user must convert the external texts file to a JS object which is loaded
into the external texts `Provider` (see below for details).

1. Set up loading of the external texts file. A typical pattern is to code
this file in YAML, place it in a static resources folder, and use a loader
that requests the file over HTTP and converts the file contents from YAML
to a JS object.

   YAML is particularly well suited to this use case because newlines are significant
in Markdown, and YAML handles newlines nicely (via the `|` marker).

   Loading a package over HTTP from a static resources folder permits "hot updates"
of the external text by replacing (only) the external text file in the folder. 
This is often preferred to going through a full application release cycle just 
to make minor changes to the text content of an app.

   The following function uses the `axios` and `js-yaml` packages to
construct such a loader:

    ```js
    import axios from 'axios';
    import yaml from 'js-yaml';
    
    function makeYamlLoader(url) {
      // Returns a function that can be used as the callback argument `loadTexts`
      // to `ExternalTexts.Provider`. It issues an HTTP GET to `url`; treats
      // the result as a YAML file, converting it to a JS object; then calls its
      // argument `setTexts` with the resulting object. Any error thrown during
      // this process is logged to the console (and `setTexts` is not called).
      return function (setTexts) {
        axios.get(url, { responseType: 'text' })
        .then(response => response.data)
        .then(yaml.safeLoad)
        .then(setTexts)
        .catch(error => {
          console.error(error);
        })
        ;
      };
    }
    ```

1. Wrap the app (or other high-level component) in `ExternalText.Provider`.
This provides the external text source to all `ExternalText` components
through React's context API.

   ```
   import ExternalText from 'path/to/external-text';
   ...
   const loadTexts =
     makeYamlLoader('http://example.org/app/static/texts.yaml');
   ...
   <ExternalText.Provider loadTexts={loadTexts}>
     <App />
   </ExternalText.Provider>
   ```
3. In `App` or any component rendered by it, use `ExternalText`.

   ```
   import T from 'path/to/external-text';
   ...
   <div>
     <T path='path.to.item'/>
     <T path='path.to.another.item'/>
   </div>
   ```
   
    Note the abbreviation of `ExternalTexts` to `T` above. 
    This significantly reduces the typing and visual load in the code.

## API

`pcic-react-external-text` exports the following key objects:

* `ExternalText` (default): React component
* `Provider`: React component
* `get`: function

It also exports several other objects (mainly to expose for testing)
which should not be regarded as stable parts of the API.

### `<ExternalText>`

This component renders an external text (source texts provided through
the React context API via `ExternalText.Provider`) selected by `path`,
using the data context `data` and rendered according to `as`.
See function `get` for more details.

Supporting components and functions are both exported by the module
and added as properties of `ExternalText`.

##### Import

`import ExternalText from 'pcic-react-external-text'`

##### Props

Name | Type | Default | Description
---- | ---- | ------- | -----------
`path` | string | | Path (JS standard notation) selecting text item from source texts.
`data` | object | | Data context in which to evaluate item's text as JS template literal.
`as`   | <code>'raw' &#124; 'string' &#124; 'markdown'</code> | `'markdown'` | How to render the item's text.

### `<Provider>`

Data provider for component `ExternalText`, which accesses this data via the React context API.
An app that wishes to use external texts should wrap its highest-level component with `Provider`.

This component packages up the state management needed for asynchronous loading of texts,
e.g., via a HTTP request. Any application wishing to do this would have to create the equivalent
of this component.

This component performs two tasks:

- loads the source data into this component's state
- wraps its children in a React context provider whose value is set
from the source data

##### Import

`import { Provider } from 'pcic-react-external-text'`

Also available through default export as `ExternalText.Provider`.

##### Props

Name | Type | Default | Description
---- | ---- | ------- | -----------
`defaultTexts` | object | `null` | Default or initial data source.
`loadTexts` | function | `undefined` | Callback for loading data asynchronously. 

Callback `loadTexts` is fired when `Provider` is mounted. 
It is called with a single argument, `setTexts`, which is a function that takes a single argument `texts`
and sets the dynamic texts state and propagates it through the context API.

A typical asynchronous loader (for YAML files), suitable as a value for `loadTexts` is returned by the following 
function:

```js
import axios from 'axios';
import yaml from 'js-yaml';

function makeYamlLoader(url) {
  // Returns a function that can be used as the callback argument `loadTexts`
  // to `ExternalTexts.Provider`. It issues an HTTP GET to `url`; treats
  // the result as a YAML file, converting it to a JS object; then calls its
  // argument `setTexts` with the resulting object. Any error thrown during
  // this process is logged to the console (and `setTexts` is not called).
  return function (setTexts) {
    axios.get(url, { responseType: 'text' })
    .then(response => response.data)
    .then(yaml.safeLoad)
    .then(setTexts)
    .catch(error => {
      console.error(error);
    })
    ;
  };
}
```

### `get(texts, path, data, as)`

Gets the object selected by `path` from `texts` and maps
a function that (optionally) evaluates and renders as Markdown
over all strings in the object's leaf (non-object) members.

Argument `as` controls what function (identity, evaluation as a template
literal, or evaluation and rendering as Markdown) is applied to each
leaf member. The values 'raw', 'string', and 'markdown', respectively,
correspond to these mappings.

Component `ExternalText` simply invokes this function on its context
and props. The simplest case is when `path` selects a single string
and it returns a single rendered React element.

This function is exposed so that more complicated use can
be made of it; for example to provide non-component props to a component
(or, equivalently, non-component arguments to a function). 

These are relatively rare and sophisticated use cases, and 
should be used only if there is no simpler way to accomplish the goal
using `<ExternalText/>` elements. For example, if `'path.to.array'`
selects an array of items from `texts`, then prefer this

```
<div>
 <ExternalText path='path.to.array' />
</div>
```

over this equivalent but unnecessarily complicated code

```
<div>
 { ExternalText.get(this.context, 'path.to.array') }
</div>
```
##### Import

`import { get } from 'pcic-react-external-text'`

Also available through default export as `ExternalText.get`.

##### Arguments

Name | Type | Default | Description
---- | ---- | ------- | -----------
`texts` | object | | Source of raw texts.
`path` | string | | Path (JS standard notation) selecting text item from source texts.
`data` | object | `{}` | Data context in which to evaluate item's text as JS template literal.
`as`   | <code>'raw' &#124; 'string' &#124; 'markdown'</code> | `'string'` | How to render the item's text. (See above.)

Note both the similarity of these arguments to the props of component `ExternalText`, and the differences,
largely in their default values.


## Development toolchain and configuration

### nwb

This codebase was created with with [nwb](https://github.com/insin/nwb),
a toolchain that React [recommends](https://reactjs.org/docs/create-a-new-react-app.html#more-flexible-toolchains)
for publishing react components for npm, which is our goal.

The code repository was kicked off with

```shell script
nwb new react-component pcic-react-external-text 
```

We configured this project to create all optional builds (ES modules, UMD).

See [Developing React Components and Libraries with nwb](https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md#developing-react-components-and-libraries-with-nwb)
for more information.

### Building and publishing

nwb does most of the building and publishing work for us. 
See [nwb docs](https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md#building-and-publishing)
for details.

However, we wish, at least in the interim, to install packages directly from GitHub,
and that requires one extra step: 
**After running `npm run build` to prepare the package for publishing,
we must also commit the changes to the `lib/` directory to GitHub.**

### Testing framework

The nwb toolchain comes with a default testing setup that uses Karma to run tests written with Mocha and Expect in the 
headless PhantomJS browser. These are all good things, but our standard React development testing
setup uses Jest and Enzyme, and we don't want to proliferate frameworks where we don't have to.

Setting up an nwb project to use Jest and Enzyme turns out to be fairly straightforward, but not trivial. 
There is an [outdated tutorial](https://medium.com/@sumn2u/configuring-different-testing-library-in-nwb-for-react-7cd2804b4f7c) 
on doing this that is best ignored.

**IMPORTANT**: Tutorials and examples go out of date relatively fast in this ecosystem.
It is critical to use compatible versions of React, Jest, Enzyme, Babel, and the related presets, plugins, 
and packages that connect and configure them. If you do not, errors occur that are essentially impossible to resolve. 
It is best to follow the instructions for the exact versions of the tools you are using.
It is also in general best to 
use the most up-to-date releases (in particular, as of this writing, React 16, Jest 24, Enzyme 3, Babel 7) of your
tools. Regular upgrading, though sometimes burdensome, pays off in the not-so-very-long run.

The following information should serve as a template for other projects wishing to configure an nwb project
to use Jest and Enzyme:

1. Install Jest:

    ```
    npm install --save-dev jest 
    ```
   
    Revise test scripts in `package.json` to run Jest:

    ```json
    "scripts": {
      ...,
      "test": "jest",
      "test:coverage": "jest --coverage",
      "test:watch": "jest --watch"
    }
    ```
   
   References:
   * [Jest: Getting Started](https://jestjs.io/docs/en/getting-started)
   * [Jest CLI Options](https://jestjs.io/docs/en/cli)
   
1. At this point we can write and run tests coded in plain ES5 Javascript, but not ES6 or JSX (React).

1. For ES6 and JSX we need to install Babel, the Babel Jest plugin, and configure Babel to use them. 
We also need to install and configure a Babel preset to process JSX (`@babel/preset-react`).

    ```
    npm install --save-dev babel-jest @babel/core @babel/preset-env @babel/preset-react
    ``` 
   
    Add the following `babel.config.js` file:
    
    ```js
    module.exports = {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
        '@babel/preset-react'
      ],
    };
    ```
   
    References: 
    * [Using Babel](https://jestjs.io/docs/en/getting-started.html#using-babel)
    * [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react/)

1. To use Enzyme, we must install and configure it.

    ```
    npm install --save-dev enzyme enzyme-adapter-react-16
    ```
   
    Configuration has two parts. First, in `package.json` (or, in a separate `jest.config.js` file):
    
    ```json
    ...,
    "jest": {
      "setupFilesAfterEnv": ["<rootDir>/setupTests.js"]
    }
    ```
   
   Then, add the file `setupTests.js`:
   
   ```js
    import Enzyme from 'enzyme';
    import Adapter from 'enzyme-adapter-react-16';
    
    Enzyme.configure({ adapter: new Adapter() });
    ```
   
    References:
    * [Enzyme](https://airbnb.io/enzyme/)
    * [Using enzyme with Jest](https://airbnb.io/enzyme/docs/guides/jest.html#using-enzyme-with-jest)
    
1. We also wish to use some advanced JavaScript syntax in the tests, for which we install and configure 
the following Babel plugins.

    ```
    npm install --save-dev @babel/plugin-proposal-class-properties
    ```
   
    In `babel.config.js`:
   
    ```js
    plugins: ["@babel/plugin-proposal-class-properties"]
    ```

[build-badge]: https://img.shields.io/travis/pacificclimate/pcic-react-external-text/master.png?style=flat-square
[build]: https://travis-ci.org/pacificclimate/pcic-react-external-text

[npm-badge]: https://img.shields.io/npm/v/pcic-react-external-text.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/pacificclimate/pcic-react-external-text/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/pacificclimate/pcic-react-external-text
