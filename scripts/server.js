const IsomorphicRelay = require('isomorphic-relay');
 
app.get('/', (req, res, next) => {
  const rootContainerProps = {
    Container: MyContainer,
    queryConfig: new MyRoute(),
  };
 
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
