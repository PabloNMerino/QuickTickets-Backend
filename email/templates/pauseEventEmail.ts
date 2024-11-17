export const pauseEventTemplate = (name: string): string => {

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Evento Pausado - QuickTickets</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #2B293D; color: #FFFFFF; padding: 20px; margin: 0;">
    <table width="100%" style="max-width: 600px; margin: auto; background-color: #2B293D; color: #FFFFFF;">
        <tr>
            <td style="text-align: center; padding: 20px;">
                <h1 style="color: #FFE047; margin-bottom: 5px;">Notificación sobre tu evento</h1>
                <p style="color: #FFFFFF; font-size: 16px;">Tu evento ha sido pausado temporalmente.</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <p style="color: #FFFFFF; font-size: 16px;">
                    Estimado usuario,
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Queremos informarte que tu evento "${name}" ha sido pausado temporalmente, ya que no cumple con las políticas de uso de QuickTickets.
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Para resolver esta situación, te recomendamos revisar las siguientes acciones:
                </p>
                <ul style="color: #FFE047; font-size: 16px; line-height: 1.5; padding-left: 20px;">
                    <li>Consulta nuestras políticas de uso para identificar posibles incumplimientos.</li>
                    <li>Realiza los ajustes necesarios para que tu evento cumpla con los lineamientos establecidos.</li>
                    <li>Contacta a nuestro equipo de soporte para mayor asistencia.</li>
                </ul>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Nuestro equipo está disponible para ayudarte a resolver este inconveniente lo antes posible.
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Lamentamos cualquier inconveniente causado y agradecemos tu comprensión.
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