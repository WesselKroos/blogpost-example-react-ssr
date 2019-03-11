
import serialize from "serialize-javascript";
import { getHashedPaths } from '../utils/versioning'

export default (
  initialRender,
  initialState = {}
) => new Promise((resolve, reject) => {
  console.log('Rendering webpage');
  const paths = {
    script: '/assets/client.bundle.js'
  }
  getHashedPaths(paths).then((paths) => resolve(`
<!DOCTYPE html>
<html>
  <head>
    <style>
      html { 
        font-family: sans-serif; 
      }
      ul {
        list-style: none;
        display: flex;
        padding: 0;
        background: #eee;
      }
      li {
        padding: 0;
      }
      a,
      a:hover,
      a:visited {
        display: block;
        padding: 10px;
        color: #05f;
        text-decoration: none;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <script>window.initialState = ${serialize(initialState)};</script>
    <div id="root">${initialRender || ''}</div>
    <script src="${paths.script}" defer async></script>
  </body>
</html>
  `))
})
