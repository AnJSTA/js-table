// app div to display all
const App =  document.getElementById('app');

// data of records
const dataToDisplay = [{"id":"1","date":1508598842000,"name":"name 1","uploads":65,"downloads":16},{"id":"2","date":
1486616090192,"name":"name 2","uploads":97,"downloads":61},{"id":"3","date":1483422460130,"name":"name 3","uploads":72,"downloads":94},{"id":"4","date":
1464409397045,"name":"name 4","uploads":91,"downloads":8},{"id":"5","date":
1446187385629,"name":"name 5","uploads":22,"downloads":9},{"id":"6","date":
1438925217383,"name":"name 6","uploads":26,"downloads":44},{"id":"7","date":
1433256068867,"name":"name 7","uploads":74,"downloads":97},{"id":"8","date":1428229109439,"name":"name 8","uploads":78,"downloads":44},{"id":"9","date":
1425879877711,"name":"name 9","uploads":72,"downloads":53},{"id":"10","date":1419382244603,"name":"name 10","uploads":6,"downloads":5},{"id":"11","date":
1386471155002,"name":"name 11","uploads":84,"downloads":97},{"id":"12","date":1385585651553,"name":"name 12","uploads":28,"downloads":49},{"id":"13","date":1365529457695,"name":"name 13","uploads":4,"downloads":12},{"id":"14","date":1360323237720,"name":"name 14","uploads":17,"downloads":43},{"id":"15","date":
1360282993630,"name":"name 15","uploads":6,"downloads":79},{"id":"16","date":1358760439096,"name":"name 16","uploads":78,"downloads":21},{"id":"17","date":1346014640011,"name":"name 17","uploads":39,"downloads":7},{"id":"18","date":1332421801957,"name":"name 18","uploads":62,"downloads":51},{"id":"19","date":1330359959333,"name":"name 19","uploads":47,"downloads":28},{"id":"20","date":1328459223715,"name":"name 20","uploads":30,"downloads":15}];


console.log(dataToDisplay);
// dropdown data
const dropdown = () => [5,10,15];

// table headers
const headersForTable = () => ['Name', 'Date', 'Time', 'Uploads', 'Downloads'];

// split array of data
const splitData = (arr, chunk) => (
	arr.reduce((acc, curr, i) => {
		const index = Math.floor(i/chunk);
		acc[index] = (acc[index] || []).concat(curr);
		return acc;
	}, [])
);

// compose functions
const compose = (...fns) => (
	(x) => fns.reduceRight(
		(acc, curr) => curr(acc), x
	)
)


// currying function 
const curry = (fn) => (
	(...args) => (
		fn.length <= 1 || args.length >= fn.length ? fn(...args) : args.reduce((acc, curr) => (
			curry(acc.bind(null, curr)), fn)
		)
	)
);

// mapper fn accepts function than data
let mapper = (fn, arr) => {
	return arr.map(fn)
};

// html element cretion
let createHtml = (el) => {
  return document.createElement(el);
};

// adding attribute to created html element
const createAttr = (el, atr, name) => {
  return el.setAttribute(atr, name);
}

// appending html element to requirred location 
let appendElement = (el, placeholder) => {
  placeholder.appendChild(el);
  return placeholder;
};

let ul = createHtml('ul');

let drop = dropdown().map((x, i) => ul.innerHTML += `<li data-index="${i}">${x}</li>`);

let tbl = createHtml('table');

let createTrailingZeroes = (number) => {
	return number < 10 ? `0${number}` : number; 
};

let createDateFormat = (timestamp) => {
	const currentTime = new Date(timestamp);
	return {
		hours: createTrailingZeroes(currentTime.getHours()),
		minutes: createTrailingZeroes(currentTime.getMinutes()),
		date: `${currentTime.getFullYear()}/${createTrailingZeroes(currentTime.getMonth() + 1)}/${createTrailingZeroes(currentTime.getDate())}`,
		ampm: currentTime.getHours() >= 12 ? 'pm' : 'am' 
	};
};

/*
let tdDisplay = dataToDisplay.map(x => tbl.innerHTML += `<tr><td>${x.name}</td><td>${createDateFormat(x.date).date}</td><td>${createDateFormat(x.date).hours}:${createDateFormat(x.date).minutes}${createDateFormat(x.date).ampm}</td><td>${x.uploads}</td><td>${x.downloads}</td></tr>`);
*/
let tdDisplay = splitData(dataToDisplay, d=5);
//console.log(JSON.stringify(tdDisplay, null, 4));
console.log(tdDisplay[0]);
console.log(tdDisplay);

console.log(tdDisplay.length);

let pagesCreator = (number) => {
	if(number < 0) {
		return null;
	}
	return pagesCreator(number - 1)
}

console.log(pagesCreator(tdDisplay.length));

let dt = createAttr(tbl, 'class', 'table');

let thead = createHtml('thead');
let tr = createHtml('tr');
let thToDisplay = headersForTable().map((x, i) => tr.innerHTML += `<th data-index="${i}">${x}</th>`);

appendElement(ul, App);
appendElement(tr, thead);
appendElement(thead, tbl);
appendElement(tbl, App);
