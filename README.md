# STARTER-KIT v1.0


## If you want to start fresh.

- Delete the package.json and package-lock.json files
- Run this command in the terminal which will create a new package.json and package-lock.json files

```
npm init -y
```

- Copy the code below and paste it at the beginning of the package.json file, under the "name": "project" line is fine.

```
"type": "module",
```

- Then run this to install all the packages

```
npm i autoprefixer browser-sync copyfiles cpx cssnano fs-extra html-minifier imagemin imagemin-webp npm-run-all onchange postcss postcss-cli recursive-copy-cli  replace-in-file sass svgo  uglifyjs-folder --save-dev
```
- There is no need to install the "fs" npm package, it is part of Node now.
- Next copy paste the code below and put it in the scripts section of the package.json file.
- See an explanation of these scripts at the end of this file.

```
    "svg-min": "svgo -f ./dist/assets/img -o ./dist/assets/img",
    "build:sass": "sass --no-source-map src/assets/scss:dist/assets/css",
    "build:css": "postcss dist/assets/css/*.css -u autoprefixer cssnano -r --no-map",
    "build:js": "node utils/append-js.cjs",
    "build:img": "node utils/imgmin.js",
    "build:webp": "copyfiles -u 1 \"./src/assets/img/**/*.webp\" -f \"dist/assets/img\"",
    "build:test-folder": "cpx \"./src/assets/test-folder/**/*\" ./dist/assets/test-folder",
    "build:htmlcomp": "node utils/html-compiler.cjs",
    "build": "npm-run-all build:*",
    "watch:sass": "sass  --no-source-map --watch src/assets/scss:dist/assets/css",
    "watch:css": "onchange \"dist/assets/css/*.css\" -- npm run build:css",
    "watch:js": "onchange \"./src/assets/js/**/*\" -- npm run build:js",
    "watch:img": "onchange \"./src/assets/img/**/*\" -- npm run build:img",
    "watch:webp": "onchange \"./src/assets/img/**/*\" -- npm run build:webp",
    "watch:svg": "onchange \"src/assets/img/*.svg\" -- npm run build:svg",
    "watch:test-folder": "onchange \"src/assets/test/**/*\" -- npm run build:test-folder",
    "watch:html": "onchange \"src/*.html\" -- npm run build:htmlcomp",
    "watch": "npm-run-all --parallel watch:*",
    "serve": "browser-sync start --server dist --files dist",
    "start": "npm-run-all --parallel watch serve",
    "complete:js": "uglifyjs-folder ./dist/assets/js -o ./dist/assets/js/main.js",
    "complete:htmlmin": " html-minifier --input-dir ./dist --output-dir ./dist --collapse-whitespace --decode-entities --file-ext html",
    "complete": "npm-run-all build:* && npm-run-all complete:*"
```

- Run the build command from the package.json to create/update the dist folder.
- Run the start command to run the live server for development.
- Use ctrl + C keys to stop the live server.
- Run the complete command when done and ready for distribution.
- You will need to run the "svg-min" script separately as needed, since it will throw an error if there are no svg images in your project.

## Git

- Add the following to your .gitingore file. Create one in your project's root directory if it doesn't exist.
```
node&#95;modules/
dist/  // you will need to remove this line if you want to publish the dist folder from git, so this folder needs to be included in the repo
```

## How to use the html compiler
The html-compiler.cjs script will compile partial html files into the non partial files.
It works similar to how you use include in a main Sass file.
Any html files that are not partial are copied to the /dist/ folder after being compiled.
A partial file simply uses this naming convention e.g. "&#95;navigation.html".
Just put an underscore "&#95;" at the beginning of the file name.
Put that partial file name in a regular html file where you want the partial file's contents/markup to appear.
See the index.html and app.html files in the kit and you'll see how its done.
This doesn't support subdirectories so all these files need to be in the src folder.


## NOTES
If you get a copyfile error -4048; go to windows file explorer, right click on the file,
choose properties, in the General tab at the bottom, make sure the Attributes: Read Only
is not checked. Do this for all copies of the file.

BE sure your javascript code is unique so when you compile all the scripts into one file
there are no conflicts.

If you don't have any svg images in your project you may get an error from the "build:svg" script.
It will say that there are no svg images, but the build will still succeed. It is more of a warning 
than an error.

The start command will open the index.html file in the dist folder, so the links will reference the dist folder directory tree. This means that all your links should reference the structure of the /dist/folder.

In the /src/ folder, if you have subfolers in your images folder, e.g. images/icons/, you still have to reference the link to those images with just /images/example.png, not /images/icons/example.png because the script takes all
images in all sub directories of the /src/ folder and puts them in the /dist/images/ folder. It won't include the subfolders. This way, you can organize all your images in /src/ subfolders for production, then move all of them into a single directory folder, the /dist/assets/images/ folder.

There is no styling, so the pages are ugly, for demo purposes only.


### Description:

    - This compiles your Sass files into one css file in the dist directory.
    "build:sass": "sass --no-source-map src/assets/scss:dist/assets/css",
    - Autoprefixer add prefixes to css for browser compatibility.
    "build:css": "postcss dist/assets/css/*.css -u autoprefixer cssnano -r --no-map",
    - This script compiles your javascript files into one file.
    "build:js": "node utils/append-js.cjs",
    - This will compile/minify/compress png/jpg/ico images into the webp format to reduce file size.
    "build:img": "node utils/imgmin.js",
    - For images that already have the webp format, they are just copied to the dist directory.
    "build:webp": "copyfiles -u 1 \"./src/assets/img/**/*.webp\" -f \"dist/assets/img\"",
    - Optimizes svg image files and put them in the dist directory.
    "build:svg": "svgo -f ./dist/assets/img -o ./dist/assets/img",
    - Use as many of the next line as you need to copy relevant folders into the dist directory
    "build:test-folder": "cpx \"./src/assets/test-folder/**/*\" ./dist/assets/test-folder",
    - This script will compile your partial html files into the index.html and put it in the dist directory.
    "build:htmlcomp": "node utils/html-compiler.cjs",
    - This will run all the above scripts.
    "build": "npm-run-all build:*",
    - The watch section will update the files when you save them after changing them.
    "watch:sass": "sass  --no-source-map --watch src/assets/scss:dist/assets/css",
    "watch:css": "onchange \"dist/assets/css/*.css\" -- npm run build:css",
    "watch:js": "onchange \"./src/assets/js/**/*\" -- npm run build:js",
    "watch:img": "onchange \"./src/assets/img/**/*\" -- npm run build:img",
    "watch:webp": "onchange \"./src/assets/img/**/*\" -- npm run build:webp",
    "watch:svg": "onchange \"src/assets/img/*.svg\" -- npm run build:svg",
    "watch:test-folder": "onchange \"src/assets/test/**/*\" -- npm run build:test-folder",
    "watch:html": "onchange \"src/*.html\" -- npm run build:htmlcomp",
    "watch": "npm-run-all --parallel watch:*",
    - Refreshes the web page after the dist folder has changed.
    "serve": "browser-sync start --server dist --files dist",
    - Starts the live server
    "start": "npm-run-all --parallel watch serve",
    - Complete builds everything then minifies the javascript and css files.
    - I save this for last because it is hard to debug a minified file.
    "complete:js": "uglifyjs-folder ./dist/assets/js -o ./dist/assets/js/main.js",
    "complete:htmlmin": " html-minifier --input-dir ./dist --output-dir ./dist --collapse-whitespace --decode-entities --file-ext html",
    "complete": "npm-run-all build:* && npm-run-all complete:*"
