const request = require('request');
const fs = require('fs');

const ask = function(question,) {
  //return promise as answer
  return new Promise((resolve) => {
    console.log(question);
    process.stdin.once('data', (answer) => {
      resolve(answer.toString());
    });
  });
};

const saveLocal = function() {
  ask('URL?').then((answer) => {
    const url = answer;
    ask('Local Path?').then((file) => {
      request(url, (error, response, body) => {
        if (error || !response || response.statusCode !== 200) {
          console.log('Problem loading the page. Please check the URL.');
        } else if (!(/[\wd-]*\.[a-zA-Z]+/.test(file))) {
          console.log('File name is invalid');
        } else {
          fs.writeFile(file, body, () => {
            console.log(`Downloaded and saved ${fs.statSync(file).size} bytes to ./${file}.`);
          });
        }
        process.exit();
      });
    });
  });
};

saveLocal();