var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.sqlite');

refresh(); // Popula a tela inicialmente

/******************************************\
| RESETAR CAMPOS DO FORM AO FECHAR O MODAL |
\******************************************/

$(".modal").on('hidden.bs.modal', function(e){
    $(this).find("form")[0].reset();
});

/*********************\
| Form to JSON object |
\*********************/

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
};

/***********************************\
| Destrói e Recria tabela de perfis |
\***********************************/

function refresh() {
    $('#tabelaPerfisCadastrados').empty();

    $('.modal').modal('hide');

    db.each("SELECT * FROM tbl_perfil_cliente", function(err, row) {

        let btnModalConsultar =
            `<button class="btn btn-primary" title="Consultar Perfil" data-toggle="modal" data-target="#modalConsultaPerfil` + row.id + `">` +
                `<i class="fas fa-lg fa-search"></i>` +
            `</button>` +

            `<div class="modal fade" id="modalConsultaPerfil` + row.id + `" tabindex="-1" role="dialog" aria-hidden="true">` +
                `<div class="modal-dialog" role="document">` +
                    `<div class="modal-content">` +

                        `<div class="modal-header">` +
                            `<h5 class="modal-title">Consulta de Perfil de Cliente</h5>` +
                            `<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">` +
                                `<span aria-hidden="true">&times;</span>` +
                            `</button>` +
                        `</div>` +

                        `<div class="modal-body">` +

                            `<div class="form-group">` +
                                `<label>Nome do Cliente:</label>` +
                                `<p>` + row.nome_cliente + `</p>` +                                        
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Contatos do Cliente:</label>` +
                                `<p>` + row.contatos_cliente + `</p>` +                                        
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Contatos da Origem:</label>` +
                                `<p>` + row.contatos_origem + `</p>` +                                        
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Tipo de Embarque:</label>` +
                                `<p>` + row.tipo_embarque + `</p>` +                                        
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Frete Negociado:</label>` +
                                `<p>` + row.tipo_frete_negociado + `</p>` +                                        
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Cliente Aprova HBL:</label>` +
                                `<p>` + row.cliente_aprova_hbl + `</p>` +                                        
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Envio de RI:</label>` +
                                `<p>` + row.envio_ri + `</p>` +                                        
                            `</div>` +
                            
                            `<div class="form-group">` +
                                `<label>Seguro:</label>` +
                                `<p>` + row.tem_seguro + `</p>` +                                        
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Desembaraço Ceva:</label>` +
                                `<p>` + row.desembaraco_ceva + `</p>` +                                        
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Taxas de Destino:</label>` +
                                `<p>` + row.taxas_destino + `</p>` +                                        
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Volume de Embarques / mês:</label>` +
                                `<p>` + row.embarques_mes + `</p>` +                                        
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Freetime:</label>` +
                                `<p>` + row.freetime + `</p>` +                                        
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Observações:</label>` +
                                `<p>` + row.observacoes + `</p>` +                                        
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Criado Por:</label>` +
                                `<p>` + row.criada_por + `</p>` +                                        
                            `</div>` +

                        `</div>` +

                        `<div class="modal-footer">` +
                            `<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>` +
                        `</div>` +

                    `</div>` +
                `</div>` +
            `</div>`
        ;

        let btnModalAlterar =
            `<button class="btn btn-info" title="Alterar Perfil" data-toggle="modal" data-target="#modalAlteraPerfil` + row.id + `">` +
                `<i class="fas fa-lg fa-edit"></i>` +
            `</button>` +

            `<div class="modal fade" id="modalAlteraPerfil` + row.id + `" tabindex="-1" role="dialog" aria-hidden="true">` +
                `<div class="modal-dialog" role="document">` +
                    `<div class="modal-content">` +

                    `<form class="form-altera-perfil" id="formAlteraPerfil` + row.id + `">` +

                        `<div class="modal-header">` +
                            `<h5 class="modal-title">Alterar Perfil de Cliente</h5>` +
                            `<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">` +
                                `<span aria-hidden="true">&times;</span>` +
                            `</button>` +
                        `</div>` +

                        `<div class="modal-body">` +

                            `<div class="form-group">` +
                                `<label>Nome do Cliente:</label>` +
                                `<input type="text" name="nome_cliente" class="form-control" value="` + row.nome_cliente + `" required>` +
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Contatos do Cliente:</label>` +
                                `<input type="text" name="contatos_cliente" class="form-control" value="` + row.contatos_cliente + `" placeholder="SSZ:john@mail.com" required>` +
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Contatos da Origem:</label>` +
                                `<textarea rows="5" name="contatos_origem" class="form-control">` + row.contatos_origem + `</textarea>` +
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Tipo de Embarque:</label>` +
                                `<select name="tipo_embarque" class="form-control" required>` +
                                    `<option value="" selected>Valor atual: ` + row.tipo_embarque + `</option>` +
                                    `<option value="Collect">Collect</option>` +
                                    `<option value="Prepaid">Prepaid</option>` +
                               ` </select>` +
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Frete Negociado:</label>` +
                                `<textarea rows="5" name="tipo_frete_negociado" class="form-control" >` + row.tipo_frete_negociado + `</textarea>` +
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Cliente Aprova HBL:</label>` +
                                `<select name="cliente_aprova_hbl" class="form-control" required>` +
                                    `<option value="" selected>Valor atual: ` + row.cliente_aprova_hbl + `</option>` +
                                    `<option value="Sim">Sim</option>` +
                                    `<option value="Não">Não</option>` +
                                `</select>` +
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Envio de RI:</label>` +
                                `<select name="envio_ri" class="form-control" required>` +
                                    `<option value="" selected>Valor atual: ` + row.envio_ri + `</option>` +
                                    `<option value="Sim">Sim</option>` +
                                    `<option value="Não">Não</option>` +
                                `</select>` +
                            `</div>` +
                            
                            `<div class="form-group">` +
                                `<label>Seguro:</label>` +
                                `<select name="tem_seguro" class="form-control" required>` +
                                    `<option value="" selected>Valor atual: ` + row.tem_seguro + `</option>` +
                                    `<option value="Sim">Sim</option>` +
                                    `<option value="Não">Não</option>` +
                                `</select>` +
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Desembaraço Ceva:</label>` +
                                `<select name="desembaraco_ceva" class="form-control" required>` +
                                    `<option value="" selected>Valor atual: ` + row.desembaraco_ceva + `</option>` +
                                    `<option value="Sim">Sim</option>` +
                                    `<option value="Não">Não</option>` +
                                `</select>` +
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Taxas de Destino:</label>` +
                                `<textarea rows="5" name="taxas_destino" class="form-control">` + row.taxas_destino + `</textarea>` +
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Volume de Embarques / mês:</label>` +
                                `<input type="number" name="embarques_mes" class="form-control" value="` + row.embarques_mes + `" required>` +
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Freetime:</label>` +
                                `<input type="text" name="freetime" class="form-control" value="` + row.freetime + `" required>` +
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Observações:</label>` +
                                `<textarea rows="5" name="observacoes" class="form-control">` + row.observacoes + `</textarea>` +
                            `</div>` +

                            `<div class="form-group">` +
                                `<label>Criado Por:</label>` +
                                `<input type="text" name="criada_por" class="form-control" value="` + row.criada_por + `" required>` +
                            `</div>` +

                            '<input type="hidden" class="form-control" name="id" value="'+ row.id +'">' +

                        `</div>` +

                        `<div class="modal-footer">` +
                            `<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>` +
                            `<button type="submit" class="btn btn-primary">Salvar</button>` +
                        `</div>` +

                    `</form>` +

                    `</div>` +
                `</div>` +
            `</div>`
        ;

        let btnModalExcluir =
            `<button class="btn btn-danger" title="Excluir Perfil" data-toggle="modal" data-target="#modalExcluiPerfil` + row.id + `">` +
                `<i class="fas fa-lg fa-times"></i>` +
            `</button>` +

            `<div class="modal fade" id="modalExcluiPerfil` + row.id + `" tabindex="-1" role="dialog" aria-hidden="true">` +
                `<div class="modal-dialog" role="document">` +
                    `<div class="modal-content">` +

                    `<form class="form-exclui-perfil" id="formExcluiPerfil` + row.id + `">` +

                        `<div class="modal-header">` +
                            `<h5 class="modal-title">Excluir Perfil de Cliente</h5>` +
                            `<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">` +
                                `<span aria-hidden="true">&times;</span>` +
                            `</button>` +
                        `</div>` +

                        `<div class="modal-body">` +

                             `<div class="form-group">` +
                                `<label>Clique em Salvar para excluir o perfil: ` + row.id  + ` - Cliente: ` + row.nome_cliente + `.</label>` +
                            `</div>` +

                            '<input type="hidden" class="form-control" name="id" value="'+ row.id +'">' +

                        `</div>` +

                        `<div class="modal-footer">` +
                            `<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>` +
                            `<button type="submit" class="btn btn-primary">Salvar</button>` +
                        `</div>` +

                    `</form>` +

                    `</div>` +
                `</div>` +
            `</div>`
        ;


        let linha = 
        `<tr>` +
            `<td>` + row.id + `</td>` +
            `<td>` + row.nome_cliente + `</td>` +
            `<td>` + row.criada_por + `</td>` +
            `<td>` + btnModalConsultar + `</td>` +
            `<td>` + btnModalAlterar + `</td>` +
            `<td>` + btnModalExcluir + `</td>` +
        `</tr>`
        ;

        $(linha).appendTo('#tabelaPerfisCadastrados');

    });

};

