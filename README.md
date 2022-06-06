# react-convert-to-image

> Plugin to allow the download of React components as html on event trigger with/without preview.

[![NPM](https://img.shields.io/npm/v/react-convert-to-image.svg)](https://www.npmjs.com/package/react-convert-to-image) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
    npm install --save react-convert-to-image
```

```bash
    yarn add react-convert-to-image
```

## Usage

1. Add `<div id="download-comp">` to the index.tsx file of your project e.g.

   ```js
   //... imports here
    import convertToImage from 'react-convert-to-image';

   const app = (
     <>
       // any outer wrappers can be used here
       <App />
       <div id="download-comp"></div>
     </>
   );

   ReactDOM.render(app, document.getElementById('root'));
   serviceWorker.unregister();
   ```

2. Pass the relevant parameters to the downloadSnapshotOfComponentAs

```js
await convertToImage({
  componentToConvert: <MockComponent />,
  type: 'png'
});
```

## License

MIT © [deestewie](https://github.com/deestewie)
