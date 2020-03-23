var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.sqlite');

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

// RESETAR CAMPOS DO FORM DE CADASTRO DE DEMANDA DE DISTRATO AO FECHAR O MODAL

$(".modal").on('hidden.bs.modal', function(e){
    $(this).find("form")[0].reset();       
});
