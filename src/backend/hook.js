/**
* Install hook in every page.
*/

export function installHook() {
	let listeners = {};

	const hook = {
		san: null,
		sanStore: null,
		on(event, fn) {
			event = '$' + event;
			if (!listeners[event]) {
				listeners[event] = [];
			}
			listeners[event].push(fn);
		},
		once(event, fn) {
			event = '$' + event;
			function on() {
				this.off(event, on);
				fn.apply(this, arguments);
			}
			if (!listeners[event]) {
				listeners[event] = [];
			}
			listeners[event].push(on);
		},
		off(event, fn) {
			event = '$' + event;
			if (!arguments.length) {
				listeners = {};
			} else {
				const cbs = listeners[event];
				if (cbs) {
					if (!fn) {
						listeners[event] = null;
					} else {
						let l = cbs.length;
						for (let i = 0; i < l; i++) {
							const cb = cbs[i];
							if (cb === fn) {
								cbs.splice(i, 1);
								break;
							}
						}
					}
				}
			}
		},
		emit(event) {
			event = '$' + event;
			let cbs = listeners[event];
			if (cbs) {
				const args = [].slice.call(arguments, 1);
				cbs = cbs.slice();
				for (let i = 0; i < cbs.length; i ++) {
					cbs[i].apply(this, args);
				}
			}
		}
	};

	hook.once('san:init', san => hook.san = san);
	hook.once('san-store:init', sanStore => hook.sanStore = sanStore);

	Object.defineProperty(window, '__SAN_DEVTOOLS_GLOBAL_HOOK__', {
		get() {
			return hook;
		}
	});
}
