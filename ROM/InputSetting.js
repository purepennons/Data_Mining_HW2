var ROM = require('./ROM.js');
var fileAPI = require('./FileAPI.js');
var ni = 4;
var no = 1;
var inputData;
var fs = require('fs');
var array = fs.readFileSync('iris.data.txt').toString().split("\n");  //同步讀檔
var inputArray = new Array(array.length);
var inputDataForROM = new Array(array.length);
for(var i=0;i<array.length;i++){
    inputArray[i] = new Array(2);
    inputArray[i][0] = new Array(ni);
    inputArray[i][1] = new Array(no);
}
for(i in array) {
    var tempArray = array[i].toString().split(',');
    for(var k=0;k<tempArray.length;k++){
        if(k==tempArray.length-1){
            inputArray[i][1][0] = tempArray[k];
        }else {
            inputArray[i][0][k] = tempArray[k];
            inputDataForROM[i] = inputArray[i][0];
        }
    }
    switch(inputArray[i][1][0]){
        case 'Iris-setosa':
            inputArray[i][1] = [0, 0, 1];
            break;
        case 'Iris-versicolor':
            inputArray[i][1] = [0, 1, 0];           
            break;
        case 'Iris-virginica':
            inputArray[i][1] = [1, 0, 0];           
            break;
    }
}


var rom = new ROM();
var fsApi = new fileAPI();
var errorArray = null;
var winnerMatrix = null;
var topologyP =[5, 10, 20];
var iterationP = [1000, 10000, 100000];
var learningRateP = [0.3, 0.6, 0.9];

console.log('Dataset: Iris');

//Different network topologies
// for(var i=0;i<3;i++){
//     rom.init(ni, topologyP[i], topologyP[i]);
//     rom.train(inputDataForROM, 200, 0.95, 1.0);
//     rom.recall(inputDataForROM);
//     errorArray = rom.errorArray;
//     winnerMatrix = rom.recallWinnerMatrix;
//     if(fsApi.isExist('./changeTopologyLiner' + i + '.dat')){
//         fsApi.removeFile('./', 'changeTopologyLiner' + i + '.dat');
//     }
//     fsApi.appendStringArrayToFile('changeTopologyLiner' + i + '.dat', errorArray);
    
//     if(fsApi.isExist('./changeTopologyLiner3D' + i + '.dat')){
//         fsApi.removeFile('./', 'changeTopologyLiner3D' + i + '.dat');
//     }
//     fsApi.appendStringMatrixAndCoordinateToFile('changeTopologyLiner3D' + i + '.dat', winnerMatrix);

// } 

//Different learning rate 
for(var i=0;i<3;i++){
    rom.init(ni, 20, 20);
    rom.train(inputDataForROM, 200, learningRateP[i], 1.0);
    rom.recall(inputDataForROM);
    errorArray = rom.errorArray;
    winnerMatrix = rom.recallWinnerMatrix;
    if(fsApi.isExist('./changeLearningRate' + i + '.dat')){
        fsApi.removeFile('./', 'changeLearningRate' + i + '.dat');
    }
    fsApi.appendStringArrayToFile('changeLearningRate' + i + '.dat', errorArray);
    
    if(fsApi.isExist('./changeLearningRate3D' + i + '.dat')){
        fsApi.removeFile('./', 'changeLearningRate3D' + i + '.dat');
    }
    fsApi.appendStringMatrixAndCoordinateToFile('changeLearningRate3D' + i + '.dat', winnerMatrix);

} 
