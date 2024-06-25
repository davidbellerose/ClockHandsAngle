// This script compiles all the javascript files into one js file.

const fs = require("fs");
const fse = require('fs-extra')

const dir = './dist/assets/js';

fse.ensureDir(dir, err => {
  console.log(err) // => null
  // dir has now been created, including the directory it is to be placed in
})

fs.exists("./dist/assets/js/main.js", function(exists) {
  if(exists) {
      fs.unlinkSync("./dist/assets/js/main.js");
  } else {
  }
});


fs.readdir("./src/assets/js/", (err, files) => {
  if (err) {
    console.log("###  Error Found:", err);
  } else {
    files.forEach((file) => {
// get the contents of the partial file and put it in a variable
        fs.readFile("./src/assets/js/" + file, (err, data) => {
          if (err) throw err;
          partialData = data.toString();
// append the contents to the main.js file
        fs.appendFile("./dist/assets/js/main.js", "\n" + partialData, (err) => {
          if (err) {
            console.log(err);
          }
          else {
            // Console.log the file contents after the append operation for debugging if preferred
          }
        });
      });
    });
    console.log("==>  js files merged");
  }
});