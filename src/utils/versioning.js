import fs from 'fs';
import crypto from 'crypto';

export const getFileHash = (path, basedOnLength = false) =>
  new Promise((resolve, reject) => {
    const shasum = crypto.createHash('sha256');
    if (basedOnLength) {
      shasum.update(fs.statSync(path).size.toString());
      const hash = shasum.digest('hex');
      resolve(hash);
    } else {
      const stream = fs.ReadStream(path);
      stream.on('data', data => {
        shasum.update(data);
      });
      stream.on('end', () => {
        const hash = shasum.digest('hex');
        resolve(hash);
      });
      stream.on('error', reject);
    }
  });

export const getHashedPath = async (path, basedOnLength) => {
  path = `../public${path}`;
  const hash = await getFileHash(`${path}`, basedOnLength);
  return `${path}?v=${hash}`;
};

export const getHashedPaths = async paths => {
  const promises = [];
  Object.keys(paths).forEach(name => {
    promises.push(async () => {
      const path = await getHashedPath(paths[name]);
      paths[name] = path;
    });
  });
  await Promise.all(promises);
  return paths;
};
