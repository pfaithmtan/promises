/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var request = Promise.promisify(require('request'));


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return fs.readFileAsync(readFilePath)
    .then(function(contentsOfFile) {
      var firstLine = String(contentsOfFile).split('\n')[0];
      if (!contentsOfFile) {
        throw new Error('Content is empty!');
      } else {
        var url = 'https://api.github.com/users/' + firstLine;
        return request(url);
      }
    })
    .then(function(infoFromRequest) {
      console.log("infoFromRequest: ", typeof infoFromRequest.body);
      return fs.writeFileAsync(writeFilePath, infoFromRequest.body);
    })
    .then(function(data) {
      console.log('Done writing!');
      return data;
    })
    .catch(function(err) {
      console.log('Hit an error: ', err.message);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
