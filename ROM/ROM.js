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

function ROM(){
	this.numOfInput = 0;
	this.numOfOutputX = 0;
	this.numOfOutputY = 0;
	this.X = null;
	this.W = null;
	this.node = null;
	this.Y = null;

	this.init = function(numOfInput, numOfOutputX, numOfOutputY){  //初始化參數與陣列
		this.numOfInput = numOfInput;
		this.numOfOutputX = numOfOutputX;
		this.numOfOutputY = numOfOutputY;
		this.X = createArray(numOfInput, 0);
		this.Y = createMatrix(numOfOutputX, numOfOutputY, 0);
		this.node = createMatrix(numOfOutputX, numOfOutputY, 0);
		this.W = createArray(numOfInput, 0);
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

	this.update = function(input) {
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
		console.log(this.node);

	}

	this.train = function(inputData, maxTrainTimes, learningRate, radius) {
		//for(var iteration=0;iteration<maxTrainTimes;iteration++){
			for(var i in inputData){
				this.update(inputData[i]);
			}
		//}

	}

	this.recall = function() {

	}

}
var inputData = [
					[19,3,5],
					[191,53,2],
					[159,43,15]
					];
var rom = new ROM();
rom.init(3, 5, 5);
rom.train(inputData, 1000, 0.3, 0.3);
