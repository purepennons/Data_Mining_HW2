var fileAPI = require('./FileAPI.js');
var fsApi = new fileAPI();
var str = ['a', 'b', 'c']
// fsApi.appendStringToFile('test.txt', '123');
fsApi.removeFile('./', 'test.txt');