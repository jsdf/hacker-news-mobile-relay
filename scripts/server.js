const IsomorphicRelay = require('isomorphic-relay');

var express = require('express');
var app = express();

app.get('/', (req, res, next) => {
  IsomorphicRelay.prepareData(rootContainerProps, networkLayer).then({data, props} => {
    const reactOutput = ReactDOMServer.renderToString(
      <IsomorphicRelay.Renderer {...props} />
    );
 
    res.render('index.ejs', {
      preloadedData: JSON.stringify(data),
      reactOutput
    });
  }).catch(next);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
