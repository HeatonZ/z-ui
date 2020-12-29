import React from 'react';
import { render } from 'react-dom';
import { Button } from '../../components';
var App = function () {
    return React.createElement(Button, null);
};
render(React.createElement(App, null), document.querySelector('#app'));
