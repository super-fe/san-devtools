window.addEventListener('message', e => {
	if (e.source === window && e.data.sanDetected) {
		chrome.runtime.sendMessage(e.data);
	}
});

function detect(win) {
	setTimeout(() => {
		if (win.__SYS_SAN_APP_DETECTED_TARGET__ === 'san') {
			win.postMessage({
				sanDetected: true,
				devtoolsEnable: undefined
			}, '*');
		}
	}, 100);
}

if (document instanceof HTMLDocument) {
	const script = document.createElement('script');
	script.textContent = ';(' + detect.toString() + ')(window);';
	document.documentElement.appendChild(script);
	script.parentNode.removeChild(script);
}
