# Datamole JavaScript assignment

This repository contains a response to your assignment developed by [Mark Collis](mark@markcollis.dev).

## Installation and use

**Copy your data folder into the project root**, the data is not included in this repository.

```
npm install
npm run build
npm run serve
```

Browse to http://localhost:8080. Additional notes and comments are displayed in the right panel within the assignments.

## Notes

Assignments 1, 2 and 4 are complete. Assignment 3 is still in progress.

To provide support for IE11 I have set Typescript to target ES5 and added IE-specific prefixed grid styles. This may not be sufficient, additional testing using IE would be necessary before it could be released to users.

I have used the following packages:
* typescript, webpack, associated loaders and type definitions (build)
* webpack-dev-server (local preview)
* react, react-dom (UI)
* react-vis (visualisations, React wrapper for D3)
