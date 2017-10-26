import initDevTools from 'src/devtools';
import Bridge from 'src/bridge';

initDevTools({
	connect(cb) {
		injectScript(chrome.runtime.getURL('build/backend.js'), () => {
			const port = chrome.runtime.connect({
				name: '' + chrome.devtools.inspectedWindow.tabId
			});
			let disConnected = false;
			port.onDisconnect.addListener(() => {
				disConnected = true;
			});

			const bridge = new Bridge({
				listen(fn) {
					port.onMessage.addListener(fn);
				},
				send(data) {
					if (!disConnected) {
						port.postMessage(data);
					}
				}
			});
			cb(bridge);
		});
	},
	onReload (reloadFn) {
    	chrome.devtools.network.onNavigated.addListener(reloadFn)
  	}
});

function injectScript (scriptName, cb) {
  const src = `
    (function() {
      var script = document.constructor.prototype.createElement.call(document, 'script');
      script.src = "${scriptName}";
      document.documentElement.appendChild(script);
      script.parentNode.removeChild(script);
    })()
  `
  chrome.devtools.inspectedWindow.eval(src, function (res, err) {
    if (err) {
      console.log(err)
    }
    cb()
  })
}
