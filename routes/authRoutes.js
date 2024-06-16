const express=require('express')
const router=express.Router();
const {registerController,loginController}=require('./../controller/authController')
const {body,validationResult}=require('express-validator')

//RateLimiter
const rateLimit=require('express-rate-limit')
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
  });



//This file will be responsible to register and login user!



//ResigerUser
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Registers a new user with the provided email and password
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 15
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       param:
 *                         type: string
 *                       msg:
 *                         type: string
 */
router.post('/register', limiter, [
    body('name', 'Name must be 3 or more characters!').isLength({ min: 3, max: 30 }),
    body('email', 'Email should be in the correct format!').isEmail(),
    body('password', 'Password must be at least 6 characters!').isLength({ min: 6, max: 15 })
], registerController);



/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login an existing user
 *     description: Authenticates an existing user with the provided email and password
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 15
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       param:
 *                         type: string
 *                       msg:
 *                         type: string
 */
router.post('/login', limiter, [
    body('email', 'Email should be in the correct format!').isEmail(),
    body('password', 'Password must be at least 6 characters!').isLength({ min: 6, max: 15 })
], loginController);


module.exports=router;