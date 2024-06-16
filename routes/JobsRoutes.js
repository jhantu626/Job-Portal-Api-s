const express=require('express')
const router=express.Router();
const {jwtMiddleWare}=require('./../middleware/jwt')
const {createJob,getAllJobs,getAllJobsById}=require('./../controller/JobsController.js')

//Create Jobs
/**
 * @swagger
 * /api/v1/job/create:
 *   post:
 *     tags:
 *       - Jobs
 *     summary: Create a new job
 *     description: Creates a new job with the provided details
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 job:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     location:
 *                       type: string
 *                     salary:
 *                       type: number
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
router.post('/create', jwtMiddleWare, createJob);


/**
 * @swagger
 * /api/v1/job/get:
 *   get:
 *     tags:
 *       - Jobs
 *     summary: Get all jobs
 *     description: Retrieves a list of all jobs
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 jobs:
 *                   type: array
 *                   items:
 *                      type: Object
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
router.get('/get', jwtMiddleWare, getAllJobs);
/**
 * @swagger
 * /api/v1/job/get-jobs:
 *   get:
 *     tags:
 *       - Jobs
 *     summary: Get jobs by specific criteria
 *     description: Retrieves a list of jobs based on specific criteria
 *     security:
 *       - BearerAuth: []
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 jobs:
 *                   type: array
 *                   items:
 *                     type: Object
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
router.get('/get-jobs', jwtMiddleWare, getAllJobsById);


module.exports=router;