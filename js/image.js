/* eslint-disable require-jsdoc */

module.exports = class Image {
  constructor() {
    this.sharp = require( 'sharp' );
    this.path = require( 'path' );
    this.fs = require( 'fs' );
  }

  /**
   *
   * @param {Object} data holds image base64 encoding, width and height
   * @returns {String} The image data converted
   * to a max width and height of 300 px
   */

  async resizeDbImage(data) {
    // strip off the data: url prefix to get just the base64-encoded bytes
    const myData = data.replace(/^data:image\/\w+;base64,/, '');
    const buf = new Buffer(myData, 'base64');
    const image = await this.sharp(buf)
        .resize(300, 300, {
          fit: this.sharp.fit.inside,
          withoutEnlargement: true,
        })
        .trim()
        .toFormat('webp')
        .toBuffer()
        .then(function(outputBuffer) {
          // outputBuffer contains JPEG image data
          // no wider and no higher than 300 pixels
          // and no larger than the input image
          return 'data:image/webp;base64,' + outputBuffer.toString('base64');
        });
    return image;
  }

  async resizeProfileImage(data) {
    // strip off the data: url prefix to get just the base64-encoded bytes
    const myData = data.replace(/^data:image\/\w+;base64,/, '');
    const buf = new Buffer(myData, 'base64');
    const image = await this.sharp(buf)
        .resize(75, 75, {
          fit: this.sharp.fit.inside,
          withoutEnlargement: true,
        })
        .trim()
        .toFormat('webp')
        .toBuffer()
        .then(function(outputBuffer) {
          // outputBuffer contains JPEG image data
          // no wider and no higher than 300 pixels
          // and no larger than the input image
          return 'data:image/webp;base64,' + outputBuffer.toString('base64');
        });
    return image;
  }
};
