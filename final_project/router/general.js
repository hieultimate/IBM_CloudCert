const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
let myPromise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(
            public_users.get('/',function (req, res) {
            res.send(JSON.stringify(books,null,4));
            });
        )},6000)})


// Get book details based on ISBN
let myPromise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(
            public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 });
 )},6000)})
  
// Get book details based on author
let myPromise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(
            public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const booksArray = Array.from(books);
    let filtered_users = booksArray.filter((user) => user.author === author);
    res.send(filtered_users);
});
)},6000)})

// Get all books based on title
let myPromise4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(
            public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const booksArray = Array.from(books);
    let filtered_users = booksArray.filter((user) => user.title === title);
    res.send(filtered_users);
});
)},6000)})
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const booksArray = Array.from(books);
    let filtered_users = booksArray.filter((user) => user.isbn === isbn);
    const books2 = Object.fromEntries(filtered_users);
    res.send(books2[reviews]);
});

module.exports.general = public_users;
