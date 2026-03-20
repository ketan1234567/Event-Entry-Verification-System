const mysql = require('mysql2');

// 1. Database Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Your DB User
    password: '',      // Your DB Password
    database: 'event_entry' // Your DB Name
});

// 2. Function to generate 5000 unique 4-digit codes
function generateUniqueCodes(count) {
    const allPossibleCodes = [];

    // Create all 10,000 possibilities (0000 to 9999)
    for (let i = 0; i <= 9999; i++) {
        const code = i.toString().padStart(4, '0');
        allPossibleCodes.push(code);
    }

    // Shuffle them randomly
    for (let i = allPossibleCodes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allPossibleCodes[i], allPossibleCodes[j]] = [allPossibleCodes[j], allPossibleCodes[i]];
    }

    // Return the first 5000
    return allPossibleCodes.slice(0, count);
}

// 3. Main Execution
const numberOfCodes = 5000;
const codesToInsert = generateUniqueCodes(numberOfCodes);

console.log(`Preparing to insert ${codesToInsert.length} codes...`);

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to database.");

    // SQL Query to match your specific columns
    // gate_code = the code
    // is_active = 0 (default)
    // is_used = NULL (empty)
    // generated_on = NULL (empty initially, will be set on click)
    const sql = "INSERT INTO gate_passes (gate_code, is_active, is_used, generated_on) VALUES ?";
    
    // Map codes to the values array
    const values = codesToInsert.map(code => [code, 0, null, null]);

    connection.query(sql, [values], (err, result) => {
        if (err) {
            console.error("Error inserting codes:", err.message);
        } else {
            console.log(`Success! ${result.affectedRows} codes inserted.`);
        }
        
        connection.end();
    });
});