const express = require('express');
const path = require('path');
const axios = require('axios');
const Handlebars = require('handlebars');
const app = express();


const source = `
{{#articles}}
<div class="news-item">
	<img src="{{urlToImage}}"" alt="{{title}}">
	<h3>{{title}}</h3>
	<p>{{description}}</p>
	<a href="{{url}}" target="_blank">Ver mas</a>
</div>
{{/articles}}`

const template = Handlebars.compile(source)

require('dotenv').config();
const port = process.env.PORT | 1607;

app.use('/', express.static(path.join(__dirname, "public")));

app.get('/api', async (req, res) => {
	const response = await axios.get('https://newsapi.org/v2/everything?q=' + req.query.search + '&apiKey=' + process.env.NEWS_API_KEY);
	const data = response.data;
	res.send(template(data));
});

app.listen(port, () => {
	console.log('App running on: http://localhost:' + port);
});