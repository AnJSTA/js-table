// data of records
const dataToDisplay = [{ "id": "1", "date": 1508598842000, "name": "name 1", "uploads": 65, "downloads": 16 }, {
	"id": "2", "date":
		1486616090192, "name": "name 2", "uploads": 97, "downloads": 61
}, { "id": "3", "date": 1483422460130, "name": "name 3", "uploads": 72, "downloads": 94 }, {
	"id": "4", "date":
		1464409397045, "name": "name 4", "uploads": 91, "downloads": 8
}, {
	"id": "5", "date":
		1446187385629, "name": "name 5", "uploads": 22, "downloads": 9
}, {
	"id": "6", "date":
		1438925217383, "name": "name 6", "uploads": 26, "downloads": 44
}, {
	"id": "7", "date":
		1433256068867, "name": "name 7", "uploads": 74, "downloads": 97
}, { "id": "8", "date": 1428229109439, "name": "name 8", "uploads": 78, "downloads": 44 }, {
	"id": "9", "date":
		1425879877711, "name": "name 9", "uploads": 72, "downloads": 53
}, { "id": "10", "date": 1419382244603, "name": "name 10", "uploads": 6, "downloads": 5 }, {
	"id": "11", "date":
		1386471155002, "name": "name 11", "uploads": 84, "downloads": 97
}, { "id": "12", "date": 1385585651553, "name": "name 12", "uploads": 28, "downloads": 49 }, { "id": "13", "date": 1365529457695, "name": "name 13", "uploads": 4, "downloads": 12 }, { "id": "14", "date": 1360323237720, "name": "name 14", "uploads": 17, "downloads": 43 }, {
	"id": "15", "date":
		1360282993630, "name": "name 15", "uploads": 6, "downloads": 79
}, { "id": "16", "date": 1358760439096, "name": "name 16", "uploads": 78, "downloads": 21 }, { "id": "17", "date": 1346014640011, "name": "name 17", "uploads": 39, "downloads": 7 }, { "id": "18", "date": 1332421801957, "name": "name 18", "uploads": 62, "downloads": 51 }, { "id": "19", "date": 1330359959333, "name": "name 19", "uploads": 47, "downloads": 28 }, { "id": "20", "date": 1328459223715, "name": "name 20", "uploads": 30, "downloads": 15 }];


const curry = (fn) => {
	return (a) => {
		return (b) => {
			return fn(a, b);
		}
	}
};

const splitData = (data, chunk) => {
	return data.reduce((a, c, i) => {
		const ind = Math.floor(i / chunk);
		a[ind] = (a[ind] || []).concat(c);
		return a;
	}, []);
};

const compose = (f, g) => {
	return (a) => {
		return f(g(a));
	}
};

// mapper accepts function than data
const mapper = (fn, arr) => {
	return arr.map(fn);
};

// limit data
const limit = () => { return [2, 3, 4]; };

// table headers
const headersForTable = () => { return ['Name', 'Date', 'Time', 'Uploads', 'Downloads'];};

// html element cretion
const createHtml = (el) => { return document.createElement(el);};

// adding attribute to created html element
const createAttr = (el, atr, name) => { return el.setAttribute(atr, name);};

// appending html element to requirred location 
const appendElement = (el, placeholder) => {
	placeholder.appendChild(el);
	return placeholder;
};

const ul = createHtml('ul');

const drop = limit().map((x, i) => ul.innerHTML += `<li value="${i}" onclick="displayPage(event)" data-index="${i}">${x}</li>`);

const tbl = createHtml('table');

const createTrailingZeroes = (number) => {
	return number < 10 ? `0${number}` : number;
};

const createDateFormat = (timestamp) => {
	const currentTime = new Date(timestamp);
	return {
		hours: createTrailingZeroes(currentTime.getHours()),
		minutes: createTrailingZeroes(currentTime.getMinutes()),
		date: `${currentTime.getFullYear()}/${createTrailingZeroes(currentTime.getMonth() + 1)}/${createTrailingZeroes(currentTime.getDate())}`,
		ampm: currentTime.getHours() >= 12 ? 'pm' : 'am'
	};
};


const sta = curry(splitData)(dataToDisplay);
const sta2 = sta(limit()[1]);
console.log(sta2);

const container = document.getElementById('container');
const p = document.createElement('span');

/*
var displayPage = function(e){
	console.log(sta2[e.target.value]);
	console.log(e.target.nodeName);
	console.log(e.target.value);
};

var pagination = function(ar){
 return ar.forEach(function(x, i) {
	container.innerHTML += `<button value="${i}" onclick="displayPage(event)">${i+1}</button>`;
 });
}

pagination(sta2);
*/

const dt = createAttr(tbl, 'class', 'table');

const thead = createHtml('thead');
const tr = createHtml('tr');
const thToDisplay = headersForTable().map((x, i) => tr.innerHTML += `<th data-index="${i}">${x}</th>`);
const tdDisplay = dataToDisplay.map(x => tbl.innerHTML += `<tr><td>${x.name}</td><td>${createDateFormat(x.date).date}</td><td>${createDateFormat(x.date).hours}:${createDateFormat(x.date).minutes}${createDateFormat(x.date).ampm}</td><td>${x.uploads}</td><td>${x.downloads}</td></tr>`);

appendElement(ul, container);
appendElement(tr, thead);
appendElement(thead, tbl);
appendElement(tbl, container);

const displayPage = (e) => {
	console.log(sta2[e.target.value]);
	console.log(e.target.nodeName);
	console.log(e.target.value);
};

const pagination = (ar) => {
	return ar.forEach((x, i) => {
		container.innerHTML += `<button value="${i}" onclick="displayPage(event)">${i + 1}</button>`;
	});
}

pagination(sta2);