/*******************\
| Cria tabela limpa |
\*******************/

// db.run(`DROP TABLE tbl_perfil_cliente;`);

// db.run(
//     `CREATE TABLE tbl_perfil_cliente (` +
//         `id INTEGER PRIMARY KEY AUTOINCREMENT,` +
//         `nome_cliente TEXT NOT NULL,` +
//         `contatos_cliente TEXT NOT NULL,` +
//         `contatos_origem TEXT NOT NULL,` +
//         `tipo_embarque TEXT NOT NULL,` +
//         `tipo_frete_negociado TEXT NOT NULL,` +
//         `cliente_aprova_hbl TEXT NOT NULL,` +
//         `envio_ri TEXT NOT NULL,` +
//         `tem_seguro TEXT NOT NULL,` +
//         `taxas_destino TEXT NOT NULL,` +
//         `desembaraco_ceva TEXT NOT NULL,` +
//         `embarques_mes INTEGER NOT NULL,` +
//         `freetime TEXT NOT NULL,` +
//         `observacoes TEXT,` +
//         `criada_por TEXT NOT NULL` +
//     `);`
// );

// db.close();

/*************************************\
| INSERT na tabela ao cadastrar perfil|
\*************************************/

$('#formCadastraPerfil').submit( function(e) {

    e.preventDefault();

    let data = getFormData($(this));

    db.run(
        `INSERT INTO tbl_perfil_cliente (` +
            `nome_cliente, ` +
            `contatos_cliente, ` +
            `contatos_origem, ` +
            `tipo_embarque, ` +
            `tipo_frete_negociado, ` +
            `cliente_aprova_hbl, ` +
            `envio_ri, ` +
            `tem_seguro, ` +
            `taxas_destino, ` +
            `desembaraco_ceva, ` +
            `embarques_mes, ` +
            `freetime, ` +
            `observacoes, ` +
            `criada_por` +
        `)
        VALUES (` +
            `"` + data.nome_cliente + `", ` +
            `"` + data.contatos_cliente + `", ` +
            `"` + data.contatos_origem + `", ` +
            `"` + data.tipo_embarque + `", ` +
            `"` + data.tipo_frete_negociado + `", ` +
            `"` + data.cliente_aprova_hbl + `", ` +
            `"` + data.envio_ri + `", ` +
            `"` + data.tem_seguro + `", ` +
            `"` + data.taxas_destino + `", ` +
            `"` + data.desembaraco_ceva + `", ` +
            `"` + data.embarques_mes + `", ` +
            `"` + data.freetime + `", ` +
            `"` + data.observacoes + `", ` +
            `"` + data.criada_por + `"` +
        `);`
    ,function(er) {
            if (er) {
                return console.log(er.message);
            } else {
            console.log(`ID ${this.lastID} gravado com sucesso!`);
            refresh();
            }
    });
     
});

