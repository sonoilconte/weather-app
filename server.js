const path = require('path');
const express = require('express');
const app = express();

const publicPath = path.join(__dirname, 'client', 'build');

const PORT = process.env.PORT || 5000;

app.use(express.static(publicPath));

app.get('/', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'))
});

app.get('/foo', (req, res) => {
	console.log(' SERVER SANITY!!!!');
	res.send('Sanity foo');
	// res.json({ foo: 'bar' });
});

app.listen(PORT, () => {
	console.log(`Express server listening on port ${PORT}`);
});