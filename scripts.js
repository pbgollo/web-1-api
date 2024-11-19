$(document).ready(function() {
    const apiKey = "8175f301022f475daa5e6098c532a2aa"; 
    const apiUrl = "https://ucsweb1.azurewebsites.net/";  

    function autenticar() {
        console.log("Iniciando autenticação...");
    
        $.ajax({
            url: apiUrl + "API/Autenticar",
            method: "POST",
            data: { chaveAPI: apiKey },
            success: function(response) {

                console.log("Resposta completa da autenticação:", response);

                if (response) {
                    console.log("Token recebido:", response);
                    $('#token').val(response);
                    alert("Token obtido com sucesso!");
                } else {
                    console.error("Token não encontrado no retorno.");
                    alert("Erro: Token não encontrado no retorno.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Erro na autenticação: ", error);
                alert("Erro ao autenticar. Verifique a chave da API.");
            }
        });
    }

    function buscarClientesPOST() {
        console.log("Buscando clientes sem autenticação...");

        $.ajax({
            url: apiUrl + "API/BuscarClientesPOST",
            method: "POST",
            headers: {
                "api_key": "ed4a8ae4-d7d7-4427-b925-e2408287a270" 
            },
            success: function(response) {
                console.log("Resposta da busca de clientes: ", response);
                if (response) {
                    $('#clientes-result').val(JSON.stringify(response, null, 2));  
                } else {
                    console.error("Nenhum cliente encontrado.");
                    alert("Nenhum cliente encontrado.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Erro na busca de clientes: ", error);
                alert("Erro ao buscar clientes.");
            }
        });
    }

    function buscarClientesAutenticado() {
        const token = $('#token').val(); 

        if (!token) {
            alert("Por favor, autentique-se primeiro.");
            return;
        }

        console.log("Buscando clientes com autenticação...");

        $.ajax({
            url: apiUrl + "API/BuscarClientesAutenticado",
            method: "POST",
            data: { auth: token },  
            success: function(response) {
                console.log("Resposta da busca de clientes autenticados: ", response);
                if (response) {
                    $('#clientes-auth-result').val(JSON.stringify(response, null, 2)); 
                } else {
                    console.error("Nenhum cliente encontrado com o token.");
                    alert("Nenhum cliente encontrado com o token.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Erro na busca de clientes autenticados: ", error);
                alert("Erro ao buscar clientes autenticados.");
            }
        });
    }

    function buscarClientesAutenticadoHeader() {
        const token = $('#token').val();

        if (!token) {
            alert("Por favor, autentique-se primeiro.");
            return;
        }

        console.log("Buscando clientes com autenticação no cabeçalho...");

        $.ajax({
            url: apiUrl + "API/BuscarClientesAutenticadoHeader",
            method: "POST",
            headers: {
                "authUCSJWT": token  
            },
            success: function(response) {
                console.log("Resposta da busca de clientes com cabeçalho: ", response);
                if (response) {
                    $('#clientes-auth-header-result').val(JSON.stringify(response, null, 2));  
                } else {
                    console.error("Nenhum cliente encontrado com o cabeçalho de autenticação.");
                    alert("Nenhum cliente encontrado com o cabeçalho de autenticação.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Erro na busca de clientes com cabeçalho: ", error);
                alert("Erro ao buscar clientes com cabeçalho de autenticação.");
            }
        });
    }

    function cadastrarCliente() {
        const nome = $('#cliente-nome').val(); 
        const telefone = $('#cliente-telefone').val(); 
        const token = $('#token').val();  

        if (!nome || !telefone) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if (!token) {
            alert("Por favor, autentique-se primeiro.");
            return;
        }

        const clienteData = {
            Telefone: telefone,
            Nome: nome
        };

        console.log("Cadastrando cliente...");

        $.ajax({
            url: apiUrl + "API/CadastrarCliente",
            method: "POST",
            headers: {
                "authUCSJWT": token  
            },
            data: JSON.stringify(clienteData), 
            contentType: "application/json",  
            success: function(response) {
                console.log("Resposta do cadastro do cliente: ", response);
                if (response && response.Id) {
                    $('#cadastro-result').val(JSON.stringify(response, null, 2)); 
                    alert("Cliente cadastrado com sucesso!");
                } else {
                    console.error("Erro ao cadastrar o cliente.");
                    alert("Erro ao cadastrar cliente.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Erro ao cadastrar cliente: ", error);
                alert("Erro ao cadastrar cliente.");
            }
        });
    }

    $('#btn-auth').click(autenticar);
    $('#btn-buscar-clientes').click(buscarClientesPOST); 
    $('#btn-buscar-clientes-auth').click(buscarClientesAutenticado); 
    $('#btn-buscar-clientes-auth-header').click(buscarClientesAutenticadoHeader); 
    $('#btn-cadastrar-cliente').click(cadastrarCliente); 
});
