class NoTagFoundForImageGeneration extends Error {
    constructor(msg: string) {
      super(msg);
  
      Object.setPrototypeOf(this, NoTagFoundForImageGeneration.prototype);
    }
  }