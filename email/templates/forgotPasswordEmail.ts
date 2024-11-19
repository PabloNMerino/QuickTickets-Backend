export const forgotPasswordTemplate = (url: string): string => {

return `<!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperación de Contraseña - QuickTickets</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #2B293D; color: #FFFFFF; padding: 20px; margin: 0;">
    <table width="100%" style="max-width: 600px; margin: auto; background-color: #2B293D; color: #FFFFFF;">
        <tr>
            <td style="text-align: center; padding: 20px;">
                <h1 style="color: #FFE047; margin-bottom: 5px;">Recuperación de Contraseña</h1>
                <p style="color: #FFFFFF; font-size: 16px;">¿Olvidaste tu contraseña? ¡No te preocupes!</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <p style="color: #FFFFFF; font-size: 16px;">
                    Estimado usuario,
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Hemos recibido una solicitud para restablecer tu contraseña. Si solicitaste este cambio, haz clic en el botón a continuación para actualizar tu contraseña:
                </p>
                <p style="text-align: center; margin: 20px 0;">
                    <a href="${url}" style="background-color: #FFE047; color: #2B293D; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; display: inline-block;">
                        Actualizar Contraseña
                    </a>
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Si no solicitaste esta acción, puedes ignorar este correo y tu contraseña permanecerá sin cambios.
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Saludos,<br>
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
    </html>`
}