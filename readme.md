# Bug for Express / Graphql Yoga / Compression

## Steps to reproduce
- Clone this repo
- Run `yarn install`
- Run `yarn start`
- Open `http://localhost:3000/graphql` in your browser

if you comment out the `app.use(compression())` line in `index.ts` the error will go away.

The error is and it happened on version 3.2.0 and 3.2.1 ( if yo downgrade to 3.1.2 it works fine )
```
TypeError [ERR_INVALID_ARG_TYPE]: The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received type function ([Function (anonymous)])
    at new NodeError (node:internal/errors:400:5)
    at Function.from (node:buffer:324:9)
    at toBuffer (/node_modules/compression/index.js:286:14)
    at ServerResponse.end (/node_modules/compression/index.js:115:22)
    at /node_modules/@whatwg-node/server/index.js:150:28
    at new Promise (<anonymous>)
    at sendNodeResponse (/node_modules/@whatwg-node/server/index.js:142:12)
    at requestListener (/node_modules/@whatwg-node/server/index.js:219:19)
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  code: 'ERR_INVALID_ARG_TYPE'
}

```