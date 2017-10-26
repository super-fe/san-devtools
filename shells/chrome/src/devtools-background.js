// called when open devtools
let created = false;
let checkCount = 0;

chrome.devtools.network.onNavigated.addListener(createSanDevPanel);
const checkSanInterval = setInterval(createSanDevPanel, 1000);
createSanDevPanel();

function createSanDevPanel() {
	if (created || checkCount > 10) {
		return ;
	}
	chrome.devtools.inspectedWindow.eval(
		'!!(window.__SAN_DEVTOOLS_GLOBAL_HOOK__.san)',
		function(hasValue) {
			if (!hasValue || created) {
				return ;
			}
			clearInterval(checkSanInterval);
			created = true;
			chrome.devtools.panels.create('San', '', 'devtools.html');
		}
	);
}
