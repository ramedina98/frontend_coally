const validateInput = (type, value) => {
    if (type === "text") {
        // Verificar si solo contiene letras y espacios
        const textRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        return textRegex.test(value)
            ? { valid: true }
            : { valid: false, error: "Solo letras y espacios." };
    }

    if (type === "email") {
        // Validar formato de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value)
            ? { valid: true }
            : { valid: false, error: "Correo no es válido." };
    }

    return { valid: false, error: "Tipo de validación desconocido." };
};

export { validateInput };