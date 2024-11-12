export const registrationTemplate = (name: string): string => {

    return `<!DOCTYPE html>
            <html lang="es">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bienvenido a QuickTickets</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #2B293D; color: #FFFFFF; padding: 20px; margin: 0;">
            <table width="100%" style="max-width: 600px; margin: auto; background-color: #2B293D; color: #FFFFFF;">
                <tr>
                <td style="text-align: center; padding: 20px;">
                    <h1 style="color: #FFE047; margin-bottom: 5px;">¡Bienvenido a QuickTickets ${name}!</h1>
                    <p style="color: #FFFFFF; font-size: 16px;">Gracias por unirte a nuestra plataforma de compra de tickets online.</p>
                </td>
                </tr>
                <tr>
                <td style="padding: 20px;">
                    <p style="color: #FFFFFF; font-size: 16px;">
                    Estimado usuario,
                    </p>
                    <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    ¡Nos alegra mucho que hayas decidido ser parte de QuickTickets! En nuestra plataforma podrás descubrir y adquirir entradas para los mejores eventos en tu ciudad y mucho más.
                    </p>
                    <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Aquí tienes un breve resumen de los beneficios que obtendrás:
                    </p>
                    <ul style="color: #FFE047; font-size: 16px; line-height: 1.5; padding-left: 20px;">
                    <li>Compra de entradas rápida y segura</li>
                    <li>Acceso exclusivo a eventos destacados</li>
                    <li>Soporte al cliente 24/7</li>
                    </ul>
                    <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    ¡Esperamos que disfrutes de la experiencia!
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
