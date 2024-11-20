export const inactiveSubscriptionTemplate = (): string => {

    return`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Suscripción Cancelada - QuickTickets</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #2B293D; color: #FFFFFF; padding: 20px; margin: 0;">
    <table width="100%" style="max-width: 600px; margin: auto; background-color: #2B293D; color: #FFFFFF;">
        <tr>
            <td style="text-align: center; padding: 20px;">
                <h1 style="color: #FFE047; margin-bottom: 5px;">¡Tu suscripción ha sido cancelada!</h1>
                <p style="color: #FFFFFF; font-size: 16px;">Lamentamos que hayas decidido cancelar tu suscripción en QuickTickets.</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <p style="color: #FFFFFF; font-size: 16px;">
                    Estimado usuario,
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Te informamos que tu suscripción a los eventos de QuickTickets ha sido cancelada con éxito. A partir de ahora, no recibirás más información sobre eventos en tu zona.
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Si alguna vez deseas reactivar tu suscripción o unirte nuevamente a nuestra comunidad, estarás siempre bienvenido.
                </p>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    A continuación te dejamos algunas opciones que podrías considerar:
                </p>
                <ul style="color: #FFE047; font-size: 16px; line-height: 1.5; padding-left: 20px;">
                    <li>Revisar los eventos más cercanos en nuestra página web.</li>
                    <li>Explorar otras categorías de eventos que podrían interesarte.</li>
                    <li>Contactar con nuestro equipo de soporte si tienes alguna consulta.</li>
                </ul>
                <p style="color: #FFFFFF; font-size: 16px; line-height: 1.5;">
                    Agradecemos haber sido parte de tu experiencia en QuickTickets. Esperamos verte de nuevo en el futuro.
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
</html>`
}