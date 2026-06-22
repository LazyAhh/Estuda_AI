import api from "./api"

export const cadastrarUsuario = async (nome, email, cpf, senha, cargo) => {
    const cpfLimpo = cpf.replace(/\D/g, "")

    const resposta = await api.post('/users/create', {
        name_user: nome,
        email_user: email,
        cpf_user: cpfLimpo,
        password_user: senha,
        role_user: cargo,
    })

    console.log("usuario cadastrado!")
    return resposta.data
}
