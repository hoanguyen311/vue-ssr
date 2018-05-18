const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const server = express();
const renderer = createBundleRenderer(serverBundle, {
  template: require('fs').readFileSync('./index.template.html', 'utf-8'),
  clientManifest,
  runInNewContext: 'once'
});
server.use('/dist', express.static('./dist'));
server.get('*', (req, res) => {
  const context = { url: req.url };
  renderer.renderToString(context, (error, html) => {
    if (error) {
      if (error.code === 404) {
        res.status(404).end('Page not found');
      } else {
        res.status(500).end('Internal Server Error');
      }

      console.log(error);
    } else {
      res.end(html);
    }
  });
});


server.listen(8000).listen(() => {
  console.log('http://localhost:8000');
});
