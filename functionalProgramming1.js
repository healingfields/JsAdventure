const game = {};
game['suspects'] = [];
game.suspects.push({
	name:"rusty",
	color:"red"
	});
	
game.suspects[1] = {
	name:"idriss",
	color:"blue"
	};
console.log(game["suspects"]);
console.log(game[suspects]); wont work(quotes necessary)
console.log(game.suspects)
---------------------------------------------------
function foo(){
	for(let i = 0; i < game.suspects.length; i++){
		console.log("item",i,game.suspects[i]);
	}
}
foo(); 
--------------------------------------------------- classic for(list), for var(objects)
var gameloop = function(){
	for(var i =0; i<game.suspects.length; i++){
		console.log('outer loop');
		for( var key in game.suspects[i]){
			console.log("inner loop");
			if(game.suspects[i][key] === "rusty"){
				console.log("found em")
			} else {
				console.log("next time");
				}
			}
	}
}
gameloop();		
---------------------------------------------------Deconstructing	
const firstColor = game.suspects[0].color;
const secondColor = game.suspects[1].color;

var [color1, color2] = [game.suspects[0].color, game.suspects[1].color]

var [{color:firstclr}, {color:secondclr}] = game.suspects;

console.log(firstColor, secondColor);
console.log(color1, color2);
console.log(firstclr, secondclr);
------------------------------------------------- _each syntax

function CreateSuspectObjects(name){
	return {
		name:name,
		color:name.split(' ')[2],
		speak(){
			console.log('my name is', name);
			}
		};
};

var suspects = ['Miss scarlet', 'Mr. black', 'django'];
var suspectList = []
for ( var i = 0; i < suspects.length; i++){
	suspectList.push(CreateSuspectObjects(suspects[i]));
}
_.each(suspects, function(name){
suspectList.push(CreateSuspectObjects(name));
});
console.log(suspectList);
suspectList[2].speak();
------------------------------------ _.each on my way

const _ = {};
_.each = function(list, callback){
		if(Array.isArray(list)){
			// call for list of item
			for(var i=0; i<list.length; i++){
				callback(list[i], i, list);
			}
		}
		else{
			//call for objeect
			for(var key in list){
				callback(list[key], key, list)
			}
		}
}
_.each(suspects, function(suspect, i,suspects){
	if(suspects[i+1]){
		console.log(suspect, 'is younger than', suspects[i+1]);
	}
	else{
		console.log(suspect, 'is the oldest');
	}
})
--------------------------------- _.map(does the same thing as _each but returns an array)
const weapons = ['candlestick', 'lead pipe', 'revolver'];
const makeBroken = function(item){
	return `broken ${item}`;
};
_.map(weapons, makeBroken);['broken candelstick', 'broken lead pipe', 'broken revolver']
Array.isArray(_map(weapons, makebroken));
------------------------------------ _.each and _.map in action
function createSuspectObjects(name){
	return {
		name: name,
		color : name.split(' ')[1],
		speak(){console.log(`my name is ${this.name}`);}
	};
};
var suspects = ['idriss', 'omar', 'reda', 'simo'];
var suspectsList = _.map(suspects, function(name){
	return createSuspectObjects(name);
});
_.each(suspectsList, function(suspect){
	suspect.speak();
});
----------------------------- implemetation of _.map
const _ = {}
_.map = function(list, callback){
	var storage = [] 
	// for(var i = 0; i<list.length; i++){ // with for loop
	// 	storage.push(callback(list[i], i, list));
	// }
	_.each(list, function(v, i, list){ // with _each 
			storage.push(callback(v, i, list))
	})
	return storage;
};

