const fs = require("fs")

module.exports = function() {

    this.validate = (mail) => {
        fs.readFile('db.json', 'utf8', function(err, data){
            if (err) throw err
            const db = JSON.parse(data)
            for(index in db.users){
                if(db.users[index].mail == mail) return 0
            }
        });
            return 1;
    };
    


     

    this.register = (mail,pass) => {
        let newuser = {mail:mail,password:pass}
        fs.readFile('db.json', 'utf8', function(err, data){
            if (err) throw err
            const db = JSON.parse(data)
            db.users.push(newuser)
            fs.writeFile('db.json', JSON.stringify(db), function (err) {
                if (err) throw err;
                console.log('Database updated');
              })
            
        });
          fs.readFile('db.json', 'utf8', function(err, data){
            if (err) throw err
            console.log(data)
            
        });
    };


    // this.login = (mail,pass) => {
    //     console.log(db.get("users").filter((e,i,a)=>{return e == mail }))
    // }

    
}

