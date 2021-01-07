const fs = require('fs');
const url = require('url');
const http = require('http');

// Template Elements:
const mainPage  = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const productCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const productCardFull = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

// API Data:
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productList = JSON.parse(data);

// Helpers:
function generateProducts (card, product){
    let output = card.replace(/{%PRODUCT_NAME%}/g, product.name);
    output = output.replace(/{%PRODUCT_ID%}/g, product.id);
    output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image);
    output = output.replace(/{%PRODUCT_NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRODUCT_PRICE%}/g, product.price);
    output = output.replace(/{%PRODUCT_FROM%}/g, product.from);
    output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);

    if(!product.organic) output = output.replace(/{%NON_ORGANIC%}/g,'not-organic');
    return output;
}


// Server:
// Request/Response:
const server = http.createServer((request,response) => {
    const {pathname, query } = url.parse(request.url, true);
    
    switch(true){
        // Home page:
        case pathname === '/' || pathname === '/overview':
            const products = productList.map(listItem => generateProducts(productCard, listItem)).join('');
            const overviewPage = mainPage.replace(/{%PRODUCT_CARD%}/,products);

            response.end(overviewPage);
            break;
        // Overview Page:
        case pathname === '/product':
            const product = productList[query.id];
            const productDetailsPage = generateProducts(productCardFull, product);
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