/***********************************\
| UPDATE na tabela ao alterar perfil|
\***********************************/

$('.form-altera-perfil').submit( function(e) {

    console.log($(this));

    e.preventDefault();

    let data = getFormData($(this));

    db.run(
        `UPDATE tbl_perfil_cliente SET(` +
            `nome_cliente = "` + data.nome_cliente + `", ` +
            `contatos_cliente = "` + data.contatos_cliente + `", ` +
            `contatos_origem = "` + data.contatos_origem + `", ` +
            `tipo_embarque = "` + data.tipo_embarque + `", ` +
            `tipo_frete_negociado = "` + data.tipo_frete_negociado + `", ` +
            `cliente_aprova_hbl = "` + data.cliente_aprova_hbl + `", ` +
            `envio_ri = "` + data.envio_ri + `", ` +
            `tem_seguro = "` + data.tem_seguro + `", ` +
            `taxas_destino = "` + data.taxas_destino + `", ` +
            `desembaraco_ceva = "` + data.desembaraco_ceva + `", ` +
            `embarques_mes = "` + data.embarques_mes + `", ` +
            `freetime = "` + data.freetime + `", ` +
            `observacoes = "` + data.observacoes + `", ` +
            `criada_por = "` + data.criada_por + `"` +
        `)
        WHERE 
            id = ` + data.id + `;`
    ,function(er) {
            if (er) {
                return console.log(er.message);
            } else {
            console.log(`ID ${this.lastID} gravado com sucesso!`);
            refresh();
            }
    });

});

/***********************************\
| DELETE na tabela ao excluir perfil|
\***********************************/

$('.form-exclui-perfil').submit( function(e) {

    e.preventDefault();

    let data = getFormData($(this));

    // db.run(
    // ,function(er) {
    //         if (er) {
    //             return console.log(er.message);
    //         } else {
    //         console.log(`ID ${this.lastID} gravado com sucesso!`);
    //         refresh();
    //         }
    // });

});
