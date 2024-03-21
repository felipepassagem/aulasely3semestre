async function connect() {
    if(global.connection && global.connection.state !== 'disconected')
        return global.connection

        const mysql = require("mysql2/promise");
        const connection = await mysql.createConnection(
            {host:'54.91.193.137',
                  user: 'libertas',
                  password: '123456',
                  database: 'libertas5per'
        });
        console.log("Conectou");
        global.connection = connection;
        return connection;
}

exports.post = async (req, res, next) => {
    const conn = await connect();
    const sql = "INSERT INTO usuario (nome, telefone, email, senha) VALUES (?,?,?,?)";


    const values = [req.body.nome, req.body.telefone, req.body.email, req.body.senha];

    // for (var i = 0; i < 10000; i++) {
    //     console.log(i)
       
    // }
    await conn.query(sql, values)

    res.status(201).send('Rota POST');
};

exports.put = async (req, res, next) => {
    const conn = await connect();
    const sql = "UPDATE usuario SET nome = ?, telefone= ?, email = ?, senha = ? where idusuario = ?";

    const values = [req.body.nome, req.body.telefone, req.body.email, req.body.senha, req.params.id];
    
    await conn.query(sql, values)

    res.status(201).send("ROTA PUT");
}

exports.delete = async (req, res, next) => {
    const conn = await connect();
    const sql = "DELETE FROM usuario WHERE idusuario = ?";

    const values = [req.params.id];
    
    await conn.query(sql, values)

    res.status(201).send("ROTA DELETE");
}

exports.get = async (req, res, next) => {
    const conn = await connect();
    const sql = "SELECT * FROM usuario";

    const values = [req.params.id];
    
    var rows = await conn.query(sql, values)

    res.status(201).send(rows);
}


exports.getById = async (req, res, next) => {
    const conn = await connect();
    const sql = "SELECT * FROM usuario WHERE idusuario = ?";

    const values = [req.params.id];
    
    var [rows] = await conn.query(sql, values)

    if (rows.length > 0) {
        res.status(201).send(rows);
    } else {
        res.status(404).send("Usuario não encontrado")
    }

    
}