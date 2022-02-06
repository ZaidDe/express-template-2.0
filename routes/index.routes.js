const express = require('express');
const router = express.Router();
const { indexController } = require('../controller/index')
const logger = require('../logger')

/**
 * @swagger
 *  tags:
 *   name: Index
 *   description: API to manage Index.
 */

/**
*  @swagger
*   components:
*     schemas:
*       IndexResponse:
*         type: object
*         required:
*           - success
*           - message
*         properties:
*           success:
*             type: boolean
*           message:
*             type: string
*           data:
*             type: object
*         example:
*            success: true
*            message: "ok"
*            data: {}
*/



/**
 * @swagger
 *  /get:
 *    get:
 *      summary: returns all data
 *      tags: [Index Model Get]
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/IndexResponse'
 *
 */
router.get('/get', async (req, res) => {
  logger.info(`indexRouter GET route: ' /', data: ${req.body}`)
  const result = await indexController.testGetHandler()
  res.send(result)
  //res.render('index', { title: 'Express' });
});

/* Model post route. */
/**
* @swagger
*   /post:
*     post:
*       summary: This api will create new agent in system with specified role
*       tags: [Index Model Post]
*       requestBody:
*         required: true
*         content:
*           multipart/form-data:
*             schema:
*               type: object
*               required:
*                 - email
*                 - name
*                 - password
*                 - roleId
*               properties:
*                 email:
*                   type: string
*                 name:
*                   type: string
*                 password:
*                   type: string
*                 roleId:
*                   type: array
*                   items:
*                      type: number
*                 msisdn:
*                   type: string
*                 extension:
*                   type: number
*                 profileImageUrl:
*                   type: string
*                   format: binary
*               example:
*                 email: john@bkk.ag
*                 name: john
*                 password: Ja55RSqrsX
*                 roleId: [1]
*                 msisdn: "923151512477"
*                 extension: 2311
*       responses:
*         "200":
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/IndexResponse'
*/
router.post('/post', async (req, res) => {
  logger.info(`indexRouter POST route: '/', data: ${req.body}`)
  const result = await indexController.testPostHandler(req.body)
  res.send(result)
  //res.render('index', { title: 'Express' });
});

module.exports = router;
