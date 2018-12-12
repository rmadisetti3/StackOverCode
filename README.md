Heroku Link: https://stackovercode.herokuapp.com/

# Screenshot
![StackOverCode Screenshot](https://i.ibb.co/F6j1G7Q/Screen-Shot-2018-12-06-at-7-57-52-PM.png)

# StackOverCode
This is a project for a Coding Bootcamp. We are not profiting from this project. 

StackOverCode is a web app code editor, that allows you to search Stack Overflow directly from the editor. You simply type "//?" followed by the question and our web app will query stack exchange for an answer to your question.

For this project we were tasked with duplicating the yelp web app and having the following features:

* As a user, I want to be able to use a code editor that has proper syntax highlighting.
* As a user, I want to be able to ask a question as a comment to receive an answer from Stack Overflow.
* As a user, I want to be able to add highlighted code snippets from Stack Overflow where my original question was asked by pressing specific keys.

## Getting Started

To get started with this project you will need to clone into the repository on your machine. Once you have cloned the repository you will need to run `npm install` to install all of the needed packages to run the app. After you have installed the needed packages you can start a local server by running `npm start` in your terminal. Now you are ready run our app locally. 

### Prerequisites

You will need the following installed on your machine to be able to run our app:

* Node.js
* Express
* Code Mirror
* Stack Exchange
* Mocha/Chai

## Deployment

We have our app set to run on port 8080. If you prefer to use a different port feel free to change the port after cloning into the repository.

## Contributing

We are not currently accepting contributions to this project.

## Authors

* **Raj Madisetti** - Team Lead
  * Creating server, routes, and deploying to Heroku
  * Making index.html, style.css, and overall file architecture
  * Designing user interface of the web page
  * Supervising over the functions assigned to each group member

* **Tri Nguyen**
  * Worked on interfacing with Stack Exchange API
  * Worked on getting results to query, from Stack Exchange API
  * Worked on parsing query results to readable format
  * Worked on styling of query results to front-end
  
* **David Ye** - (title)
  * Created functions for interacting with CodeMirror
  * Created functions for detecting the //? question syntax
  * Created functions for selecting and replacing text in the editor
  * Added listeners to detect cursor activity to prompt an api query
  *  to stack overflow
  
* **Matthew Carpenter**
  * Assisted with stack exchange query
  * Assisted with HTML, CSS styles
  * Assisted with Testing
  
## License

This project is licensed under the MIT License

## Acknowledgments


