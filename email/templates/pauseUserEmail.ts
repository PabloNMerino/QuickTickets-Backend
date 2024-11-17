export const pausedUserTemplate = (): string => {

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cuenta Pausada - QuickTickets</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #2B293D; color: #FFFFFF; padding: 20px; margin: 0;">
    <table width="100%" style="max-width: 600px; margin: auto; background-color: #2B293D; color: #FFFFFF;">
        <tr>
            <td style="text-align: center; padding: 20px;">
                <h1 style="color: #FFE047; margin-bottom: 5px;">Notificación Importante</h1>
                <p style="color: #FFFFFF; font-size: 16px;">Tu cuenta ha sido pausada por actividad sospechosa.</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <p style="color: #FFFFFF; font-size: 16px;">
                    Estimado usuario,
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Hemos detectado actividad sospechosa en tu cuenta y, como medida de seguridad, un administrador ha decidido pausarla temporalmente.
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Para garantizar la seguridad de tu cuenta, por favor:
                </p>
                <ul style="color: #FFE047; font-size: 16px; line-height: 1.5; padding-left: 20px;">
                    <li>Contacta a nuestro equipo de soporte</li>
                    <li>Evita compartir tus credenciales con terceros.</li>
                    <li>Revisa cualquier actividad reciente que no reconozcas.</li>
                </ul>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Lamentamos los inconvenientes y agradecemos tu comprensión.
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