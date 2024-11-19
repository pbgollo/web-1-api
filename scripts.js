$(document).ready(function() {
    const apiKey = "8175f301022f475daa5e6098c532a2aa";  // Chave da API para autenticação
    const apiUrl = "https://ucsweb1.azurewebsites.net/";  // URL base da API

    // Função para autenticar e obter o token
    function autenticar() {
        console.log("Iniciando autenticação...");
    
        $.ajax({
            url: apiUrl + "API/Autenticar",
            method: "POST",
            data: { chaveAPI: apiKey },
            success: function(response) {
                // Exibe toda a resposta no console para depuração
                console.log("Resposta completa da autenticação:", response);
    
                // O token é retornado diretamente na resposta
                if (response) {
                    console.log("Token recebido:", response); // Exibe o token no console
                    $('#token').val(response);  // Preenche o campo #token com o valor recebido
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

    // Função para buscar clientes sem autenticação
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

    // Função para buscar clientes com autenticação via token
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
            data: { auth: token },  // Passa o token no corpo da requisição
            success: function(response) {
                console.log("Resposta da busca de clientes autenticados: ", response);
                if (response) {
                    $('#clientes-auth-result').val(JSON.stringify(response, null, 2));  // Exibe os resultados da busca autenticada
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

    // Função para buscar clientes com autenticação via cabeçalho
    function buscarClientesAutenticadoHeader() {
        const token = $('#token').val();  // Obtém o token do campo de entrada

        if (!token) {
            alert("Por favor, autentique-se primeiro.");
            return;
        }

        console.log("Buscando clientes com autenticação no cabeçalho...");

        $.ajax({
            url: apiUrl + "API/BuscarClientesAutenticadoHeader",
            method: "POST",
            headers: {
                "authUCSJWT": token  // Passa o token no cabeçalho da requisição
            },
            success: function(response) {
                console.log("Resposta da busca de clientes com cabeçalho: ", response);
                if (response) {
                    $('#clientes-auth-header-result').val(JSON.stringify(response, null, 2));  // Exibe os resultados da busca com cabeçalho
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

    // Função para cadastrar cliente
    function cadastrarCliente() {
        const nome = $('#cliente-nome').val();  // Obtém o nome do cliente
        const telefone = $('#cliente-telefone').val();  // Obtém o telefone do cliente
        const token = $('#token').val();  // Obtém o token de autenticação

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
                "authUCSJWT": token  // Passa o token no cabeçalho da requisição
            },
            data: JSON.stringify(clienteData),  // Passa os dados do cliente em formato JSON
            contentType: "application/json",  // Especifica que estamos enviando JSON
            success: function(response) {
                console.log("Resposta do cadastro do cliente: ", response);
                if (response && response.Id) {
                    $('#cadastro-result').val(JSON.stringify(response, null, 2));  // Exibe o resultado do cadastro
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

    // Event listeners para os botões
    $('#btn-auth').click(autenticar);  // Chama a função de autenticação
    $('#btn-buscar-clientes').click(buscarClientesPOST);  // Chama a função de buscar clientes sem autenticação
    $('#btn-buscar-clientes-auth').click(buscarClientesAutenticado);  // Chama a função de buscar clientes com autenticação
    $('#btn-buscar-clientes-auth-header').click(buscarClientesAutenticadoHeader);  // Chama a função de buscar clientes com cabeçalho de autenticação
    $('#btn-cadastrar-cliente').click(cadastrarCliente);  // Chama a função de cadastrar cliente
});
