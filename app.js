const path=require('path');
const express=require('express')
const ejs=require('ejs')
const BodyParser=require('body-parser')
const mysql=require('mysql');
const bodyParser = require('body-parser');
const app=express();
const port=3000
const tablename = "covid_details"
const connection=mysql.createConnection(
    {
        host:'dbcheck.crqa9qnfogfe.us-east-1.rds.amazonaws.com',
        user:'ashwin',
        password:'ashwin123',
        database:'covid19',
        port:'3306',
        connectionLimit:15,
        queueLimit:30,
        acquireTimeout:100000
    }
)

connection.connect(function(error)
{
    if(!!error) console.log(error);
    else console.log('database established');
})

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/', (req, res) => {
    // res.send({
    //     title:"starting node server"
    // })
    


    // let insertQuery = "Insert into ?? (statename, dateofrecord, numofsamples,numofdeaths,numofpos,numofneg,numofdis) values ('kerala','2018-10-20',12,8,5,3,2)";
    // let insquery = connection.query(insertQuery,covidtable,(err,rows)=>{
    //     if(err) throw err;
    //     else console.log("insert query executed")
    // });

    let sql = "SELECT * FROM ??";
    let query = connection.query(sql,[tablename],(err,rows,res1)=>{
        if(err) throw err;
    res.render('index',{
        title:"Covid Data Bank",
        covidlist : rows
    });
});
});

app.get('/test',(req,res)=>{
    let sql="SELECT * FROM ??"
    let query=connection.query(sql,[tablename],(error,rows)=>{
        if(error)throw error;
        else console.log(rows)
    })
    res.render('index',{
        covidlist:rows
    })

})

app.get('/add',(req,res)=>{
    
    res.render('form',{
        title:"adduser"
    })

})

app.post('/save',(req,res)=>{
    let data={
        statename:req.body.statename,
        dateofrecord:req.body.dateforrecord,
        numofsamples:req.body.nosasmplename,
        numofdeaths:req.body.noofdeath,
        numofpos:req.body.possamp,
        numofneg:req.body.negsamp,
        numofdis:req.body.discharge

    }

    let sql="INSERT INTO covid_details SET ?"
    let query=connection.query(sql,[data],(error,results)=>{
        if(error)throw error;
        else console.log('insert successful')
    })  
    res.redirect('/')  

})



app.listen(port,()=>{
    console.log('listening on port:',port);
    
})