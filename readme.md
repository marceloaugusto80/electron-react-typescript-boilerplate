# Electron + React + Fs + Typescript boilerplate project
![](./.github/project-logo-400.jpg) 


#### Template project for desktop apps using [Electron](https://electronjs.org/), [React](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/).

This project enable access to the **file system** through **Node's fs** library.

---
<br>
<br>
<br>

# Before everything
As always, install packages:
```
npm install
```


# During development

As this project uses [react-hot-loader](https://github.com/gaearon/react-hot-loader) during development, we need to launch [webpack-dev-server](https://github.com/webpack/webpack-dev-server) in a process and Electron in another. 
<br>
<br>
So, in the terminal, run:

```
npm run server
```
then, in another terminal instance:
```
npm start
```


# Deploy
Just run:
```
npm run pack
```
and the output will be in the ```./pack``` folder.

