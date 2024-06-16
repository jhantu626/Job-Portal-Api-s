const express=require('express')
const app=express();
const db=require('./db')
require('dotenv').config();
const cors=require('cors');
const testRoutes=require('./routes/testRoutes')
const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/UserRoutes')
const jobRoutes=require('./routes/JobsRoutes')
const errorMiddleWare=require('./middleware/errorMiddleware')
require('express-async-errors')
//Swagger Ui
const swaggerUi=require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc');

//Security Packages
const helmet=require('helmet')
const xss=require('xss-clean')
const mongoSanitize=require('express-mongo-sanitize')



//Swagger Api Config
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job Portal API",
            version: "1.0.0",
            description: "This is a Job Portal API"
        },
        servers: [
            {
                url: "http://localhost:8000"
            }
        ],
        security: [
            {
                BearerAuth: []
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: [
        './routes/testRoutes.js',
        './routes/authRoutes.js',
        './routes/UserRoutes.js',
        './routes/JobsRoutes.js'
    ]
};

const spec = swaggerJsdoc(options);


const log=(req,resp,next)=>{
    const date=new Date().toLocaleString();
    console.log(`[${date}] {${req.method}} (${req.url})`);
    next();
}
app.use(log);
app.use(cors());
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
//To communicate with json Data we are using jsonParser
app.use(express.json());

//Api Doc Routes
app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(spec));

app.get('/welcome',(req,resp)=>{
    resp.send('welcome to our Job Portal!');
})

//All the routes
app.use('/api/v1/test',testRoutes);
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/job',jobRoutes)

//Adding MiddleWare
app.use(errorMiddleWare);

const port=process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})