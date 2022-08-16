import { setCSSStyling } from "../../src/utils/css-creator";


describe('[UTILS] css-creator', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
  
    it('set with default values (hiding component)', ()=> {
      const testComponent = document.createElement("div");
      testComponent.innerText = "This is a test";
      setCSSStyling(undefined,testComponent);

      expect(testComponent.style).toMatchObject({
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: '-5'
      })
    });
});  