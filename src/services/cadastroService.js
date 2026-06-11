import api from "./api";

export const cadastrarUsuario = async (nome, email, cpf, senha, cargo) => {
    try {

        const cpfApenasNumeros = cpf.replace(/\D/g, "");

        await api.post('/users/create', {
            name_user: nome,
            email_user: email,
            cpf_user: cpfApenasNumeros,
            password_user: senha,
            role_user: cargo,
        });

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Falha ao realizar o cadastro. Tente novamente"
        }
    };
}
