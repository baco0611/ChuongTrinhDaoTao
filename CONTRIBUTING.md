# How to contribute to this project repository
This contribution guide file helps you better understand our working process during maintenance and is also a constraint to help us work more smoothly.

## About this project
This is a web project that manages the Hue University of Sciences training program with the purpose of participating in a student scientific research competition conducted with 2 students of course K45, department of information technology.
his is a project by students Huynh Van Nguyen Bao and Nguyen Thi Van Anh, who are students of the K45 class of the Information Technology Department, at Hue University of Science. This project is a product entered into the Student Scientific Research and Technology Competition guided by Dr Tran Thanh Luong.

The project structure consists of two parts: a front end using React and a back end implemented with Java, which are connected through RestAPIs.
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

## Branch naming rules
Each task should be done on a different branch and not multiple tasks on the same branch. This makes it easier to test and debug during development and maintenance.

Additionally, the name of the branch needs to be **MEANINGFUL** and **RELEVANT** to the work on that branch. This makes identifying the tasks and functions of a branch quick and communication between many people easier. In particular, the branch naming rules are as follows:
- **FE_[feature name]**: If the branch is used to develop a new function or feature of the front end.
- **BE_[feature name]**: If the branch is used to develop a new function or feature of the back end.
- **FE_FIX_[feature_name]**: If the branch is used to edit a new function or feature of the front end.
- **BE_FIX_[feature_name]**: If the branch is used to edit a new function or feature of the back end.
- **FE_BE_[feature_name]**: If the branch is used to connect or combine front end and back end.

## Submitting changes
Because this is a project of two individuals, the way of working is simplified with branches managed by each individual. Merging the back end and front end together or merging into the master branch will be tested and merged by Nguyen Bao.

However, writing clear comments is very important in checking changes in each commit. This helps developers quickly find where to check in each commit to test and fix necessary errors. Here is an example:
```bash
$ git commit -m "[Operation name] Brief title of work performed
> Job description 1
> Job description 2
> ...
> Job description n"
```
In there:
- Operation name: includes tasks such as EDIT, CREATE, UPDATE, FIX, ... helps developers know the purpose of this commit.
- Brief title of work performed: briefly describe the work done such as "editing UI part A", "editing json output of api XYZ"
- Job description: Describe in detail the work done such as "Change the height of component B and change the order of E and D", ...

_**Note: When developing the application later with more members, I encourage learning about pull requests and merge requests to make the working process smoother.**_
