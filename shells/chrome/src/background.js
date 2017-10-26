const ports = {};

chrome.runtime.onConnect.addListener(port => {
	let tab;
	let name;
	if (isNumeric(port.name)) {
		tab = port.name;
		name = 'devtools';
		installProxy(+port.name);
	} else {
		tab = port.sender.tab.id;
		name = 'backend';
	}

	if (!ports[tab]) {
		ports[tab] = {
			devtools: null,
			backend: null
		};
	}
	ports[tab][name] = port;

	if (ports[tab].devtools && ports[tab].backend) {
		doublePipe(tab, ports[tab].devtools, ports[tab].backend);
	}
});

function isNumeric(str) {
	return +str + '' === str;
}

function installProxy(tabId) {
	chrome.tabs.executeScript(tabId, {
		file: '/build/proxy.js'
	}, res => {
		if (!res) {
			ports[tabId].devtools.postMessage('proxy-fail');
		} else {
			console.log('injected proxy to tab ' + tabId);
		}
	});
}

function doublePipe(id, one, two) {
	one.onMessage.addListener(lOne);
	function lOne(msg) {
		if (msg.event === 'log') {
			return console.log('tab ' + id, msg.payload);
		}
		console.log('devtools -> backend', msg);
		two.postMessage(msg);
	}
	two.onMessage.addListener(lTwo);
	function lTwo(msg) {
		if (msg.event === 'log') {
			return console.log('tab ' + id, msg.payload);
		}
		console.log('backend ->  devtools', msg);
		one.postMessage(msg);
	}
	function shutdown() {
		console.log('tab' + id + 'disconnected.');
		one.onMessage.removeListener(lOne);
		two.onMessage.removeListener(lTwo);
		one.disconnect();
		two.disconnect();
		ports[id] = null;
	}
	one.onDisconnect.addListener(shutdown);
	two.onDisconnect.addListener(shutdown);

	console.log('tab ' + id + ' connected.');
}

chrome.runtime.onMessage.addListener((msg, sender) => {
	if (msg.sanDetected && sender.tab) {
		chrome.browserAction.setPopup({
			tabId: sender.tab.id,
			popup: msg.sanDetected ? 'popups/enable.html' : 'popups/not-found.html' 
		});
	}
});
