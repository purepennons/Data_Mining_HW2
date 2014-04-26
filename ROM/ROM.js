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
	this.node = null;
	this.Y = null;
	this.R = 0;

	this.init = function(numOfInput, numOfOutputX, numOfOutputY){  //初始化參數與陣列
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
					this.W[i][j][k] = getRandomNum(-0.5, 0.5);
				}
			}
		}

	}

	/************ main function *****************/

	this.update = function(input, learningRate, radiusRate) {
		var minNum = 0, minX = 0, minY = 0;
		var error = 0;
		this.node = createMatrix(this.numOfOutputX, this.numOfOutputY, 0);
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
					this.node[j][k] += euclideanDistance(this.X[i], this.W[i][j][k]);
				}
			}
		}
		var tempArray = getMiniNumFromMatrix(this.node);
		minNum = parseInt(tempArray[0]);
		minX = parseInt(tempArray[1]);
		minY = parseInt(tempArray[2]);
		this.Y[minX][minY] = 1;		//if j=j*, k=k*, node[j][k] = 1, else node[j][k] = 0
		error = Math.sqrt(this.node[minX][minY]);

		//計算neighborhood與dW，並且更新this.W
		this.dW = createArray(this.numOfInput, 0);
		for(var i in this.dW){
			this.dW[i] = createMatrix(this.numOfOutputX, this.numOfOutputY, 0);
		}

		for(var j=0;j<this.numOfOutputX;j++){
			for(var k=0;k<this.numOfOutputY;k++){
				r[j][k] = Math.sqrt(euclideanDistance(j, minX) + euclideanDistance(k, minY));
				neighborhood[j][k] = Math.exp((-r[j][k])/this.R);
				for(var i=0;i<this.numOfInput;i++){
					this.dW[i][j][k] = learningRate * (this.X[i] - this.W[i][j][k]) * neighborhood[j][k];
					this.W[i][j][k] += this.dW[i][j][k];
				}
			}
		}
		return error;
	}

	this.train = function(inputData, maxTrainTimes, learningRate, radiusRate) {
		for(var iteration=0;iteration<maxTrainTimes;iteration++){
			var error = 0;
			for(var i in inputData){
				error += this.update(inputData[i], learningRate, radiusRate);
			}
			if(iteration%(iteration*0.05) ==0){
				console.log(error);
				learningRate *= 0.9;
				radiusRate *= 0.9;	
			}
		}

	}
}



var inputData = [
					[19,334,5],
					[191,53,432],
					[19,334,5],
					[15229,43,15]
					];
var rom = new ROM();
rom.init(3, 10, 10);
rom.train(inputData, 100000, 1.0, 1.0);
