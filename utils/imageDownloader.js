const download = require('image-downloader');
const path = require('path');

module.exports = (url, filepath) => {
  const options = {
    url: url,
    dest: path.resolve(__dirname, `../${filepath}`),
  };

  download
    .image(options)
    .then(({ filename }) => {
      console.log('Saved to', filename);
    })
    .catch((err) => console.error(err));
};
