const express = require('express')
var bodyParser = require('body-parser');
require("dotenv").config();

const app = express()


var swaggerJSDoc = require('swagger-jsdoc') // actual documentation
var swaggerUI = require('swagger-ui-express') // for viewing the documentation


var swaggerDefinition = {
  info: {
    title:'myAppliation',
    version:'0.0.1',
    description:'This xyz'
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name:'authorization',
      scheme: 'bearer',
      in: 'header'
    }
  },
  host:'localhost:3000',
  basePath:'/'
  }
  
  var swaggerOptions = {
    swaggerDefinition,
    apis:['./app.js']
  }
  var swaggerSpecs = swaggerJSDoc(swaggerOptions);
  app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerSpecs))



app.use(bodyParser.urlencoded({extended:true}))

var imageController=require("./controllers/imageController.js");
var userController = require('./controllers/user_controllers.js')
var AuthController = require('./controllers/AuthController.js')

var multer  = require("multer");
var storage = multer.diskStorage(
    {
        destination: "./uploads/",
        filename: function ( req, file, cb ){
            cb( null, file.originalname );
        }
    }
);

var upload = multer( { storage: storage } );

/**
 * @swagger
 * /single:
 *  post:
 *   tags:
 *    - Image
 *   description: Upload single image
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/form-data
 *   parameters:
 *    - name: image
 *      in: formData
 *      type: file
 *      required: true
 *      description: This is image to be upload
 *   responses:
 *    201:
 *     description: Upload successful
 *    500:
 *     description: Internal Error
 */
app.post("/single",upload.single("image"),imageController.sValidation,imageController.sUpload);



/**
 * @swagger
 * /multiple:
 *  post:
 *   tags:
 *    - Image
 *   description: Upload multiple images
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/form-data
 *   parameters:
 *    - name: images
 *      in: formData
 *      type: file
 *      required: true
 *      description: This is image to be upload
 *   responses:
 *    201:
 *     description: Upload successful
 *    500:
 *     description: Internal Error
 */
var multipleFiles=upload.fields([{
  name:"images", maxCount:4
}
]);
app.post("/multiple",multipleFiles,imageController.mUpload);
/**
* @swagger
* /registration:
*  post:
*   tags:
*    - Users
*   description: Testing
*   produces:
*    - application/json
*   consumes:
*    - application/x-www-form-urlencoded
*   parameters:
*    - name: username
*      in: formData
*      type: string
*      required: true
*      description: This is username to be entered
*    - name: password
*      in: formData
*      type: string
*      required: true
*      description: password to be entered
*    - name: address
*      in: formData
*      type: string
*      required: true
*      description: enter address
*   responses:
*    201:
*     description: registered successfully
*    409:
*     description: already registered
*    500:
*     description: Internal Server Error
*/

app.post('/registration',userController.validation, userController.hashGen, userController.registerUser )
app.get('/login', userController.findallusers )

/**
 *  @swagger
 *  /login:
 *   post:
 *    tags:
 *     - login
 *    description: Testing login
 *    produces:
 *     - application/json
 *    consumes:
 *     - application/x-www-form-urlencoded
 *    parameters:
 *     - name: username
 *       in:  formData
 *       type: string
 *       required: true
 *       description: This is username to be entered
 *     - name: password
 *       in:  formData
 *       type: string
 *       required: true
 *       description: This is password to be entered
 *    responses:
 *     200:
 *      description: successfully logged in
 *	   500:
 *      description:login   
 */
app.post('/login',AuthController.validator, AuthController.passwordCheck, AuthController.jwtTokenGen)

/**
* @swagger
* /users/{id}:
*  delete:
*   tags:
*    - Users
*   security:
*    - bearerAuth: []
*   description: This is for delete
*   produces:
*    - application/json
*   parameters:
*    - name: id
*      in: path
*   responses:
*    200:
*     description: successfully deleted
*    404:
*     description: user not found
*    500:
*     description: Internal Server Error
*/
app.delete('/users/:id', AuthController.verifyToken, userController.deleteUser)

app.put('/users/:id',AuthController.verifyToken, userController.updateUser)



app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)