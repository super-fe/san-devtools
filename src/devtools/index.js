import App from './App';
import { store } from 'san-store';

let app = null;

export default function initDevtools(shell) {
	initApp(shell);
	shell.onReload(() => {
		if (app !== null) {
			app.detach();
		}
		bridge.removeAllListeners();
		initApp(shell);
	});
}

function initApp(shell) {
	shell.connect(bridge => {
		window.bridge = bridge;

		bridge.once('ready', version => {
			bridge.send('san-store:toggle-recording', store.getState('enableRecording'));
		});

		bridge.once('proxy-fail', () => {
			store.dispatch('receive-proxy-fail', 'Proxy injection failed.');
		});

		bridge.once('san:init', sanVersion => {
			store.dispatch('receive-init', sanVersion);
		});
		bridge.once('san-store:init', sanStore => {
			store.dispatch('receive-init', sanStore);
		});

		bridge.once('san-store:baseState', baseState => {
			store.dispatch('receive-baseState', baseState);
		});

		bridge.on('san-store:dispatch', payload => {
			store.dispatch('receive-dispatch', payload);
		});

		app = new App();
		app.attach(document.body);
	});
}
