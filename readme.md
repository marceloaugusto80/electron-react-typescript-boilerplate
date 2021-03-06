## Electron / React / Typescript boilerplate project
![](./.github/project-logo-400.jpg) 


#### Template project for desktop apps using [Electron](https://electronjs.org/), [React](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/).

---
<br>
<br>

# Before anything
As always, install packages:
```
npm install
```


# During development

Run:
```
npm start
```
It will launch webpack dev server and electron [concurrently](https://www.npmjs.com/package/concurrently).
It has [fast refresh](https://www.npmjs.com/package/react-refresh-webpack-plugin) (AKA hot-reload) enabled by default.

# Testing
Run:
```
npm test
```
This templated uses [Jest](https://jestjs.io/) (along with [Ts-Jest](https://www.npmjs.com/package/ts-jest)) as testing framework.

# Deploy
Just run:
```
npm run pack
```
and the output will be in the ```./pack``` folder.

