export function insertChildb(data, self) {
	self.data.set(path + '.isExpand', true);
	self.data.set(path + '.child', []);
	for (key in data) {
		const type = typeof data[key];
		switch (type) {
			case 'object':
				if (Array.isArray(data[key])) {
					self.data.push(path + '.child', {
						key: key,
						value: data[key],
						type: 'Array',
						path: ,
						deep: deep + 1,
						isExpand: false,
						child: []
					});
				} else {
					self.data.push(path + '.child', {
						key: key,
						value: data[key],
						type: 'Object',
						path: ,
						deep: deep + 1,
						isExpand: false,
						child: []
					});
				}
				break;
			case 'Function':
				self.data.push(path + '.child', {
					key: key,
					value: 'Function',
					path: ,
					deep: deep + 1
				});
				break;
			default:
				self.data.push(path + '.child', {
					key: key,
					value: 'Function',
					path: ,
					deep: deep + 1
				});
				break;
		}
	}
}
