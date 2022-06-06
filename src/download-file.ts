import * as HTMLToImage from 'html-to-image';
// import { isValidImage, getFilename } from './utils';
// import { InvalidImageGenerateException } from './invalid-generated-img.exception';
import * as FileSaver from 'file-saver';
import { Options } from 'html-to-image/lib/options';
import { InvalidImageGenerateException } from './exceptions/invalid-generated-img.exception';
import { isValidImage, getFilename } from './utils/utils';

const imageGeneratorMap = {
  jpeg: async (component: any, config: Options | undefined) => {
    return await HTMLToImage.toJpeg(component, config);
  },
  jpg: async (component: any, config: Options | undefined) => {
    return await HTMLToImage.toJpeg(component, config);
  },
  png: async (component: any, config: Options | undefined) => {
    return await HTMLToImage.toPng(component, config);
  },
  svg: async (component: any, config: Options | undefined) => {
    return await HTMLToImage.toSvg(component, config);
  },
};

export async function downloadFile(
  component: any,
  type = 'jpeg',
  filename?: string,
  callbacks?: any,
  config?: any,
) {
  const imageURL = await imageGeneratorMap[type](component, config);
  if (!isValidImage(imageURL))
    throw new InvalidImageGenerateException(
      `Failure to convert component to ${filename}.${type}`,
    );

  if (callbacks && callbacks.beforeDownload) callbacks.beforeDownload();

  FileSaver.saveAs(imageURL, getFilename(type, filename));

  if (callbacks && callbacks.afterDownload) callbacks.afterDownload();
}
