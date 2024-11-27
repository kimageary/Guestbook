// Get the express package 
const express = require('express');
const mariadb = require('mariadb');

// Instantiate an express (web) app
const app = express();

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'guestbook'
});

async function connect(){
    try{
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    } catch(err){
        console.log('Error connecting to the database: ' + err);
    }
}


// Define a port number for the app to listen on
const PORT = 3000;

// Tell the app to encode data into JSON format
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Set your view (templating) engine to "EJS"
// (We use a templating engine to create dynamic web pages)
app.set('view engine', 'ejs');

// Define a "default" route, 
// e.g. jshmo.greenriverdev.com/reservation-app/
app.get('/', (req, res) => {
	// Log message to the server's console
	console.log("Hello, world - server!");

    // Return home page
    res.render('home');
});

// Define a "confirm" route, using the POST method
app.post('/confirm', async(req, res) => {
    // Get the data from the form that was submitted
    // from the body of the request object
    const data = req.body;
    const conn = await connect();

    await conn.query(
        `INSERT INTO entries (first_name, last_name, job_title, company, linkedIN, email, meet_options, other, message, mailing_list)
        VALUES('${data.first_name}', '${data.last_name}', '${data.job_title}', '${data.company}', 
        '${data.linkedIN}', '${data.email}', '${data.meet_options}', '${data.other}','${data.message}', '${data.mailing_list}')`
    );
    // Display the confirm page, pass the data
    res.render('success', { details: data });
})

app.get('/admin', async(req, res) =>{
    const conn = await connect();
    const results = await conn.query(
        `SELECT * FROM entries ORDER BY date_submitted DESC`);
    
        res.render('admin', {entries: results})
})

// Tell the app to listen for requests on the designated port
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});
