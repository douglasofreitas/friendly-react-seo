import express from "express"
import cors from "cors"
import { renderToString } from "react-dom/server"
import App from '../shared/App'
import React from 'react'
import serialize from "serialize-javascript"
import { StaticRouter, matchPath } from "react-router-dom"
import routes from '../shared/routes'

const app = express()

app.use(cors())

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"))

app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data }

    const markup = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App data={data}/>
    </StaticRouter>
    )

    let metaTags = `
      <title>$OG_TITLE</title>
      <meta property="og:title"       content="$OG_TITLE" />
      <meta name="description"        content="$OG_DESCRIPTION" />
      <meta property="og:description" content="$OG_DESCRIPTION" />
      <meta property="og:image"       content="$OG_IMAGE" />`;
    
    //fill meta tags
    if (data.metaTitle) metaTags = metaTags.replace(/\$OG_TITLE/g, data.metaTitle);
    if (data.metaDescription) metaTags = metaTags.replace(/\$OG_DESCRIPTION/g, data.metaDescription);
    if (data.metaImage) metaTags = metaTags.replace(/\$OG_IMAGE/g, data.metaImage);

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
          ${metaTags}
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)
  }).catch(next)

})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})