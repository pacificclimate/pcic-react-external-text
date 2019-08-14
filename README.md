# pcic-react-external-text

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe pcic-react-external-text here.

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

1. Finally, to use Enzyme, we must install and configure it.

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

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
