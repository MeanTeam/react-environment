import React from 'react';
import {ServerRouter} from 'react-router';
import Pages from './containers/Page.jsx';


let Router = (url, context) => {

    return (
        <ServerRouter location={url} context={context}>
            <Pages />
        </ServerRouter>
    );

};

export default Router;