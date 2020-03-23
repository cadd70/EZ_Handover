var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.sqlite');

/*************\
| Cria tabela |
\*************/

// db.run("DROP TABLE tbl_perfil_cliente;");

// db.run(
//     "CREATE TABLE tbl_perfil_cliente (" +
//         "id INTEGER NOT NULL PRIMARY KEY," +
//         "nome_cliente TEXT NOT NULL," +
//         "contatos_cliente TEXT NOT NULL," +
//         "contatos_origem TEXT NOT NULL," +
//         "tipo_embarque TEXT NOT NULL," +
//         "tipo_frete_negociado TEXT NOT NULL," +
//         "cliente_aprova_hbl TEXT NOT NULL," +
//         "envio_ri TEXT NOT NULL," +
//         "tem_seguro TEXT NOT NULL," +
//         "taxas_destino TEXT NOT NULL," +
//         "desembaraco_ceva TEXT NOT NULL," +
//         "embarques_mes INTEGER NOT NULL," +
//         "freetime TEXT NOT NULL," +
//         "observacoes TEXT," +
//         "criada_por TEXT NOT NULL" +
//     ");"
// );

// db.close();

// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");

//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//     stmt.run("Ipsum " + i);
//   }

//   stmt.finalize();

//   var rows = document.getElementById("database");
//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//     var item = document.createElement("li");
//     item.textContent = "" + row.id + ": " + row.info;
//     rows.appendChild(item);
//   });
// });

// db.close();

/******************************************\
| RESETAR CAMPOS DO FORM AO FECHAR O MODAL |
\******************************************/

$(".modal").on('hidden.bs.modal', function(e){
    $(this).find("form")[0].reset();       
});

