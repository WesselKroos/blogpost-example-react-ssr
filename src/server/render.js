import serialize from 'serialize-javascript';
import { getHashedPaths } from '../utils/versioning';

export default async (initialRender, initialState = {}) => {
  console.log('Rendering webpage');
  let paths = {
    script: '/assets/client.bundle.js'
  };
  paths = await getHashedPaths(paths);

  return `
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
  `;
};
