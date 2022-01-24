// // function that multiply the elements of array by 2
// function copyArrayAndMultiplyBy2(array){
//   const output = [];
//   for(let i = 0;i < array.length; i++){
//     output.push(array[i] * 2);
//   }
//   return output;
// }
// const myArray = [1,2,3]
// const result = copyArrayAndMultiplyBy2(myArray);
// console.log(result);
// // function that divide the elements of array by 2
// function copyArrayAndDivideBy2(array){
//   const output = [];
//   for(let i = 0;i < array.length; i++){
//     output.push(array[i] / 2);
//   }
//   return output;
// }
// const result1 = copyArrayAndDivideBy2(myArray);
// console.log(result1);
// // function that add 3 to  the elements of an array 
// function copyArrayAndAdd3(array){
//   const output = [];
//   for(let i = 0;i < array.length; i++){
//     output.push(array[i] + 3);
//   }
//   return output;
// }
// const result2 = copyArrayAndAdd3(myArray);
// console.log(result2);
// // to avoid repetitive code we can do this
// function copyArray(array, instructions) {
//   const output = [];
//   for (let i = 0; i < array.length; i++) {
//     output.push(instructions(array[i]));
//   }
//   return output;
// }
// function multiplyBy2(input){
//   return input * 2;
// }
// const result3 = copyArray(myArray, multiplyBy2);
// console.log(result3);
// //closure
// function outer(){
//   let counter = 0;
//   function incrementCounter(){
//     return counter++;
//   }
//   return incrementCounter;
// }
// const myNewFunction = outer();
// console.log(myNewFunction()); // 0
// console.log(myNewFunction()); // 1
// const anotherFunction = outer();
// console.log(anotherFunction()); // 0  
// console.log(anotherFunction()); // 1
// the execution in js (single thread execution)
function printHello(){
  console.log("hello");
}
setTimeout(printHello, 1000);// its just set a timer on the browser(the work of this function is done)
console.log("folks"); // gets executed first 