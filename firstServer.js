const fs = require('fs');
const http = require('http');
// Handle url address:
const url = require('url');


// Top Level
// Code will be executed once an the beginning:
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataArray = JSON.parse(data);

// Create Server:
const server = http.createServer((request,response) => {
    const address = request.url;

    switch(address){
        case '/':
            response.end('Welcome to the Home page!');
            break;
        case '/home':
            response.end('Welcome to the Home page!');
            break;
        case '/gallery':
            response.end('Our beautifull Gallery');
            break;
        case '/api':
            response.writeHead(200, {'Content-type' : 'application/json'});
            response.end(data);
            break;
        default:
            // Handler 404 Error:
            response.writeHead(404,{
                'Content-type' : 'text/html',
                'some-private-data' : 'my-meta-data'
            })
            response.end('<h1>Cannot find this page! <i>Please try again...</i></h1>')
    }
    
});

// Listening 
// 'port: 8080', 'IP: 127,0,0,1', 'result: callback':
server.listen(3000, '127.0.0.1', () => {
    console.log('The server is listened on port: 3000');
});
