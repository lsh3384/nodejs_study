var xml = require('xml');


console.log(xml({nested: [{ keys: [{ fun: 'hi' }, {hello:'wow'}]}]}))