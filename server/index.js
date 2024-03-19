import express from 'express';
import cors from 'cors';

const app = express();

// Practice of quary parameters in API
// http://localhost:5000/order/food?menu=Samosa&quantity=5&price=10
app.get("/order/food",(req, res)=>{
    const {menu, price, quantity} = req.query;
    const {user, country} = req.headers;

    const totalPrice = parseInt(price) * parseInt(quantity);

    res.json({
        message : `You have ordered ${quantity} ${menu}`,
        bill : `Your total bill is ${totalPrice}`,
        details : `You are ${user} from ${country}`
    })
})

// Practice of params parameters in API
// http://localhost:5000/food/non-veg
app.get("/food/:type",(req, res)=>{
    const {type} = req.params;

    if(type == "veg"){
        return res.json({
            message : "You have ordered veg food"
        })
    }
    else{
        return res.json({
            message : "You have ordered non-veg food"
        })
    }
})

app.use(express.json());
app.use(cors());

const tasks = [];

app.get('/health',(req, res)=>{
    res.json({
        succes:true,
        message:'server is healthy'
    })
})

app.post('/create-task', (req, res)=>{
    const {id, title, priority} = req.body;

    if(!id){
        return res.json({
            succes: false,
            message: 'id is required'
        })
    }
    if(!title){
        return res.json({
            succes: false,
            message: 'title is required'
        })
    }
    if(!priority){
        return res.json({
            succes: false,
            message: 'priority is required'
        })
    }

    const newTask = {id, title, priority}
    // OR
    // const newTask = {
    //     "id": id,
    //     "title": title,
    //     "priority": priority
    // }

    tasks.push(newTask);

    res.json({
        success: true,
        message: 'Task created successfully',
        data: newTask
    })
})

app.get('/all-tasks',(req, res)=>{
    res.json({
        success: true,
        message: 'All tasks fetched successfully',
        data: tasks
    })
})

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})