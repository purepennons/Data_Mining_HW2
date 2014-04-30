var fs = require('fs');
function FileAPI(){
	this.appendStringToFile = function(filename, str) {
		// fs.appendFile(filename, str + '\n', function(err) {
		// 	if(err) throw err;
		// 	console.log('write data to ' + filename +  ' success.');
		// }); 
		fs.appendFileSync(filename, str + '\n');
		console.log('write data to ' + filename +  ' success.');
	}

	this.appendStringArrayToFile = function(filename, strArray) {
		for(var i in strArray){
			// fs.appendFile(filename, strArray[i] + '\n', function(err) {
			// 	if(err) throw err;
			// 	console.log('write data to ' + filename +  ' success.');
			// });
			fs.appendFileSync(filename, strArray[i] + '\n');
		}
		console.log('write data to ' + filename +  ' success.'); 
	}

	this.appendStringMatrixAndCoordinateToFile = function(filename, strMatrix) {
		for(var i in strMatrix){
			for(var j in strMatrix[i]){
				// fs.appendFile(filename, i + ' ' + j + ' '  +  strMatrix[i][j] + '\n', function(err) {
				// 	if(err) throw err;
				// 	console.log('write data to ' + filename +  ' success.');
				// });
				fs.appendFileSync(filename, i + ' ' + j + ' '  +  strMatrix[i][j] + '\n' + '\n');
			}
		} 
		console.log('write data to ' + filename +  ' success.');
	}


	this.removeFile = function(path, filename) {
		fs.unlink(path + filename, function (err) {
		  if (err) throw err;
		  console.log('successfully deleted' + path + filename);
		});
	}

	this.isExist = function(path) {
		return fs.existsSync(path)
	}
}

module.exports = FileAPI;