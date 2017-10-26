import { initSanStoreBackend } from './san-store';
import path from 'path';

const hook = window.__SAN_DEVTOOLS_GLOBAL_HOOK__;
let bridge;

export function initBackend(_bridge) {
	bridge = _bridge;

	if (hook.san && hook.sanStore) {
		bridge.send('san:init', 'San:' + hook.san.version);
		bridge.send('san-store:init', 'sanStore');

		initSanStoreBackend(hook, bridge);
		console.log('San Devtools is ready.');
	} else {
		hook.once('san:init', san => {
			bridge.send('san:init', 'San:' + san.version);
		});
		hook.once('san-store:init', sanStore => {
			bridge.send('san-store:init', 'sanStore');
			
			initSanStoreBackend(hook, bridge);
			console.log('San Devtools is ready.');
		});
	}
}
