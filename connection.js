const sqlite3 = require('sqlite3');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Descrição: ', (descricao) => {
  rl.question('Data: ', (data) => {

    const db = new sqlite3.Database('tarefas.db', err => {
      if (err) return console.error(err.message);
    });
    
    db.serialize(() => {
      db.each(`INSERT INTO tarefa (descricao, data)
        VALUES ("${descricao}", "${data}")`, (err) => {
        if (err) console.error(err.message);
      });
  
      db.all(`SELECT * FROM tarefa`, [], (err, rows) => {
        if (err) throw err;
        rows.forEach(row => console.log(row));
      });
    });
    
    db.close(err => {
      if (err) return console.error(err.message);
    });

  })

  

});

rl.on('close', () => {
  process.exit(0);
});



// const http = require('http');
// const fs = require('fs');

// const port = 3000;
// const hostname = '127.0.0.1';

// -----------------

// fs.readFile('index.html', (err, html) => {
//   if (err) throw err;

//   http.createServer((req, res) => {
//     if (req.method === 'GET'){
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(html);
//       res.end();
//     }else{
//       let body = '';
//       let updatedDatabase = [];
//       req.on('data', chunk => {
//         body += chunk;
//       });
//       req.on('end', () => {
//         const newTaskDescription = body.slice(12, -2);

//         const db = new sqlite3.Database('tarefas.db', err => {
//           if (err) return console.error(err.message);
//         });
        
//         db.serialize(() => {
//           db.each(`INSERT INTO tarefa (descricao, data)
//             VALUES ("${newTaskDescription}", "${new Date().toLocaleDateString()}")`, (err) => {
//             if (err) console.error(err.message);
//           });
      
//           db.all(`SELECT * FROM tarefa`, [], (err, rows) => {
//             if (err) throw err;
//             console.log(rows);
//             updatedDatabase = rows;
//           });
//         });
        
//         db.close(err => {
//           if (err) return console.error(err.message);
//         });

//       });
//       res.end('database');
//     }
    
//   }).listen(port, hostname);
// });

// ---------------------------------------

// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const path = require('path');
// const router = express.Router();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// router.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname+'/index.html'));
// });

// router.post('/', (req, res) => {
//   console.log(req.body)
// });

// app.use('/', router);
// app.listen(process.env.port || 3000);
// console.log('Running at Port 3000');







