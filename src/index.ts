// import ReactDOM from 'react-dom';
import * as React from 'react';
// import * as ReactDOMClient from 'react-dom/client';
import * as ReactDOM from 'react-dom';
import * as ReactDOMServer from 'react-dom/server';
import * as htmlToImage from 'html-to-image';

import { DownloadConfig } from './models';
import { setCSSStyling } from "./utils/css-creator";
import { downloadFile } from './download-file';

// let root:any = undefined;

const convertToImage = async (downloadConfig: DownloadConfig) => {
    const component = document.getElementById('download-comp') as HTMLElement;
    const REACT_MAJOR_VERSION = React.version.split('.')[0];

    console.log('React: ',REACT_MAJOR_VERSION);

      const {
        type,
        componentToConvert,
        filename,
        stylings,
        hideComponentFromView,
        callbacks,
        usesInnerPlugin,
      } = downloadConfig;
    
    const useInnerPlugin = usesInnerPlugin || false;

    console.log(React.version)
    try {
        if (!component)
        throw new NoTagFoundForImageGeneration(
          'No tag found for the generation'
        );

        setCSSStyling(stylings, component, hideComponentFromView);

        if (useInnerPlugin) {
  
          // root?.render(componentToConvert);
           // if (root === undefined) {
          //     root = ReactDOMClient.createRoot(component);
          //   }
           ReactDOM.render(componentToConvert, component);
        } else {
          const staticElement =
            ReactDOMServer.renderToStaticMarkup(componentToConvert);
          component.innerHTML = `${staticElement}`;
        }

        const fontEmbed = await htmlToImage.getFontEmbedCSS(component);
        await downloadFile(component, type, filename, callbacks, {
          fontEmbedCSS: fontEmbed,
        });
    } finally {
        component.removeAttribute('style');
        component.removeAttribute('aria-hidden');

        ReactDOM.unmountComponentAtNode(component);
        component.innerHTML ='';
        // root.unmount();
        // root = undefined;
    }

}




export default convertToImage;