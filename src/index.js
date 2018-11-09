import React, { Component } from 'react';

import './index.less';

class ReactNumber extends Component {
    constructor() {
        super();
        this.state = {
            number: 0,
            numberArray: [],
            numberState: []
        };
        this.uid = 0;
        this.positionId = ['g', 's', 'b', 'q', 'w', 'sw', 'bw', 'qw', 'y', 'sy', 'by', 'qy', 'wy'];
    }

    componentDidMount() {
        const _props = this.props || {};
        this.initState(_props.number);
    }

    componentWillReceiveProps(nextProps) {
        const _props = this.props || {};
        if (_props.number !== nextProps.number) {
            this.initState(nextProps.number);
        }
    }

    initState = (number) => {
        const _state = this.state || {};
        const numberState = _state.numberState || [];
        const nse = numberState.length - 1;
        number = number || 0;
        const source = this.numberToArray(number);
        let count = 0;
        let stateArray = [];
        for (let end = source.length - 1; end >= 0; end--) {
            const se = source[end];
            const ne = numberState[nse - count];
            let subState;
            count++;
            if (ne && ne.end !== se) {
                subState = {
                    start: ne.end,
                    end: se
                };
            } else {
                subState = {
                    start: se,
                    end: se
                };
            }
            stateArray.unshift(subState);
        }
        let newState = {
            number: number,
            numberArray: source,
            numberState: stateArray
        };

        this.setState(newState);
    }

    numberToArray = (number) => {
        number = ('' + number)
        if (number.indexOf('.') === -1) {
            number = number.replace(/\B(?=(\d{3})+$)/g, ',');
        }
        const numArr = number.split('');
        return numArr;
    }

    addItem = (no) => {
        let rs = [];
        if (no.start === no.end) {
            rs.push(<span className="rn-num" key={`uid-${this.uid++}`}>{no.end}</span>);
        } else {
            const start = parseInt(no.start || 0);
            for(let i = 0; i < 10; i++) {
                rs.push(<span className="rn-num" key={`num-${i}`}>{(start + i) % 10}</span>);
            }
        }
        return rs;
    }

    render() {
        const _props = this.props || {};
        const _state = this.state || {};
        if (!('number' in _props)) {
            return '';
            // throw 'number props required';
        }
        const numberState = _state.numberState;
        const total = numberState.length;
        const commaTotal = Math.floor(total / 4);
        let commaCount = 0;
        let unit = this.positionId.slice(0, numberState.length - commaTotal);
        unit.reverse();
        return (
            <div className={`rn-wrapper${_props.className ? ' ' + _props.className : ''}`}>
                {
                    numberState.map((n, i) => {
                        let offset = parseInt(n.end) - parseInt(n.start);
                        if (offset < 0) {
                            offset += 10;
                        }
                        let id;
                        let commaClass;
                        if (n.end === ',') {
                            commaCount++;
                            id = this.uid++;
                            commaClass = true;
                        } else {
                            id = unit[i - commaCount];
                            commaClass = false;
                        }
                        return (
                            <div className={`rn-item${commaClass ? (_props.showComma ? '' : ' hide-comma') : ''}`}
                                key={`rn-item-${id}`}
                                style={n.start === n.end ? null : {transform: `translate(0, -${offset * 10}%)`}}
                            >
                                { this.addItem(n) }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default ReactNumber;
