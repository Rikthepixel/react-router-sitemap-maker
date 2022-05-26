# react-router-sitemap-maker

Generates a sitemap from react-router-dom routes

## Usage

### Routes layout

The sitemap generator expects a Routes element containing one or multiple Route elements in it. Like the following example:

```javascript
// src/routes.jsx
import { Routes, Route } from "react-router-dom";

const MyRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<AnyElement />}></Route>
			<Route index element={<AnyElement />} />
			<Route path="Contact" element={<AnyElement />} />
			<Route path="*" element={<AnyElement />} />
		</Routes>
	);
};
```

> _Note: The Routes cannot be wrapped in a HashRouter or a BrowserRouter, because this requires the DOM, thus the code cannot be ran server side._

### Creating the builder file

To create the sitemap you need a builder file.

You can possibly run this after you ran the actual build and put the sitemap in the **dist** or the **build** folder.

Alternatively you could run it before the building process and put it in the **public** folder.

```javascript
// builders/sitemap.js

import GenerateSitemap from "react-router-sitemap-maker";
import Routes from "../src/routes";

const sitemapData = await GenerateSitemap(Routes(), {
	baseUrl: "https://rikthepixel.github.io",
	hashrouting: true,
	changeFrequency: "monthly"
});

sitemapData.toFile("./dist/sitemap.xml");
```

### Run the builder

These are _some_ possible ways to run the sitemap builder file.

#### **Using babel-node**:

(Additional setup may be required to get babel-node to run JSX)

```shell
babel-node ./builders/sitemap.js
```

#### **Using vite-node**:

(vite-node should run JSX out of the box)

```shell
vite-node ./builders/sitemap.js
```
