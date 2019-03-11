import fs from 'fs';
import crypto from 'crypto';

export const getFileHash = (path, basedOnLength = false) =>
  new Promise((resolve, reject) => {
    const shasum = crypto.createHash('sha256');
    if (basedOnLength) {
      shasum.update(fs.statSync(path).size.toString());
      const hash = shasum.digest('hex');
      resolve(hash)
    } else {
      const stream = fs.ReadStream(path);
      stream.on('data', (data) => { shasum.update(data); });
      stream.on('end', () => {
        const hash = shasum.digest('hex');
        resolve(hash)
      });
      stream.on('error', reject);
    }
  })

export const getHashedPath = (path, basedOnLength) =>
  new Promise((resolve, reject) => {
    getFileHash(`${path}`, basedOnLength).then((hash) => {
      resolve(`${path}?v=${hash}`)
    }).catch(reject)
  })

export const getHashedPaths = (paths) => new Promise((resolve, reject) => {
  const promises = []
  Object.keys(paths).forEach((name) => {
    promises.push(getHashedPath(paths[name]).then((path) => paths[name] = path))
  });
  Promise.all(promises).then(resolve(paths)).catch(reject)
})