mylist = _.map([1,2,3,4], function(val){
	return val + 1;
})
console.log(mylist);
-------------------------------------------- _.filter impelementation
const _ = {};
_.filter = function(arr, cb){
//using for loop
	// create empty array
	const storage = [];
	// loop through the array 
	for(var i =0; i<arr.length; i++){
		//check if the cb returns true
		if(cb(arr[i], i, arr) === true){
			//push it to the empty array
			storage.push(arr[i]);
		}
//using _.each
		// _.each(arr, function(val, i, list){
		// 	if(cb(item, i, list)=== True){
		// 		storage.push(arr[item]);
		// 	}
		// }
	//return arr
	return storage;
};
------------------------------- using _.filter on data 
const videoData =[ {
	name: 'Mrs. White',
	present: false,
	rooms: [
			{kitchen: false},
			{ballroom: false},
			{conservatory: false},
			{'dining room': false},
			{'billiard room': false},
			{library: false}
	]
},
{
	name: 'Mrs. black',
	present: true,
	rooms: [
			{kitchen: false},
			{ballroom: false},
			{conservatory: false},
			{'dining room': false},
			{'billiard room': false},
			{library: true}
	]
},
{
	name: 'Miss scarlet',
	present: false,
	rooms: [
			{kitchen: false},
			{ballroom: false},
			{conservatory: false},
			{'dining room': true},
			{'billiard room': false},
			{library: false}
	]
}];
suspects = _.filter(videoData, function(vd){
	return vd.present;
})
_.map(suspects, suspect => { // projection(getting data from videodata to create another type of data)
	return suspect.name;
});
-------------------------
const createtuple = (a,b,c,d) =>{
	return [[a,b],[c,d]];
}
createtuple('it', 'could', 'be', 'anyone', 'no one');
//using spread
const createTupleUsingSpread = (a,b,c,...d) =>{
	return [[a,b],[c,d]];
}
console.log(createTupleUsingSpread("it", "could", "be", "anyone", "no one"));

//----------------- arguments using both arrow and classical functions
const createTuple = (a,b,c,...d)=>{
		console.log(arguments); // wont print the arguments
		return [
      [a, b],
      [c, d]
    ];
};
const createTuple = function(a, b, c, ...d){
  console.log(arguments); // print {'it', 'could', 'be', 'anyone', 'no one'}
  return [
    [a, b],
    [c, d],
  ];
};
createTuple("it", "could", "be", "anyone", "no one");
-----------------------------Higher order functions
var increment = function(n){return n +1;};
var square = n => {return n * n;};
var doMathForMe = function(n, func){return func(n);};
console.log(doMathForMe(5, increment));
console.log(doMathForMe(5, square));
---------------------------------------------console log run first cause settimeout is asynchronous
const myAlert = () =>{
	const x = "Help! i think i found a clue";
	const alerter = () => {
		alert(x);
	}
	setTimeout(alerter, 1000);
	console.log("what happens first?");
};
myAlert();
------------------------------------- Advanced scope 
const newClue = (name) => {
	const length = name.length;
	return (weapon) => {
		let clue = length + weapon.length
		return !!(clue % 1);
	};
};
const didIdrissDidWithA = newClue("idriss"); // returns the body of the function 
console.log(didIdrissDidWithA("knife")); // returns false , the function always get access to its higher parent function(newClue)
const didIdrissDidWithA = newClue("omar"); //create newer context for its child function
-------------------------- closure 
function countClues(){
	var n = 0 ;
	return {
		count: () => {return ++n;},
		reset: () => {return n = 0;}
	};
};
var counter = countClues();
console.log(counter);// returns object with the 2 functions that have access to n
console.log(counter.count());// 1
console.log(counter.count());// 2
console.log(counter.reset());// 0

const makeTimer = () => {
	let elapsed = 0;
	const stopwatch = () => {return elapsed;};
	const increase = () => elapsed++;
	setInterval(increase, 1000);
	return stopwatch;
}
let timer = makeTimer();
timer();
--------------------------- _.compose 
const consider = (name)=> {
	return `I think it could be ${name}`;
};
const exclaim = (statement) => {
	return `${statement.toUpperCase()}!`;
};
const blame = _.compose(consider, exclaim);
blame('you');//returns  "i think it could be YOU"
------------------------------- implementation of compose
const compose = (fn1, fn2) => {
	return (arg) => {
		var result = fn2(arg);
		return fn1(result);
	};
} ;
