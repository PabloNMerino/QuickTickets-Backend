import { registrationTemplate } from "../templates/registrationEmail"
import { minify } from 'html-minifier-terser';
import { transporter } from "../config/emailSenderConfig"

class EmailService {

    async sendRegistrationEmail(destinationEmail: string, userFullName: string) {
        const htmlContent = registrationTemplate(userFullName);
        const minifiedHtml = await minify(htmlContent, {
                                collapseWhitespace: true,
                                removeComments: true,
                                minifyCSS: true,
                                minifyJS: true,
                            });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: destinationEmail,
            subject: `¡Bienvenido a QuickTickets!`,
            html: minifiedHtml,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Correo enviado:', info.response);
        } catch (error) {
            console.error('Error enviando el correo:', error);
        }
    }

    async sendPurchaseEmail(destinationEmail: string, userFullName: string) {
        const htmlContent = registrationTemplate(userFullName);
        const minifiedHtml = await minify(htmlContent, {
                                collapseWhitespace: true,
                                removeComments: true,
                                minifyCSS: true,
                                minifyJS: true,
                            });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: destinationEmail,
            subject: `¡Bienvenido a QuickTickets!`,
            html: minifiedHtml,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Correo enviado:', info.response);
        } catch (error) {
            console.error('Error enviando el correo:', error);
        }
    }
}

export const emailService = new EmailService();