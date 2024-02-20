/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return fs.createReadStream(pathIn)
    .pipe(unzipper.Extract({ path: pathOut }))
    .promise()
    .then(() => console.log("Extraction operation complete"));
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} dir
 * @return {promise}
 */
const readDir = (dir) => {
  return fs.promises.readdir(dir)
    .then(files => files.filter(file => file.endsWith('.png'))
      .map(file => `${dir}/${file}`));
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
      .pipe(new PNG())
      .on('parsed', function() {
        for (let i = 0; i < this.data.length; i += 4) {
          let grayscale = 0.299*this.data[i] + 0.587*this.data[i+1] + 0.114*this.data[i+2];
          this.data[i] = this.data[i+1] = this.data[i+2] = grayscale;
        }
        this.pack().pipe(fs.createWriteStream(pathOut));
        resolve();
      })
      .on('error', reject);
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
