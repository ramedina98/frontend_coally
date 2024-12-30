const Footer = () => {
    return (
        <footer
            className="w-full bg-blue-soft p-6 flex justify-center items-center"
        >
            <div
                className="flex flex-wrap gap-6 justify-between items-center text-slate-200 text-base tracking-wide font-medium underline"
                style={{ width: 'clamp(220px, 90%, 1260px)' }}
            >
                <div>Español</div>
                <div>
                    <ul
                        className="flex flex-wrap justify-between items-center"
                        style={{ width: '480px' }}
                    >
                        <li>Seguridad</li>
                        <li>Términos y condiciones</li>
                        <li>Politicas de privacidad</li>
                    </ul>
                </div>
                <div>
                    <span>
                        Declaración de accesibilidad
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;