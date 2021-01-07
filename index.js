const fs = require('fs');
const url = require('url');
const http = require('http');
const replaceTemplate = require('./modules/replaceTemplate');

// Template Elements:
const mainPage  = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const productCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const productCardFull = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

// API Data:
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productList = JSON.parse(data);

// Server:
// Request/Response:
const server = http.createServer((request,response) => {
    const {pathname, query } = url.parse(request.url, true);
    
    switch(true){
        // Home page:
        case pathname === '/' || pathname === '/overview':
            response.writeHead(200, {'Content-type' : 'text/html'});
            const products = productList.map(listItem => replaceTemplate(productCard, listItem)).join('');
            const overviewPage = mainPage.replace(/{%PRODUCT_CARD%}/,products);

            response.end(overviewPage);
            break;
        // Overview Page:
        case pathname === '/product':
            response.writeHead(200, {'Content-type' : 'text/html'});
            const product = productList[query.id];
            const productDetailsPage = replaceTemplate(productCardFull, product);
            response.end(productDetailsPage);
            break;
    // Error Page:
        default:
            response.writeHead(404, {'Content-type' : 'text/html'})
            response.end('<h1>Sorry, we cannot find this page!</h1>\n <p>Please, try againe...</p>');
    }

});

// Listening:
server.listen(3000,'127.0.0.1', () => {
    console.log('Server runs on port: 3000');
});