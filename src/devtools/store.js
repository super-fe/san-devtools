import { store } from 'san-store';
import { updateBuilder } from 'san-update';

store.addAction('receive-init', (init_para, {getState, dispatch}) => {
	if (init_para === 'sanStore') {
		return updateBuilder().set('sanStore', true);
	} else {
		return updateBuilder().set('san', init_para);
	}
});

store.addAction('receive-baseState', (baseState, {getState, dispatch}) => {
	if (!getState('sanStore') && !getState('san')) {
		return;
	}
	dispatch('init_actionList');
	return updateBuilder().push('actionList', {
		name: 'Base State',
		state: baseState,
		startTime: new Date()
	});
});

store.addAction('init_actionList', () => {
	return updateBuilder().set('actionList', new Array());
});

store.addAction('receive-dispatch', (payload, {getState, dispatch}) => {
	if (!getState('sanStore') && !getState('san')) {
		return;
	}
	return updateBuilder().push('actionList', payload);
});

store.addAction('receive-proxy-fail', (payload) => {
	return updateBuilder().set('failMsg', payload);
});
