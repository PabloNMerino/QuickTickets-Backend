export const newEventTemplate = (name: string, description: string, date: Date): string => {

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Evento en tu Localidad - QuickTickets</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #2B293D; color: #FFFFFF; padding: 20px; margin: 0;">
    <table width="100%" style="max-width: 600px; margin: auto; background-color: #2B293D; color: #FFFFFF;">
        <tr>
            <td style="text-align: center; padding: 20px;">
                <h1 style="color: #FFE047; margin-bottom: 5px;">¡Nuevo evento en tu localidad!</h1>
                <p style="color: #FFFFFF; font-size: 16px;">¡No te pierdas el evento "${name}"!</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <p style="color: #FFFFFF; font-size: 16px;">
                    Estimado usuario,
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Nos complace informarte que el evento <strong>${name}</strong> se ha programado en tu localidad. La cita será el día <strong>${date}</strong>.
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    <strong>Descripción del evento:</strong><br>
                    ${description}
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Prepárate para disfrutar de una experiencia única. ¡No olvides reservar tus entradas lo antes posible!
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Para más información sobre este y otros eventos, visita nuestra plataforma QuickTickets.
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    ¡Te esperamos!
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