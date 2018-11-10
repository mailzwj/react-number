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
        number = number || 0;
        const source = this.numberToArray(number);
        let newState = {
            number: number,
            numberArray: source
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

    addItem = () => {
        let rs = [];
        for(let i = 0; i < 10; i++) {
            rs.push(<span className="rn-num" key={`num-${i}`}>{i}</span>);
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
        const numberArray = _state.numberArray;
        const total = numberArray.length;
        const commaTotal = Math.floor(total / 4);
        let commaCount = 0;
        let unit = this.positionId.slice(0, total - commaTotal);
        unit.reverse();
        return (
            <div className={`rn-wrapper${_props.className ? ' ' + _props.className : ''}`}>
                {
                    numberArray.map((n, i) => {
                        const isNotNum = isNaN(parseInt(n));
                        let offset = parseInt(n) * 10;
                        let id;
                        let commaClass;
                        if (isNotNum) {
                            commaCount++;
                            id = this.uid++;
                            if (n === ',') {
                                commaClass = true;
                            } else {
                                commaClass = false;
                            }
                        } else {
                            id = unit[i - commaCount];
                            commaClass = false;
                        }
                        return (
                            <div className={`rn-item${commaClass ? (_props.showComma ? '' : ' hide-comma') : ''}`}
                                key={`rn-item-${id}`}
                                style={isNotNum ? null : {transform: `translate(0, -${offset}%)`}}
                            >
                                { isNotNum ? <span className="rn-num" key={this.uid++}>{n}</span> : this.addItem() }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default ReactNumber;
