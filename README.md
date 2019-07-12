# Template App

A simple template app for building React web applications running on a Node server.

## Getting started

### Installation :

```
$ npm install
```

### Start the app :

```
$ npm run dev
```

```dev``` script starts Node server and run webpack using the config file provided.

## React

```index.tsx``` renders the app container ```<App />``` React component, and creates a ```<BrowserRouter />```.

## Webpack

**Webpack config enables :**

🚀 Compilation* for TypeScript and Sass files.

👓 Source mapping for debug.

🔥 Hot Module Replacement.

\**Core app scripts are compiled separately with vendor scripts, such as node modules.*

## Node

```boot.js``` runs webpack, enabling Hot Module Replacement and starts Node server.
