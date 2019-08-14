# pcic-react-external-text

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

This package enables text content of an application to be externalized as
what is known in some circles (e.g., Java, .Net) as a resource file.
Instead of being literally included in the source of the application,
text resources (from a one-word label to a phrase to an entire page of help)
are referred to indirectly by an identifier (e.g., 'app.name'), and
rendered using the ExternalText component. What is rendered depends on the
content of the resource file. This decouples maintenance of the text
from maintenance of the app that uses it, and also simplifies reusing the
same text in different places in an app.

For convenience, the content of an item in the resource file can be
(and by default is) interpreted as Markdown and rendered into HTML.
This is the most common usage.

For other uses an item in the resource file can also be interpreted and rendered 
as a simple string.

Because texts in actual applications frequently need to include variable data from
the app, external texts are treated as JavaScript template literals, and
are evaluated in the context of an optional user-provided dictionary of
data values. For example, an external text may be the string
`'You have ${num} messages.'`. The app can provide a dictionary containing 
a value for `num` which is interpolated into the rendered text.

To further support modularization of texts, elements of the external text
source itself can be referred to within an external text string, courtesy
of the automatically provided context variable `$$`. For example, the text
`'This application is called ${$$.app.name}'` includes content of the the
item at path `'app.name'` in its rendering (e.g., the rendered text might
be `'This application is called Climate Explorer'`). Such self-reference
can be nested indefinitely deep.

This module is not too far from an internationalization (i18n) package,
but is considerably simpler and lighter-weight. It also provides
Markdown interpretation (which admittedly could be wrapped around an i18n
package).

## Usage

1. Prepare an external texts file. (This is usually done in parallel with
application development.) This file can be in any format, but ultimately
must be converted to JS object for consumption by `ExternalText`.

1. Set up loading of the external texts file. A typical pattern is to code
this file in YAML, place it in a static resources folder, and use a loader
that requests the file over HTTP and converts the file contents from YAML
to a JS object. `ExternalText` provides a convenience method
`ExternalText.makeYamlLoader` that does just this.

1. Wrap the app (or other high-level component) in `ExternalText.Provider`.
This provides the external text source to all `ExternalText` components
through React's context API.

  ```
   import ExternalText from 'path/to/external-text';
   ...
   const loadTexts =
     ExternalText.makeYamlLoader('http://example.org/app/static/texts.yaml');
   ...
   <ExternalText.Provider loadTexts={loadTexts}>
     <App />
   </ExternalText.Provider>
  ```
3. In `App` or any component rendered by it, use `ExternalText`.

  ```
   import T from 'path/to/external-text';    Note abbreviation
   ...
   <div>
     <T path='path.to.item'/>
     <T path='path.to.another.item'/>
   </div>
  ```

## Development toolchain and configuration

This codebase was kicked off with [nwb](https://github.com/insin/nwb),
a toolchain that React [recommends](https://reactjs.org/docs/create-a-new-react-app.html#more-flexible-toolchains)
for publishing react components for npm, which is our goal.

The nwb toolchain comes with a default testing setup uses Karma to run tests written with Mocha and Expect in the 
headless PhantomJS browser. These are all good things, but our standard React development testing
setup uses Jest and Enzyme, and we don't want to proliferate frameworks where we don't have to.

Setting up an nwb project to use Jest and Enzyme turns out to be fairly straightforward, but not trivial. 
There is an [outdated tutorial](https://medium.com/@sumn2u/configuring-different-testing-library-in-nwb-for-react-7cd2804b4f7c) 
on doing this that is best ignored.

*IMPORTANT*: Tutorials and examples go out of date relatively fast in this ecosystem.
It is critical to use compatible versions of React, Jest, Enzyme, Babel, and the related plugins, presets,
and packages that connect and configure them. If you do not, errors occur that are essentially impossible to resolve. 
It is best always to follow the instructions for the versions of the tools you are using, and in general to 
use the most up-to-date releases (in particular, as of this writing, React 16, Jest 24, Enzyme 3, Babel 7) of your
tools. Regular upgrading, though sometimes burdensome, pays off.

The following information should serve as a template for other projects wishing to configure an nwb project
to use Jest and Enzyme:

1. Install Jest:

    ```
    npm install --save-dev jest 
    ```
   
1. Revise test scripts in `package.json` to run Jest:

    ```json
    "scripts": {
      ...
      "test": "jest",
      "test:coverage": "jest --coverage",
      "test:watch": "jest --watch"
    }
    ```
   
1. At this point you can write and run tests coded in plain ES5 Javascript, but not ES6 or JSX (React).
For ES6 and JSX we need to install Babel, the Babel Jest plugin, and configure Babel to use them. 
We'll also need to install and configure a Babel preset to process JSX (`@babel/preset-react`).

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

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
