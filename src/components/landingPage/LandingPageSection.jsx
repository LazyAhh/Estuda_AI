import { Children } from "react"

export const LandingPageSection = ({ id, titulo, className, children }) => {
    return (
        <section id={id}>
            <h2>{titulo}</h2>
            <div className={className}>
                {children}
            </div>
        </section>
    )
}