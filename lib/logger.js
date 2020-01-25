const ora = require('ora');

const logger = {
  stubCount: 0,
  imgCount: 0,
  imgTotal: 0,
  imgDone: 0,
  fileMaxCount: 0,
  fileCounter: 0,
  ora: undefined,
  setStubCount : (count) => {
    logger.stubCount = count;
    logger.imgTotal = logger.imgCount * logger.stubCount;
    logger.print();
  },
  addImageCount: (count) => {
    logger.imgCount += count;
    logger.imgTotal = logger.imgCount * logger.stubCount;
    logger.print();
  },
  stubDone: (i, src) => {
    logger.imgDone++;
    logger.print();
  },
  setFileCount( count) {
    logger.fileMaxCount = count;
  },
  incFileCounter() {
    logger.fileCounter++;
  },

  start: () => {
    logger.done = 0;
    logger.ora = ora({text:'', spinner: {interval: 80, frames: ["[    ]","[=   ]","[==  ]","[=== ]","[ ===]","[  ==]","[   =]","[    ]","[   =]","[  ==]","[ ===]","[====]","[=== ]","[==  ]","[=   ]"]}});
    logger.ora.start();  
  },
  finish: () => {
    if (logger.ora) {
      logger.ora.stop();
      logger.ora = undefined;
    }
  },
  print: ( ) => {
    let a = '';
/*    const used = process.memoryUsage();
    for (let key in used) {
      a = a + `${key} ${(used[key] / 1024 / 1024).toFixed(2)}mb `;
    }
*/
    if (logger.ora) {
      logger.ora.text = logger.fileCounter + '/' + logger.fileMaxCount + " html " + 
                          '(' + logger.imgDone + "/" + logger.imgTotal + " img) " 
                          + a;
    }
  }
}

module.exports = logger;