# SuperCell 2.0.0 - Build 2016


SuperCell Build 2016 is a simple boilerplate for Node, Gulp and ES6+ React apps. 

## CHANGELOG
 > v2.0.0, May 24, 2017     
  > - Updated react-router to v4, hashHistory on by default.
  > - Updated outdated packages to current versions.
  > - Modified src folder and file structure.

## Install Packages

After cloning the project to your computer run the following command in your terminal to install all required node packages.

    sudo npm install

The first time you run gulp the build may take a little longer as it compiles and builds out the "public/css" and "public/js" folders and files.

## Running App
This build system can be run in two modes: development and production.  Use development when you are developing your app.  In this mode your JS will not be minified, React will include all its warnings and your CSS will contain sourcemaps to the original SCSS files.  When you are ready to deploy you can start the app in production mode which will turn off React warnings, uglify your JS, and turn off sourcemaps for both JS and CSS.

    npm run dev  (starts app in development mode)  
    npm run build (starts app in production mode)


## Features

- ES6+ with Babel.  Use all the new niffty ES6+ features and transpile down to ES5.
- Browserify: JSX transforms, ES6 modules.
- React Ready!
- Uglify: minification.
- BrowserSync.
- Sass / flexbox ready (IE10+), layout for everygreen browsers.

## How to use

Precompiled JS and SCSS files are in the src folder and compile to public.  All other files including HTML, image etc. are in public.  BrowserSync runs from public and serves as the "Dist" folder for client-side apps.

## To Do
- add express server and gulp proxy to run react-router's BrowserRouter.
- update layout to match dustDevil.