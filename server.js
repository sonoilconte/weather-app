const path = require('path');
const express = require('express');
const app = express();
const { weatherRequest } = require('./weatherRequest');

const PORT = process.env.PORT || 5000;

// Tell express to serve static (React) files from the production build location 
const buildPath = path.join(__dirname, 'client', 'build');
app.use(express.static(buildPath));

app.get('/', (req, res) => {
	res.sendFile(path.join(buildPath, 'index.html'))
});

app.get('/foo', (req, res) => {
	console.log(' SERVER SANITY!!!!');
	res.send('Sanity foo');
	// res.json({ foo: 'bar' });
});

app.get('/api', weatherRequest);

app.listen(PORT, () => {
	console.log(`Express server listening on port ${PORT}`);
});