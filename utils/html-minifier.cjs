// This script minimizes the html files in the dist folder

var minify = require('html-minifier').minify;
const fs = require("fs");

fs.readdir("./dist/", (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if (file.endsWith(".html")) {
        // minify the html code
        fs.readFile(file, function (err, data) {
          if (err) return console.error(err);
          var result = minify(data.toString(), {
            removeAttributeQuotes: false,
            collapseWhitespace: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
          });
          // console.log(result);
          fs.writeFileSync(file, result, (error) => {
            console.log("==> html files minified");
            if (error) {
              console.log(error);
            }
          });
        });

      }
    });
  }
  getPartialData();
});


