export const hmrSetup = (hotModule) => {
  if (DEVELOPMENT) {
    console.log('Running app in development mode')
    require('webpack-hot-middleware/client?noInfo=true')
    if (hotModule) hotModule.accept();
  }
}
export const hmrComponent = (component) => {
  if (DEVELOPMENT) {
    const reactHotLoader = require('react-hot-loader/root')
    return reactHotLoader.hot(component)
  }
  return component
}

export default {
  hmrSetup,
  hmrComponent
}