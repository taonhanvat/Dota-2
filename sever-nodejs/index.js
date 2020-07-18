require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
var cors = require('cors')
var session = require('express-session')
const bodyParser = require('body-parser');
app.use(cors())
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//  const { getDetailedHeroesAbilities } = require("./dota_api");

const connectToDatabase = async () => {
  const { Client } = require("pg");
  client = new Client({
    user: "postgres",
    password: "anmaythisao",
    host: "localhost",
    port: 5432,
    database: "test",
  });
  await client.connect();
  // insertItemForGraft(client);
  // insertItemTier2(client);
  sendDataToFrontEnd(client);
  sendItemToFrontEnd(client);
// getAllKeysOfRecipeItem();
getDataUserRegistration(client);
getDataUserLogin(client);

};

sendDataToFrontEnd = (client) => {

  client.query(`SELECT name from heroes`,(req,res) => {
      //  console.log(res.rows)
      for(let i = 0 ; i < res.rows.length ; i++){
        client.query(`SELECT * from heroes 
          join stats on heroes.id = stats.id
          join detail_ability on heroes.id = detail_ability.id
          Where heroes.name = '${res.rows[i].name}'`,(rq,rs)=>{
            app.get(`/heroes/${res.rows[i].name}`,(q,re) => {
              console.log(`URL: ${q.url}`)
              re.send(rs.rows)
            })
    })
      }
     })
}

sendItemToFrontEnd = async(client) => {
   app.use(cors());
   client.query(`Select * from graft_item_tier1`,(req,res) => {
      client.query(`Select * from graft_item_tier2`,(rq,rs) => {
        let data = [res.rows,rs.rows];
        console.log(data)       
        app.get(`/graft-item`,(q,r) => {
          r.send(data)
        })
      })
   })
//    client.query(`Select * from graft_item_tier1`,(req,res) => {
//     client.query(`Select * from graft_item_tier2_clone`,(rq,rs) => {
//       let data = [res.rows,rs.rows];       
//       app.get(`/graft-item1`,(q,r) => {
//         r.send(data)
//       })
//     })
//  })

}

getDataUserRegistration = (client) => {
  app.post('/usersRegistration', function (req, res) {
    const user = req.body;
    console.log(user)
    if(user.passwordRegistration === user.confirmPasswordRegistration) {
      insertUser(client,user.usernameRegistration,user.passwordRegistration);
      res.send('Đăng kí thành công');
      res.end();
    }
    else{ 
    res.send('Mật khẩu và xác nhận mật khẩu không khớp nhau')
    res.end()
    }
  })
}

const insertUser = (client,username,password) => {
    client.query(`insert into users values('${username}','${password}')`,(err, res) => {
      console.log(err, res);
    })
}

getDataUserLogin = (client) => {
  app.post('/usersLogin',function(req,res){
    console.log(req.body)
    const userLogin = req.body;
    client.query(`select * from users`,(rq,rs) => {
      console.log(rs.rows)
      const allUsers = rs.rows ;
      allUsers.forEach(element => {
        if(userLogin.usernameLogin === element.username && userLogin.passwordLogin === element.password) {
          res.send(true);
          res.end();
        }
      })
    })
  })
}

connectToDatabase();

const port = 3002;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

// PGUSER=postgres PGHOST=localhost PGPASSWORD=anmaythisao PGDATABASE=test PGPORT=5432 node index.js
