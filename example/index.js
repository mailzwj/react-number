import React, { Component } from 'react';
import { render } from 'react-dom';

import ReactNumber from '../ReactNumber.min';

import './index.less';

class Demo extends Component {
    constructor() {
        super();

        this.state = {
            number: 0
        }

        setInterval(() => {
            this.setState({
                number: Math.floor(Math.random() * 192000) + 500
            });
        }, 1500);
    }

    render() {
        return <ReactNumber className="my-class" number={this.state.number} />;
    }
}

const page = document.createElement('div');
document.body.appendChild(page);

render(<Demo />, page);
