import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className='flex flex-row justify-around'>
            <div className='flex flex-col'>
                <div>
                    <h3>EstudaAI</h3>
                    <p>Plataforma inteligente para simplificar sua vida acadêmica</p>
                </div>

                <div>
                    <h4>Navegação</h4>
                    <ul>
                        <li><a href='#recursos'>Recursos</a></li>
                        <li><a href='#como-funciona'>Como funciona</a></li>
                        <li><Link to={"/cadastro"}>Criar conta</Link></li>
                    </ul>
                </div>
            </div>

            <div>
                <p>
                    &copy; {new Date().getFullYear()} EstudaAI. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    )
}