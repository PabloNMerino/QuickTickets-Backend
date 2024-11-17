export const activeEventTemplate = (name: string): string => {

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Evento Restablecido - QuickTickets</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #2B293D; color: #FFFFFF; padding: 20px; margin: 0;">
    <table width="100%" style="max-width: 600px; margin: auto; background-color: #2B293D; color: #FFFFFF;">
        <tr>
            <td style="text-align: center; padding: 20px;">
                <h1 style="color: #FFE047; margin-bottom: 5px;">¡Tu evento ha sido restablecido!</h1>
                <p style="color: #FFFFFF; font-size: 16px;">Tu evento ahora está nuevamente activo en QuickTickets.</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <p style="color: #FFFFFF; font-size: 16px;">
                    Estimado usuario,
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Nos alegra informarte que tu evento "${name}" ha sido revisado y cumple con las políticas de QuickTickets. Ahora está nuevamente activo y disponible para los usuarios.
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Te recomendamos seguir las mejores prácticas para garantizar que tu evento mantenga el cumplimiento de nuestras políticas:
                </p>
                <ul style="color: #FFE047; font-size: 16px; line-height: 1.5; padding-left: 20px;">
                    <li>Actualiza cualquier información necesaria de manera clara y precisa.</li>
                    <li>Revisa las políticas de uso regularmente.</li>
                    <li>Contacta a nuestro equipo si tienes alguna duda o consulta.</li>
                </ul>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Estamos aquí para apoyarte en todo lo que necesites. Gracias por tu confianza y por ser parte de QuickTickets.
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Saludos cordiales,<br>
                    El equipo de QuickTickets
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #FFE047; padding: 15px; text-align: center;">
                <p style="color: #2B293D; font-size: 14px;">
                    © 2024 QuickTickets. Todos los derechos reservados.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`
}