idatual = 0;

const modal = new bootstrap.Modal(
    document.getElementById('modal-alterar')
);

function novo(){
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

function alterar(){
    
}

function listar(){
    // http://127.0.0.1:3333/usuario/

    const lista = document.getElementById("table");
    lista.innerHTML = "<tr><td colspan=5> Carregando... </td></tr>"

    fetch("http://127.0.0.1:3333/usuario/")
    .then(response => response.json())
    .then(dados => mostrar(dados))
    
    
}

function mostrar(dados){
    // dados = dados[0]
    const lista = document.getElementById("table");
    

    lista.innerHTML = "";

    for(var i in dados) {
        let id = dados[i].idusuario;
        lista.innerHTML += "<tr>"
        + "<td>" + id + "</td>"
        + "<td>" + dados[i].nome + "</td>" 
        + "<td>" + dados[i].telefone + "</td>" 
        + "<td>" + dados[i].email + "</td>" 
        + "<td> <button class='btn btn-success' onclick=alterar("+id+")><i class='bi bi-pencil'></i></button> <button class='btn btn-danger' onclick=exccluir("+id+")><i class='bi bi-trash'></i></button></td>"
        + "</tr>"
    }
}

function excluir(){
    
}

function excluirSim(){
    
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

    if (idatual <= 0) {
        // Inserir
        fetchWithTimeout("http://127.0.0.1:3333/usuario/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(dados)
            },
            0 // Defina o tempo limite em milissegundos aqui
        )
        .then(() => {
            console.log("ASDASDASDASD")
            modal.hide();
            listar();
        })
        .catch(error => {
            console.error('Erro:', error);
            // Lidar com erros, incluindo timeout
        });
    } else {
        // Alterar
    }
    
}

listar()