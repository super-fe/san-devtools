import CircularJSON from 'circular-json-es6'

export function stringify (data) {
	return CircularJSON.stringify(data);
}

export function parse () {
	return CircularJSON.parse(data);
}
