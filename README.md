## Famcloud | *Photo Storage App for Traveling Friends & Fam*
- Developer: Juan Rivera
- Date: April 19, 2020
- (Still Under Development)


 ![famcloud, photo-storage app for traveling fam and friends](client/public/screenshot.PNG)

*****

## Overview
**famcloud** is a full-stack MERN app featuring a travel-themed user interface with Dropzone and Multer for photo uploading. 

Users can take photos and store them by continent, country, and year.  The landing page displays the photo gallery where users can view and search photos by continent and year.  

## Installation Steps
1. Git clone with HTTPS to your local machine ```https://github.com/JuanCodeAtATime/famCloud.git```.
2. In famcloud folder, run ```npm install``` to install back-end dependencies.  
3. Then,  ```cd client``` and run ```npm install``` to install front-end dependencies.  
4. Go back to root directory (famcloud) by running ``` cd .. ```.
5. Lastly, run ```npm run dev``` to launch in your local machine.


### Built With
* **Programming Language:** JavaScript 
* **Runtime Evironment/Sever:**  [Node.js](https://nodejs.org/en/)
* **DBMS:**  [Mongo DB](https://www.mongodb.com/)
* **Libraries/Frameworks Used:** [React-Bootstrap](https://react-bootstrap.github.io/), [Ant Design](https://ant.design/), [Drop-Zone](https://react-dropzone.js.org/), [Multer](https://www.npmjs.com/package/multer)



### Future Updates
This app has no issues when running locally.  However, on deployed Heroku site, photo rendering and storage functionality is intermittenly throwing this error in the console:  ```"Failed to load resource: net::ERR_CONNECTION_REFUSE".```
A cloud solution such as AWS S3 would probably fix this issue.  Until then, a local ```uploads/``` folder suffices as a temporary solution to store and render images. 


### Demo
[Click here](https://drive.google.com/file/d/1cGWH729yXS-lRFQDg0dU3AmFRmAsJUiU/view) for a demo of the app's basic functionality and responsiveness.  

### Deployed Site
[Click here](https://famcloud.herokuapp.com) to visit deployed site.


