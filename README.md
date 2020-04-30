## Famcloud | *Photo Storage App for Traveling Friends & Fam*
- Developer: Juan Rivera
- Date: April 19, 2020
- (Still Under Development)


 ![famcloud, photo-storage app for traveling fam and friends](client/public/screenshot.PNG)

*****

### Overview
**famcloud** is a full-stack MERN app featuring a travel-themed user interface with Dropzone and Multer for photo uploading. 

Users can take photos and store them by continent, country, and year.  The landing page displays the photo gallery where users can view and search photos by continent and year.  

## Installation Steps
1. Git clone with HTTPS to your local machine ```https://github.com/JuanCodeAtATime/famCloud.git```.
2. In famcloud folder, run ```npm install``` to install back-end dependencies.  
3. Then,  ```cd client``` then run ```npm install``` to install front-end dependencies.  
4. Go back to root directory (famcloud) by running ``` cd .. ```.
5. Lastly, run ```npm run dev``` to launch in your local machine.


### Built With
* **Programming Language:** JavaScript 
* **Runtime Evironment/Sever:**  Node.js
* **DBMS:**  Mongo DB / Mongoose
* **Libraries/Frameworks Used:** [React-Bootstrap](https://react-bootstrap.github.io/), [Ant Design](https://ant.design/), [Drop-Zone](https://react-dropzone.js.org/), [Multer](https://www.npmjs.com/package/multer)



### Issues (Developer's Notes)
This app has no issues when running locally.  However, photo rendering and storage functionality is intermittenly throwing "Failed to load resource: net::ERR_CONNECTION_REFUSE" on some devices on the Heroku deployed site.  I'm currently working to resolve this issue with AWS S3 solution.  Until this is resolved, a local ```uploads/``` folder is used to handle photo storage. 

*****

### Check Out the Deployed Site
https://famcloud.herokuapp.com


