//2014年 Data Mining HW2
//Back Propagation neural network algorithm
//系別:電子工程系碩一
//學號:M10202154
//姓名:林佳豪
//檔名:ROM.js
//運行環境:node.js v0.10.25

var createArray = function(length, initValue){  //初始化陣列
	var newArray = [];
	for(var i=0;i<length;i++){
		newArray.push(initValue);
	}
	return newArray;
}

var createMatrix = function(row, col, initValue){  //初始化矩陣
	var newMatrix = [];
	for(var i=0;i<row;i++){
		newMatrix.push(createArray(col, initValue));
	}
	return newMatrix;
} 

var getRandomNum = function(min, max){ //取得隨機數
	return (max-min)*Math.random()+min;
}

var euclideanDistance = function(p1, p2) {  //Euclidean distance without sqrt
	return Math.pow((p1-p2), 2);
}

var compareNum = function(num1, num2) {
	if(num1 > num2){
		return 1;
	}
	if(num1 == num2){
		return 0;
	}
	if(num1 < num2){
		return -1;
	}
}

var getMiniNumFromMatrix = function(matrix){	//回傳矩陣內最小值及其座標
	var minNum = matrix[0][0];
	var minX = 0, minY = 0;
	for(var x in matrix){
		for(var y in matrix[0]){
			if(compareNum(minNum, matrix[x][y]) == 1){
				minNum = matrix[x][y];
				minX = x;
				minY = y;
			}
		}
	}
	return [minNum, minX, minY];
}

function ROM(){
	this.numOfInput = 0;
	this.numOfOutputX = 0;
	this.numOfOutputY = 0;
	this.X = null;
	this.W = null;
	this.dW = null;
	this.Y = null;
	this.R = 0;
	this.errorArray = null;
	this.recallWinnerMatrix = null;
	this.initFlag = false;
	this.trainFlag = false;

	this.init = function(numOfInput, numOfOutputX, numOfOutputY){  //初始化參數與陣列
		this.initFlag = true;
		this.numOfInput = numOfInput;
		this.numOfOutputX = numOfOutputX;
		this.numOfOutputY = numOfOutputY;
		this.X = createArray(numOfInput, 0);
		this.W = createArray(numOfInput, 0);
		this.R = numOfOutputX;  //初始相鄰半徑為numOfOutputX
		for(var i in this.W){
			this.W[i] = createMatrix(numOfOutputX, numOfOutputY, 0);
		}
		for(var i in this.W){
			for(var j in this.W[0]){
				for(var k in this.W[0][0]){
					this.W[i][j][k] = getRandomNum(0.0, 1.0);
				}
			}
		}

	}

	/************ main function *****************/

	this.update = function(input, learningRate, radiusRate) {
		var minNum = 0, minX = 0, minY = 0;
		var error = 0;
		var node = createMatrix(this.numOfOutputX, this.numOfOutputY, 0);
		var neighborhood = createMatrix(this.numOfOutputX, this.numOfOutputY, 0);
		var r = createMatrix(this.numOfOutputX, this.numOfOutputY, 0);
		this.Y = createMatrix(this.numOfOutputX, this.numOfOutputY, 0);
		for(var data in input){
			this.X[data] = input[data];
		}

		//select winner node
		for(var j=0;j<this.numOfOutputX;j++){
			for(var k=0;k<this.numOfOutputY;k++){
				for(var i=0;i<this.numOfInput;i++){
					node[j][k] += euclideanDistance(this.X[i], this.W[i][j][k]);
				}
			}
		}
		var tempArray = getMiniNumFromMatrix(node);
		minNum = tempArray[0];
		minX = tempArray[1];
		minY = tempArray[2];
		this.Y[minX][minY] = 1;		//if j=j*, k=k*, node[j][k] = 1, else node[j][k] = 0
		error = Math.sqrt(node[minX][minY]);

		//計算neighborhood與dW，並且更新this.W
		this.dW = createArray(this.numOfInput, 0);
		for(var i in this.dW){
			this.dW[i] = createMatrix(this.numOfOutputX, this.numOfOutputY, 0);
		}

		for(var j=0;j<this.numOfOutputX;j++){
			for(var k=0;k<this.numOfOutputY;k++){
				r[j][k] = Math.sqrt(euclideanDistance(j, minX) + euclideanDistance(k, minY));
				neighborhood[j][k] = Math.exp((-r[j][k])/(this.R*radiusRate));
				for(var i=0;i<this.numOfInput;i++){
					this.dW[i][j][k] = learningRate * (this.X[i] - this.W[i][j][k]) * neighborhood[j][k];
					this.W[i][j][k] += this.dW[i][j][k];
				}
			}
		}
		return error;
	}

	this.clustering = function(input, countMatrix) {
		var recallX = createArray(this.numOfInput, 0);
		var minNum = 0, minX = 0, minY = 0;
		var node = createMatrix(this.numOfOutputX, this.numOfOutputY, 0);
		for(var data in input){
			recallX[data] = input[data];
		}

		//select winner node
		for(var j=0;j<this.numOfOutputX;j++){
			for(var k=0;k<this.numOfOutputY;k++){
				for(var i=0;i<this.numOfInput;i++){
					node[j][k] += euclideanDistance(recallX[i], this.W[i][j][k]);
				}
			}
		}
		var tempArray = getMiniNumFromMatrix(node);
		minNum = tempArray[0];
		minX = tempArray[1];
		minY = tempArray[2];
		countMatrix[minX][minY] = parseInt(countMatrix[minX][minY]) + 1;
		return countMatrix;
	}

	this.train = function(inputData, maxTrainTimes, learningRate, radiusRate) {
		if(!this.initFlag){
			return false;
		}
		this.trainFlag = true;
		this.errorArray = new Array();
		for(var iteration=0;iteration<maxTrainTimes;iteration++){
			var error = 0;
			for(var i in inputData){
				error += this.update(inputData[i], learningRate, radiusRate);
			}
			this.errorArray.push(error);
			learningRate *= 1.0;
			radiusRate *= 0.95;	
			if(iteration%(maxTrainTimes*0.01) ==0){
				//console.log('a = ' + learningRate + ' b = ' + radiusRate);
				console.log('#' + iteration + ' : ' + error);
			}
		}
		return true;
	}

	this.recall = function(inputData) {
		if(!this.initFlag || !this.trainFlag){
			return false;
		}
		this.recallWinnerMatrix = createMatrix(this.numOfOutputX, this.numOfOutputY, 0);
		for(var i in inputData){
			this.recallWinnerMatrix = this.clustering(inputData[i], this.recallWinnerMatrix);
		}
		return true;
	}
}

module.exports = ROM;

