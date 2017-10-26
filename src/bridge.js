// The bridge in communication
import { EventEmitter } from 'events';

export default class bridge extends EventEmitter {
	constructor(wall) {
		super();
		const self = this;
		self.setMaxListeners(Infinity);
		self.wall = wall;
		wall.listen(msg => {
			if (typeof msg === 'string') {
				self.emit(msg);
			} else {
				self.emit(msg.event, msg.payload);
			}
		});
	}
	send(event, payload) {
		this.wall.send({
			event,
			payload
		});
	}
	log(msg) {
		this.send('log', msg);
	}
} 
