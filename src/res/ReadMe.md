Execute /**npm run images**/ after adding the images to image folder to generate images.js

Execute /**npm run fonts**/ after adding the fonts to font folder to generate fonts.js(Make sure to name the font file as it is displayed in font book)

Install /**react-native-asset**/ package using /**npm install react-native-asset**/ and Create /**react-native.config.js**/
add

```js
module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./src/res/fonts'], // for exporting fonts
};
```

Execute /**npm run link**/ to link the resources from /**react-native.config.js**/ file to native projects(iOS & Android)(Font will be linked in assets/fonts folder in android and in Resources folder in iOS)

Execute /**npm run unlink-android**/ to unlink the resources from android and /**npm run unlink-ios**/ to unlink the resources from ios

Commands to execute after adding fonts to fonts folder
/**npm run fonts && npm run unlink-android && npm run unlink-ios && npm run link**/
