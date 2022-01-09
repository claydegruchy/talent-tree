var fs = require('fs');
var fetch = require('node-fetch');

var courses = JSON.parse(fs.readFileSync('./courses2.json').toString());
var progress = JSON.parse(fs.readFileSync('./courses-full.json').toString());

var ids = courses.map((c) => c.code);
var activeCourses = courses.filter((c) => c.state != 'CANCELLED');

console.log(activeCourses.length);

console.log(activeCourses[2]);

function chunkArrayInGroups(arr, size) {
	var myArray = [];
	for (var i = 0; i < arr.length; i += size) {
		myArray.push(arr.slice(i, i + size));
	}
	return myArray;
}

var req = {
	mem: progress,
	url: 'https://api.kth.se/api/kopps/v2/',
	get: async function (code) {
		if (!this.mem[code]) {
			var url = this.url + `course/${code}/detailedinformation?l=en`;
			// console.log(url);
			var res = await fetch(url).then((r) => {
				if (!r.ok) throw 'failed';
				return r.json();
			});
			this.mem[code] = res;
		}

		return this.mem[code];
	},
};

async function downloadCourses() {
	var chunkSize = 100;

	var chunks = chunkArrayInGroups(activeCourses, chunkSize);

	console.log(chunks.length);

	var bulk = [];

	for (var chunk of chunks) {
		console.log('starting new chunk');
		console.time('chunk');
		for (var course of chunk) {
			bulk.push(req.get(course.code));
			// var { courseCode, prerequisites, credits } = course.course;
			// console.log({ courseCode, prerequisites, credits });
			// console.log(course.course);
		}

		await Promise.all(bulk);

		console.log('saving chunk');

		fs.writeFileSync(
			'./courses-full.json',
			JSON.stringify(req.mem, null, 2)
		);
		console.timeEnd('chunk');
		console.log('chunk compelted');
	}

	console.log('done');
}

(async () => {
	var courses = Object.entries(req.mem).filter(
		([k, v]) => v.course.prerequisites
	);
	console.log(courses.length);

	console.log('asd', ids[2]);

	var prereq = [];
	for (var [code, obj] of courses) {
		// console.log(obj.course.prerequisites)
		var find = ids.filter((id) => obj.course.prerequisites.includes(id));
		if (find.length>0) {

		console.log(code, find);
		}
	}

	console.log(prereq.length);
})();
