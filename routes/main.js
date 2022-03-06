const fs = require("fs")

module.exports = function(app){
app.get('/', (req,res) =>{
    res.cookie('Session','Cookies are delicious');
    res.render('newuser',{

    });
})

app.get('/register', (req,res) =>{
    res.json({"test respons": "xd"}).sendStatus(200);
})

app.get('/rooms/', function(req, res) {
    // res.send(req.params.id);

    fs.readFile('db.json', 'utf8', function(err, data){
        if (err) throw err
        const db = JSON.parse(data)
        res.send(db.rooms)

  });
})
app.get('/rooms/:id', function(req, res) {
    // res.send(req.params.id);

    fs.readFile('db.json', 'utf8', function(err, data){
        if (err) throw err
        const db = JSON.parse(data)
        // const resp = data.filter(
        //     function(response) {
        //         return dresponse.id == req.params.id 
        //  
        // )
        // var response = db.filter(function (el){
        //     return el.id == req.params.id
        // })
        const filteredByKey = Object.fromEntries(
            Object.entries(db.rooms).filter(([key, value]) => key == req.params.id) )

        // var resp = Object.filter(db, rooms => rooms.id == req.params.id)
        // res.send(filteredByKey)
        const key = req.params.id - 1
        res.send(db.rooms[key])

  });
})
app.get('/treatments', function(req, res) {

    fs.readFile('db.json', 'utf8', function(err, data){
        if (err) throw err
        const db = JSON.parse(data)
        res.send(db.treatments)

  });
})

app.get('/treatments/:id', function(req, res) {

    fs.readFile('db.json', 'utf8', function(err, data){
        if (err) throw err
        const db = JSON.parse(data)
        const key = req.params.id - 1
        res.send(db.treatments[key])

  });
})
app.post('/register', (req,res) =>{
    console.log("register")
    const { mail, password} = req.body
         if(validate(mail)) {
            register(mail, password)
            res.send({message: 'Rejestracja przebiegla pomyslnie'})
         }else
            res.send('newuser',{message: 'Mail juz w uzyciu'})
    })

app.post('/', (req,res)=>{
    console.log("login")
    const { mail, password } = req.body
    login(mail,password)
})

app.get('/1', (req,res) =>{
    
    res.send('test',{

    });
})

}