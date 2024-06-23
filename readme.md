<h3 align="center">LearnHub Guid
</h3>

---

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🧐 About ](#-about-)
- [🏁 Getting Started ](#-getting-started-)
  - [Prerequisites](#prerequisites)
  - [Installing:](#installing)
- [🎈 Usage ](#-usage-)
- [⛏️ Built Using ](#️-built-using-)
- [Data Flow ](#data-flow-)

## 🧐 About <a name = "about"></a>

This is a guide for who want to start the project locally on his/her machin,
please follow steps below to run the web application.


## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Visual Studio Code follow this <a href='https://code.visualstudio.com/download'>link</a> to install.
- Git Bash follow this <a href='https://git-scm.com/downloads'>link</a> to install.
- XAMPP follow this <a href='https://www.apachefriends.org/download.html'>link</a> to install.
- Node.js follow this <a href='https://nodejs.org/en'>link</a> to install (LTS preferlaby).

### Installing:

1. Clone the repo to your local machine using git bash.

```
git clone https://github.com/AhmadAlTarsha/LearnHub
```

2. Install packeges repeat this step in backend and frontend folder

```
npm i
```

3. Before running the application : 
    
    - Install Xampp, then open the Xampp control panel, start Apache and MysQl
    - From the browser copy this URL : http://localhost/phpmyadmin/
    - From the left Sidebar, click on New, add the database name : "resturant_task", and the collation : utf8_general_ci
    - From the navbar, click on Import, chose the database file that it's in the folder of the github repo, then click import 

4. Run server using git bash inside backend folder

```
npm start
Webiste url from backend : http://localhost:5001/
```

5. Run application using git bash inside frontend folder

```
npm run dev
Website Url from frontend: as the terminal will provide you with
```

6. Users credentials : 
- Teachers : 
  
  - email : fadwa@gmail.com
  - password : 1234

  - email : wael@gmail.com
  - password : 1234
  - 
- student : 
  
  - email : ahmadwael.altarsha@gmail.com
  - password : 1234

Now app ready to use

## 🎈 Usage <a name="usage"></a>

The project is built based on user experience and ease of use, below you can find how to use it:


![Alt text](https://cdn.discordapp.com/attachments/1053746629091536968/1173226501479604274/Login_Page.png?ex=65632f53&is=6550ba53&hm=495b2d1d9fdf2a6ce540e552cc4ed6ffaaf0c4851d8ab5b59142e53ff4805eab&)
<center>Login Page</center>

![Alt text](https://cdn.discordapp.com/attachments/1053746629091536968/1173226502490427442/Resturants_table_page.png?ex=65632f53&is=6550ba53&hm=937b6f0014a7eccb7de17e35d379078bd8418a06829cfbcc033f9881d6d2daf7&)
<center>Resturants table page</center>

## ⛏️ Built Using <a name = "built_using"></a>

- [MYSQL DB](https://www.apachefriends.org/index.html) - Database
- [Express JS](https://expressjs.com/) - Server Framework
- [React JS](https://https://reactjs.org/) - Web Library
- [Node JS](https://nodejs.org/en/) - Server Environment




