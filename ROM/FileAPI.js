var fs = require('fs');
function FileAPI(){
	this.appendStringToFile = function(filename, str) {
		fs.appendFile(filename, str + '\n', function(err) {
			if(err) throw err;
			console.log('write data to ' + filename +  ' success.');
		}); 
	}

	this.appendStringArrayToFile = function(filename, strArray) {
		for(var i in strArray){
			fs.appendFile(filename, strArray[i] + '\n', function(err) {
				if(err) throw err;
				console.log('write data to ' + filename +  ' success.');
			});
		} 
	}

	this.removeFile = function(path, filename) {
		fs.unlink(path + filename, function (err) {
		  if (err) throw err;
		  console.log('successfully deleted' + path + filename);
		});
	}
}

module.exports = FileAPI;