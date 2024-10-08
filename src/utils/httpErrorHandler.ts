export const handleHttpError = (error: any): string => {
    if (!error.response) {
        return "Erro de conexão. Verifique sua internet ou tente novamente mais tarde.";
    }

    const { status } = error.response;

    switch (status) {
        case 400:
            return "Solicitação inválida. Verifique os dados enviados.";
        case 401:
            return "Não autorizado. Por favor, faça login novamente.";
        case 403:
            return "Acesso proibido. Você não tem permissão para acessar este recurso.";
        case 404:
            return "Recurso não encontrado.";
        case 500:
            return "Erro interno do servidor. Tente novamente mais tarde.";
        case 502:
            return "Bad Gateway. O servidor está temporariamente fora de serviço.";
        case 503:
            return "Serviço indisponível. Tente novamente mais tarde.";
        default:
            return `Erro inesperado: ${error.message}`;
    }
};