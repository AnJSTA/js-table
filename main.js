// app div to display all
const App =  document.getElementById('app');

// data of records
const dataToDisplay = [{"id":"1","date":1508598842,"name":"name 1","uploads":65,"downloads":16},{"id":"2","date":1508598782,"name":"name 2","uploads":97,"downloads":61},{"id":"3","date":1508598722,"name":"name 3","uploads":72,"downloads":94},{"id":"4","date":1508598662,"name":"name 4","uploads":91,"downloads":8},{"id":"5","date":1508598602,"name":"name 5","uploads":22,"downloads":9},{"id":"6","date":1508598542,"name":"name 6","uploads":26,"downloads":44},{"id":"7","date":1508598482,"name":"name 7","uploads":74,"downloads":97},{"id":"8","date":1508598422,"name":"name 8","uploads":78,"downloads":44},{"id":"9","date":1508598362,"name":"name 9","uploads":72,"downloads":53},{"id":"10","date":1508598302,"name":"name 10","uploads":6,"downloads":5},{"id":"11","date":1508598242,"name":"name 11","uploads":84,"downloads":97},{"id":"12","date":1508598182,"name":"name 12","uploads":28,"downloads":49},{"id":"13","date":1508598122,"name":"name 13","uploads":4,"downloads":12},{"id":"14","date":1508598062,"name":"name 14","uploads":17,"downloads":43},{"id":"15","date":1508598002,"name":"name 15","uploads":6,"downloads":79},{"id":"16","date":1508597942,"name":"name 16","uploads":78,"downloads":21},{"id":"17","date":1508597882,"name":"name 17","uploads":39,"downloads":7},{"id":"18","date":1508597822,"name":"name 18","uploads":62,"downloads":51},{"id":"19","date":1508597762,"name":"name 19","uploads":47,"downloads":28},{"id":"20","date":1508597702,"name":"name 20","uploads":30,"downloads":15}];

// dropdown data
const dropdown = () => [25,50,100];

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

let createHtml = (el) => {
  return document.createElement(el);
};

const createAttr = (el, atr, name) => {
  return el.setAttribute(atr, name);
}

let appendElement = (el, placeholder) => {
  placeholder.appendChild(el);
  return placeholder;
};

let ul = createHtml('ul');

let drop = dropdown().map((x, i) => ul.innerHTML += `<li data-index="${i}">${x}</li>`);

 


let tbl = createHtml('table');


let tdDisplay = dataToDisplay.map(x => tbl.innerHTML += `<tr><td>${x.name}</td><td>${x.date}</td><td>${x.downloads}</td><td>${x.uploads}</td></tr>`);

let dt = createAttr(tbl, 'class', 'table');

let thead = createHtml('thead');
thead.innerHTML = '<tr><th>Name</th><th>Date</th><th>Uploads</th><th>Downloads</th></tr>';

appendElement(ul, App);
appendElement(thead, tbl);
appendElement(tbl, App);
