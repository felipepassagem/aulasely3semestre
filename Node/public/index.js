idatual = 0;

function novo(){
    const txtnome = document.getElementById("txtnome");
    const txttelefone = document.getElementById("txttelefone");
    const txtemail = document.getElementById("txtemail");
    const txtsenha = document.getElementById("txtsenha");
    
    txtnome.value = "";
    txttelefone.value = "";
    txtemail.value = "";
    txtsenha.value = "";

    const modal = new bootstrap.Modal(
        document.getElementById('modal-alterar')
    );
    modal.show();

}

function alterar(){
    
}

function listar(){
    
}

function excluir(){
    
}

function excluirSim(){
    
}

function salvar(){
    
}