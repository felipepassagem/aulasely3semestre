idatual = 0;

const modal = new bootstrap.Modal(
    document.getElementById('modal-alterar')
);


const modalExckuir = new bootstrap.Modal(
    document.getElementById('modal-excluir')
);

function novo() {
    idatual = -1;
    const txtnome = document.getElementById("txtnome");
    const txttelefone = document.getElementById("txttelefone");
    const txtemail = document.getElementById("txtemail");
    const txtsenha = document.getElementById("txtsenha");

    txtnome.value = "";
    txttelefone.value = "";
    txtemail.value = "";
    txtsenha.value = "";


    modal.show();

}

function alterar(id) {
    // http://127.0.0.1:3333/usuario/



    fetch("http://127.0.0.1:3333/usuario/" + id)
        .then(response => response.json())
        .then(dados => {
            dados = dados[0]
            const txtnome = document.getElementById("txtnome");
            const txttelefone = document.getElementById("txttelefone");
            const txtemail = document.getElementById("txtemail");
            const txtsenha = document.getElementById("txtsenha");


            txtnome.value = dados.nome,
                txttelefone.value = dados.telefone,
                txtemail.value = dados.email,
                txtsenha.value = dados.senha,
                modal.show()
        }
        )
}



function listar() {
    // http://127.0.0.1:3333/usuario/

    const lista = document.getElementById("table");
    lista.innerHTML = "<tr><td colspan=5> Carregando... </td></tr>"
    txtpesquisa = document.getElementById("txtpesquisa");

    fetch("http://127.0.0.1:3333/usuario/?pesquisa="+txtpesquisa.value)
        .then(response => response.json())
        .then(dados => mostrar(dados))


}

function mostrar(dados) {
    // dados = dados[0]
    const lista = document.getElementById("table");


    lista.innerHTML = "";

    for (var i in dados) {
        let id = dados[i].idusuario;
        lista.innerHTML += "<tr>"
            + "<td>" + id + "</td>"
            + "<td>" + dados[i].nome + "</td>"
            + "<td>" + dados[i].telefone + "</td>"
            + "<td>" + dados[i].email + "</td>"
            + "<td> <button class='btn btn-success' onclick=alterar(" + id + ")><i class='bi bi-pencil'></i></button> <button class='btn btn-danger' onclick='showModalExcluir("+id+")'><i class='bi bi-trash'></i></button></td>"
            + "</tr>"
    }
}

function showModalExcluir(id){
    modalExckuir.show();
    idatual = id;
}

function excluirSim() {
    url = "http://127.0.0.1:3333/usuario/" + idatual;
    metodo = "DELETE"

    if (idatual > 0) {
        fetch(url,
            
            {
                method: metodo,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                },

                method: "DELETE",
            }
        ).then(() => {
            modalExckuir.hide();
            listar();
            
        })
    }

    
    // if (window.confirm("Gostarias realemtne de excluir este registro?")) {

    //     fetch(url,
    //         {
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'

    //             },

    //             method: "DELETE",
    //         }
    //     ).then(() => {
    //         listar();
    //         alert("APAGOU")
    //     })


    // } else {
    //     alert("NAO APAGOU")
    // }

}



// Função fetch com timeout
function fetchWithTimeout(url, options, timeout = 5000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 5000)
        )
    ]);
}

// function salvar(){
//     const txtnome = document.getElementById("txtnome");
//     const txttelefone = document.getElementById("txttelefone");
//     const txtemail = document.getElementById("txtemail");
//     const txtsenha = document.getElementById("txtsenha");

//     const dados = {
//         nome: txtnome.value,
//         telefone: txttelefone.value,
//         email: txtemail.value,
//         senha: txtsenha.value
//     }

//     if (idatual <= 0) {
//         //inserir
//         fetch("http://127.0.0.1:3333/usuario/",
//             {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'

//                 },

//                 method: "POST", body: JSON.stringify(dados)}
//                 ).then(() => {
//                     modal.hide();
//                     listar();
//                 })
//     } else {
//         //alterar
//     }
// }

function salvar() {
    const txtnome = document.getElementById("txtnome");
    const txttelefone = document.getElementById("txttelefone");
    const txtemail = document.getElementById("txtemail");
    const txtsenha = document.getElementById("txtsenha");

    const dados = {
        nome: txtnome.value,
        telefone: txttelefone.value,
        email: txtemail.value,
        senha: txtsenha.value
    }
    var url;
    var metodo;
    if (idatual <= 0) {
        // Inserir
        url = "http://127.0.0.1:3333/usuario"
        metodo = "POST"
    }
    else {
        url = "http://127.0.0.1:3333/usuario" + idatual
        metodo = "PUT"
    }

    fetchWithTimeout(url,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: metodo,
            body: JSON.stringify(dados)
        },
        0 // Defina o tempo limite em milissegundos aqui
    )
        .then(() => {

            modal.hide();
            listar();
        })
        .catch(error => {
            console.error('Erro:', error);
            // Lidar com erros, incluindo timeout
        });
}



listar()