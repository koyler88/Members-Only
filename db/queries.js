const pool = require("./pool");
const bcrypt = require("bcryptjs");

async function checkforuser(username) {
  const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  if (result.rows.length > 0) {
    return true;
  } else {
    return false;
  }
}

async function createuser(info) {
  const hashedPassword = await bcrypt.hash(info.password, 10);
  await pool.query(
    `INSERT INTO users (fname, lname, username, password) VALUES ($1, $2, $3, $4)`,
    [info.fname, info.lname, info.username, hashedPassword]
  );
}

async function verifyPassword(username, password) {
  const userPassword = await pool.query(
    `SELECT password FROM users WHERE username = $1`,
    [username]
  )
  const storedHash = userPassword.rows[0].password
  const isMatch = await bcrypt.compare(password, storedHash)

  return isMatch;
}

async function getPosts() {
  const posts = await pool.query(`SELECT * FROM posts`)
  return posts.rows
}

async function createPost(title, message, username) {
  await pool.query(`INSERT INTO posts (date, message, title, author) VALUES ($1, $2, $3, $4)`, 
    [new Intl.DateTimeFormat("en-US").format(new Date()), message, title, username]
  )
}

async function getAuthor(postId) {
  const result = await pool.query(`SELECT author FROM posts WHERE id = $1`, [postId])
  return result.rows[0].author
}

async function deletePost(postId) {
  await pool.query(`DELETE FROM posts WHERE id = $1`, [postId])
}

async function giveMembership(id) {
  await pool.query(`UPDATE users SET member = 't' WHERE id = $1`, [id])
}

module.exports = {
  checkforuser,
  createuser,
  verifyPassword,
  getPosts,
  createPost,
  getAuthor,
  deletePost,
  giveMembership
};
