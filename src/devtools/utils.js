export function searchActionByName(actionName, actionList) {
	for (let i = actionList.length - 1; i >= 0; i --) {
		if (actionList[i].name === actionName) {
			return actionList[i];
		}
	}
}

const config = {
	rootKeyName: 'response',
    id: 'treeExample',
    aspectRatio: 0.8,
    isSorted: false,
    margin: {
        top: 50,
        left: 100
    },
    widthBetweenNodesCoeff: 1.5,
    heightBetweenNodesCoeff: 2,
    style: {
        'node': {
            colors: {
                collapsed: 'red',
                parent: '#01ff70',
                default: '#1FB3D5'
            },
            stroke: 'white'
        },
        'text': {
            colors: {
                default: '#A15AEC',
                hover: '#3DAAE0'
            },
            'font-size': '12px'
        },
        link: {
            stroke: '#188E3F',
            fill: 'none'
        }
    },
    tooltipOptions: {
        offset: {
            left: 50,
            top: 10
        },
        indentationSize: 2,
        style: {
            background: '#222',
            padding: '8px',
            color: '#4FDEE5',
            'border-radius': '2px',
            'box-shadow': '0 7px 7px 0 #111',
            'font-size': '13px',
            'line-height': '1.3'
        }
    }
};

export function makeConfig (state) {
	return Object.assign({}, {
		state: state
	}, config);
}
