
const {XMLParser} = require('fast-xml-parser');

const options = {
  ignoreAttributes : false
};

const parser = new XMLParser(options);
let jsonObj = parser.parse('<root><a>wow</a></root>');

console.log(jsonObj)