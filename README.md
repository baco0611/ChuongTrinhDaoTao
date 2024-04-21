# Web Project for Managing Training Programs at Hue University of Sciences

This is a project by students Huynh Van Nguyen Bao and Nguyen Thi Van Anh, who are students of the K45 class of the Information Technology Department, Hue University of Science. This project is a product entered into the Student Scientific Research and Technology Competition guided by Dr. Tran Thanh Luong.

The project structure consists of two parts: a front end using React and a back end implemented with Java, which are connected to each other through RestAPIs.
The file structure includes two main folders named frontend and backend, organized as follows:

```bash
QLCTDT
|_ backend
|   |_ ChuongTrinhDaoTao_version2
|       |_ ...
|       |_ database (insert, function, procedure)
|       |_ src
|           |_ main
|               |_ java
|                   |_ com
|                       |_ laptrinhjavaweb (Modify the code here)
|                           |_ api (create api)
|                           |_ config (config jpa and connect database)
|                           |_ converter (convert dto to entity and entity to dto)
|                           |_ dto
|                           |_ entity (create table)
|                           |_ repository 
|                           |_ service
|
|_ frontend
    |_ ...
    |_ src (Modify the code here)
        |_ assets (images, CSS files of fonts)
        |_ components (general layout of each section/session)
        |_ context (contains contexts and API definitions for each part)
        |_ view (components displayed on the UI)
```

You can download the project using the following command:
```bash
git clone https://github.com/baco0611/ChuongTrinhDaoTao.git
```

## Front-end
To run the frontend code, ensure that Node.js is installed on your computer. If not, you can download it from <a target="_blank" href="https://nodejs.org/en">Node.js</a>.

After installing and ensuring Node.js is installed on your computer, follow these steps:

- Step 1: Navigate to the frontend directory in your bash:
```bash
cd frontend
```

- Step 2: Install necessary libraries and packages:
```bash
npm install
```

- Step 3: Check if the React library is functioning properly:
```bash
npm run dev
```

## Back-end
To run project ChuongTrinhDaoTao_version2, follow these steps:
- Step 1: Download the following tools
    - Eclipse version 2023-09
    - MySQL version 8.0.17
    - Tomcat version 8.5
- Step 2: Add project to eclipse and download library
    - Open Eclipse -> Select the Workspace -> Import Maven Project -> Go to File -> Import -> Select Maven folder -> Select Existing Maven Projects -> click Next -> Browse -> Select Project -> Finish
    - Complete downloading the library for the project: right click on project -> maven -> update project
- Step 3: Connect database and create table
  	- Open MySQL and create database with name "database_chuongtrinhdaotao"
  	- Open the JPAConfig file 
      	```bash
          ..
        |_ config (config jpa and connect database)
          |_JPAConfig.java
      	```
	  	- Change the {password} part of the code below in the dataSource() function to suit your computer
      		```bash
  		    dataSource.setDriverClassName("com.mysql.jdbc.Driver");
  		    dataSource.setUrl("jdbc:mysql://localhost:3306/database_chuongtrinhdaotao");
  		    dataSource.setUsername("root");
  		    dataSource.setPassword("{password}");
       		```
  		- Just run below command in extraProperties() function
       		```bash
  		     properties.setProperty("hibernate.hbm2ddl.auto", "create");
       		```
  	  	- After the table is successfully created
  	  		- Just run below command in extraProperties() function
  	  	   	```bash
  	  	    properties.setProperty("hibernate.hbm2ddl.auto", "none");
  	  	    properties.setProperty("hibernate.enable_lazy_load_no_trans", "true");
			```
  	- Open the files in the project's database folder
       	```bash
          ..
        |_ database 
          |_insert.sql
          |_function.sql
          |_procedure.sql
      	```
  	Copy the code in 3 files into the "database_chuongtrinhdaotao" database in mysql to execute
