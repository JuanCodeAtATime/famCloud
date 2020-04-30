## famcloud | *Photo Storage App for Traveling Friends & Fam*
- Developer: Juan Rivera
- Date: April 19, 2020
- (Still Under Development)


 ![famcloud, photo-storage app for traveling fam and friends](client/public/screenshot.PNG)

*****

### BRIEF DESCRIPTION

**famcloud** is a full-stack MERN app featuring a travel-themed user interface and Dropzone for photo storage. 

Users can take photos and store them by continent, country, and year.  The landing page displays the photo gallery where users can view and search for photos by continent and year.  

## Installation Steps
1. Git clone with HTTPS to your local machine ```https://github.com/JuanCodeAtATime/famCloud.git```
2. In famcloud folder, run ```npm install```   
3. Then  ```cd client``` then run ```npm install``` 
4. Go back to root directory by running ``` cd .. ```
5.  Lastly, run ```npm run dev``` to launch in your local machine.


### BUILT WITH
* **Programming Language:** JavaScript 
* **Runtime Evironment/Sever:**  Node.js
* **DBMS:**  Mongo DB / Mongoose
* **Cloud:** AWS S3 (for image file storage) 
* **Libraries/Frameworks Used:**:  React-Bootstrap, Ant Design, Drop-Zone



### ISSUES (Developer's Notes)

This app has no issues when running locally.  However, photo rendering and storage functionality is intermittenly throwing "Failed to load resource: net::ERR_CONNECTION_REFUSE" on some devices on the Heroku deployed site.  I'm currently working to resolve this issue with AWS S3 solution.  Until this is resolved, a local uploads folder is used to handle photo storage. 

*****

### CHECK OUT THE DEPLOYED SITE HERE
https://famcloud.herokuapp.com


