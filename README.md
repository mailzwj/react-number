## React 数字切换插件

### 预览

![ReactNumber](./number.gif)


### 安装

```shell
npm install --save react-number
```

### 使用示例

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactNumber from 'react-rand-number';

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
        return <ReactNumber className="my-class" number={this.state.number} showComma={true} />;
    }
}

const page = document.createElement('div');
document.body.appendChild(page);
render(<Demo />, page);
```

### props说明

* `number`: 用于显示的数字，必须是合法的数字
* `className`: 自定义样式类名，可用于覆盖默认样式
* `showComma`: 是否显示逗号分隔符，默认false

### DEMO演示

[平滑切换的数字](http://seejs.me/react-number/demo/index.html)
