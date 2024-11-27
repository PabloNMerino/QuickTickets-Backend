export const reminderTemplate = (title: string, date: Date, quantity: number): string => {

    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Recordatorio de Evento - QuickTickets</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #2B293D; color: #FFFFFF; padding: 20px; margin: 0;">
<table width="100%" style="max-width: 600px; margin: auto; background-color: #2B293D; color: #FFFFFF;">
    <tr>
        <td style="text-align: center; padding: 20px;">
            <h1 style="color: #FFE047; margin-bottom: 5px;">¡Falta 1 Semana para Tu Evento!</h1>
            <p style="color: #FFFFFF; font-size: 16px;">QuickTickets te recuerda que falta poco para disfrutar de tu evento.</p>
        </td>
    </tr>
    <tr>
        <td style="padding: 20px;">
            <p style="color: #FFFFFF; font-size: 16px;">
                Estimado usuario,
            </p>
            <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                ¡El momento se acerca! Aquí tienes un recordatorio de los detalles de tu evento:
            </p>
            <table width="100%" style="background-color: #1E1E2F; color: #FFFFFF; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <tr>
                    <td style="font-size: 16px; padding: 5px 0;">
                        <strong>Evento:</strong> ${title}
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 16px; padding: 5px 0;">
                        <strong>Fecha:</strong> ${date}
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 16px; padding: 5px 0;">
                        <strong>Cantidad de entradas:</strong> ${quantity}
                    </td>
                </tr>
            </table>
            <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                Asegúrate de tener tus tickets listos. Haz clic en el botón de abajo para acceder a ellos:
            </p>
            <p style="text-align: center; margin: 20px 0;">
                <a href="https://bootcamps3-proyecto-final-frontend.vercel.app/tickets" style="background-color: #FFE047; color: #2B293D; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; display: inline-block;">
                    Ver Mis Tickets
                </a>
            </p>
            <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                ¡Esperamos que disfrutes al máximo de tu evento!
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