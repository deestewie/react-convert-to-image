import * as DownloadFile from "../src/download-file";
import * as HTMLToImage from 'html-to-image';
import * as FileSaver from 'file-saver';
import { downloadFile } from "../src/download-file";
import { InvalidImageGenerateException } from "../src/exceptions/invalid-generated-img.exception";

const mockSaveAs = jest.fn();
const mockConvertImgCall = jest.fn();

describe('[DEFAULT] DownloadFile', () => {
    const testComponent = document.createElement("div");
    testComponent.innerText = "This is a test";
    beforeEach(() => {
      jest.resetAllMocks();
      mockSaveAs.mockReset();
      mockConvertImgCall.mockReset();
      jest.spyOn(FileSaver, 'saveAs').mockImplementation(mockConvertImgCall);
    });

    it('throw exception when Fail', () => {
        mockConvertImgCall.mockImplementationOnce(null);
        jest.spyOn(HTMLToImage, 'toJpeg').mockImplementation(mockConvertImgCall);

        expect(downloadFile(testComponent, 'jpeg')).toThrow(InvalidImageGenerateException);
    });
});