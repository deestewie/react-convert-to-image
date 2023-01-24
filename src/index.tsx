import React, { useRef } from 'react';
import * as ReactDOM from 'react-dom';
import * as htmlToImage from 'html-to-image';
import * as ReactDOMServer from 'react-dom/server';

import { DownloadConfig } from './models';
import { setCSSStyling } from "./utils/css-creator";
import { downloadFile } from './download-file';


const useConvertToImage = (): {
  downloadElementSnapshot: (downloadConfig: DownloadConfig) => Promise<void>;
} => { 

  const baseImgRef:any = useRef(null);

  const downloadElementSnapshot = async(downloadConfig: DownloadConfig) => {
        const component = document.getElementById('download-comp') as HTMLElement;

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

    // console.log(React.version)
    try {
        if (!component)
        throw new NoTagFoundForImageGeneration(
          'No tag found for the generation'
        );

        setCSSStyling(stylings, component, hideComponentFromView);

        if (useInnerPlugin) {
            const element =  (
              <div className="downloadQRefSection">
                <div ref={baseImgRef} className="downloadQRefSection__qrCodeSection">
                  {componentToConvert}
                </div>
              </div>
            );
          ReactDOM.render(element, component);
        } else {
          const staticElement =
            ReactDOMServer.renderToStaticMarkup(componentToConvert);
            component.innerHTML = `${staticElement}`;
        }

        const fontEmbed = await htmlToImage.getFontEmbedCSS(component);
        await downloadFile(baseImgRef.current ? baseImgRef.current: component, type, filename, callbacks, {
          fontEmbedCSS: fontEmbed,
          quality: 0.98
        });
    } finally {
        component.removeAttribute('style');
        component.removeAttribute('aria-hidden');

        ReactDOM.unmountComponentAtNode(component);
        component.innerHTML ='';
    }
  };

  return {
    downloadElementSnapshot
  }

};

export default useConvertToImage;