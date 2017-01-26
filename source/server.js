import http from 'http';
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import Router from './pages/ServerRouter.jsx';
import {createServerRenderContext} from 'react-router';
import Layout from './pages/components/Layout.jsx';

function requestHandler(req, res) {
    const context = createServerRenderContext();

    let html = renderToString(
        Router(req.url, context)
    );

    const result = context.getResult();
    res.setHeader('Content-type', 'text/html');

    if (result.redirect) {
        res.writeHead(301, { // 301 = redirect
            Location: result.redirect.pathname,
        });
        res.end();
    }

    // 404
    if (result.missed) {
        res.writeHead(404);

        html = renderToString(
            Router(req.url, context)
        );
    }

    res.write(
        renderToStaticMarkup(
            <Layout
                title="App Demo"
                content={html}
            />
        )
    );
    res.end();
}

const PORT = process.env.PORT || 3000;
const server = http.createServer(requestHandler);
const onListening = () => {
    console.log(`Listening server on port: ${PORT}`);
};

server.on('listening', onListening);

server.listen(PORT);