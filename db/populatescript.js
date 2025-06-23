const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    fname VARCHAR(20),
    lname VARCHAR(20),
    username VARCHAR (50) UNIQUE,
    password VARCHAR (100),
    member BOOLEAN DEFAULT FALSE
    );
    
    INSERT INTO users (fname, lname, username, password, member) VALUES 
  ('joe', 'non', 'joey1', '123', 'False'), 
  ('joe', 'mem', 'joey2', '123', 'True');

    CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    date VARCHAR(100),
    message VARCHAR(300),
    title VARCHAR(50),
    author VARCHAR(50)
    );

    INSERT INTO posts (date, message, title, author) VALUES 
  ('June 18', 'Hello! i am a non-member', 'My first post!', 'joey1'), 
  ('June 18', 'Hello! I am part of this club!', 'My first post as a member!', 'joey2');

    `;

async function main() {
    console.log("Seeding...")
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    })
    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log("Done!")
}

main();
