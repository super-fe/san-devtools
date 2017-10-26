/**
*	install hook into every page.
**/

import { installHook } from 'src/backend/hook';

if (document instanceof HTMLDocument) {
	const script = document.createElement('script');
	script.textContent = ';(' + installHook.toString() + ')(window);';
	document.documentElement.appendChild(script);
	script.parentNode.removeChild(script);
}
