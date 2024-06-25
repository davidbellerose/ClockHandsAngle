// This script will compile partial html files into the index file.
// It works similar to how you use include in a main Sass file.
// Any html files that are not partial are copied to the /dist/ folder
// A partial file simply uses this naming convention e.g. "_navigation.html"
// Just put an underscore "_" at the beginning of the file name.
// put that file name in the index.html file where you want the partial file's contents/markup to appear.

const fs = require("fs");
const replace = require("replace-in-file");

// create dist directory
if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist", (error) => {
    if (error) {
      console.log("###  Error Found:", error);
    }
  });
  console.log("==> dist directory created");
} else {
  console.log("==>  dist Directory already exists");
}



// get list of files in src directory that start with "_"(underscore) which are the partial files
function getPartialData(){
fs.readdir("./src/", (err, files) => {
  if (err) {
    console.log("###  Error Found:", err);
  } else {
    files.forEach((partial) => {
      if (partial.startsWith("_") && partial.endsWith(".html")) {

// get the contents of the partial file and put it in a variable
        fs.readFile("./src/" + partial, (err, data) => {
          if (err) throw err;
          partialData = data.toString();

// helper function here to do the remaining replacement
// 'partial' is the name of the partial file in the index.html, e.g. _footer.html
// 'partialData' is the contents of the partial file e.g. all the markup inside the _footer.html
// That 'partialData' is put in place of the partial file name in the index file
//    e.g. the contents of _footer.html replaces the text "_footer.html" that is in the index.html file.
          replaceIt(partial, partialData);
        });
      }
    });
  }
});
}

// helper function
function replaceIt(partial, partialData){
  fs.readdir("./src/", (err, files) => {
    if (err) {
      console.log("###  Error Found:",err);
    } else {
      files.forEach((file) => {
        if (!file.startsWith("_") && file.endsWith(".html")) {
          const options = {
            files: "dist/" + file, // this is the file to look into
            from: partial, // this is the name of the partial file
            to: partialData, // this is the html markup that will be copied into the html file
          };
          // the replace action
          try {
            const results = replace.sync(options);
              console.log(file + " updated with " + partial, results);
          } catch (error) {
            console.error("###  Error Found:", error);
          }

        }
      });
    }
  });
}


// copy html files that are not partials from src to dist
fs.readdir("./src/", (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if (!file.startsWith("_") && file.endsWith(".html")) {
        fs.copyFile("src/" + file, "dist/" + file, (err) => {
          if (err) {
            console.log("###  Error Found:", err);
          }
          console.log("==>  " + file + " copied");
        });
      }
    });
  }
  getPartialData();
});
