var ROM = require('./ROM.js');
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
console.log('Dataset: Iris');
var rom = new ROM();
rom.init(ni, 20, 20);
rom.train(inputDataForROM, 10000, 1.0, 1.0);
console.log(rom.recall(inputDataForROM));
console.log(rom.recallWinnerMatrix);

