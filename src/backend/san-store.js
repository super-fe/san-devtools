export function initSanStoreBackend(hook, bridge) {
	const store = hook.sanStore;
	let recording = true;

	const getSnapShot = store.raw;

	hook.off('san-store:dispatch');

	hook.on('san-store:dispatch', payload => {
		if (!recording) return ;
		console.log('san-store:dispatch');
		console.log(payload);
		bridge.send('san-store:dispatch', payload);
	});

	bridge.send('san-store:baseState', getSnapShot);

	hook.on('san-store:dispatch-state-change', payload => {
		if (!recording) return ;
		bridge.send('san-store:dispatch-state-change', payload);
	});


	bridge.on('san-store:travel-to-state', state => {
		hook.emit('san-store:travel-to-state', state);
	});

	bridge.on('san-store:toggle-recording', enable => {
		recording = enable;
	});
}
