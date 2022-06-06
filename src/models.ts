export type FileType = 'jpeg' | 'jpg' | 'png' | 'svg';

/**
 * object with the configuration values to render and download any React component
 */
export interface DownloadConfig {
  /**
   * The component to download an image of
   * @
   */
  componentToConvert: JSX.Element;

  /**
   * String enum identifying the file type
   * @enum 'jpeg' | 'jpg' | 'png' | 'svg'
   */
  type: FileType;

  /**
   * Determine if component should be visible to users on screen.
   * If true, adds it to the highest level (or uses the passed zIndex)
   * else add to the next lowest level to hide
   *
   * If true the component is rendered at the lowest possible level
   * else at the highest possible level
   *
   * @default true
   */
  hideComponentFromView?: boolean;

  /**
   * additional styling to the canvas that the image is generated in
   * the default stylings applied to the component base is the following: 
   * ```
   *  position: 'absolute',
      top: '0',
      left: '0',
      display: 'flex',
      justifyContent: 'center',
   * ```
   * when additional styling is passed, it will merge and/or replace the styling listed above
   */
  stylings?: Partial<CSSStyleDeclaration>;

  /**
   * Expected file name to give generated file
   * If not passed, it will use the system configured values
   * e.g. `download_47229992.jpeg`
   */
  filename?: string;

  /**
   * Object with before and after callback functions to happen before and after the download phase of the file respectively.
   */
  callbacks?: {
    beforeDownload: () => void;
    afterDownload: () => void;
  };

  /**
   * If true, the passed component will render component so the inner plugins can run
   * else the html is returned for rendering
   */
  usesInnerPlugin?: boolean;
}
