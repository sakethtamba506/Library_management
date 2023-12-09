Project Description:

This project is a web application that has been built using Node.js, Express.js and MongoDB. This project provides an easy to use interface for working with a MongoDB database to manage books. The README file will take you through the installation process and tell you how to run the application.

Prerequisites:

Before starting with this program, you need to have the following items ready on your machine:

Node.js
MongoDB


Install Dependencies:

Open terminal in project directory and execute:
npm install

Running the Application:

Start the Server:

In the terminal, execute the command below to start up the server.
node server/app.js

Access the Application:

Go your web browser and type http://localhost:8080/client/index.html to get into its main page.


Usage
The site provides basic CRUD operations for managing books:

Retrieve Data:

Select “Retrieve Data” by which you send a GET request to the server then goes through books.js located in api folder. Also it retrieves data from mongodb using its module named mongodb.
New Data:

Click on “New Data” which opens form where one can input details about book. On submission, the server checks if there are other similar books (other fields are placeholders) existing with similar title before storing data.

Choose a book to update by clicking on “Update”. Once done, fill in the form with the updated details and submit it. The server then updates the data.


Note:
The implementation currently checks for similar books only based on title. Other fields (author, edition, language) are mentioned but not implemented.



Future Upgrades:

Data can also be filtered by keywords or similar words through elastic search or we can also break books into batches aswell to make it easier for searching 

This will also enable us have a record of people who have borrowed the book from the library and how many books are remaining in the library.

This upgraded version of the project changes it into an online library whereby members can upload and view any book in a PDF format. It is built using Node.js, Express.js and MongoDB. Users can upload PDFs and then right side of the webpage shows the uploaded books along with others in the library.







