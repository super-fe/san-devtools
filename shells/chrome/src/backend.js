import { initBackend } from 'src/backend';
import Bridge from 'src/bridge';

window.addEventListener('message', handshake);

function handshake(e) {
	if (e.data.source === 'san-devtools-proxy' && e.data.payload === 'init') {
		window.removeEventListener('message', handshake);
		let listeners = [];
		const bridge = new Bridge({
			listen(fn) {
				var listener = evt => {
					if (evt.data.source === 'san-devtools-proxy' && evt.data.payload) {
						fn(evt.data.payload);
					}
				};
				window.addEventListener('message', listener);
				listeners.push(listener);
			},
			send (data) {
				window.postMessage({
					source: 'san-devtools-backend',
					payload: data
				}, '*');
			}
		});
		bridge.on('shutdown', () => {
			listeners.forEach(listener => {
				window.removeEventListener('message', listener);
			});
			listeners = [];
		});
		initBackend(bridge);
	}
}
