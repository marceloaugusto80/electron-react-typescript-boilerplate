## Electron / React / Typescript boilerplate project
![](./.github/project-logo-400.jpg) 


#### Template project for desktop apps using:
- [Electron](https://electronjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Styled Components](https://styled-components.com/)
- [Webpack](https://webpack.js.org/)
- [React Fast Refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin)

<br>
<br>

# Before anything
As always, install packages:
```cmd
$ npm install
```


# During development

Run:
```cmd
$ npm start
```
It will launch webpack dev server and electron [concurrently](https://www.npmjs.com/package/concurrently).
It has [fast refresh](https://www.npmjs.com/package/react-refresh-webpack-plugin) (AKA hot-reload) enabled by default.

# Testing
Run:
```cmd
$ npm test
```
This templated uses [Jest](https://jestjs.io/) (along with [Ts-Jest](https://www.npmjs.com/package/ts-jest)) as testing framework.

# Deploy
Just run:
```cmd
$ npm run pack
```
and the output will be in the ```./pack``` folder.

