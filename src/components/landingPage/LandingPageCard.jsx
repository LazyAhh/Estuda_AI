
export const LandingPageCard = ({titulo, descricao, className}) => {
    return(
    <div className={className}>
            <h3>{titulo}</h3>
            <p>{descricao}</p>
    </div>
    )
}