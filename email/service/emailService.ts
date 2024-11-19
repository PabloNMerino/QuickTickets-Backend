import { registrationTemplate } from "../templates/registrationEmail"
import { purchaseTemplate } from "../templates/purchaseEmail"
import { minify } from 'html-minifier-terser';
import { transporter } from "../config/emailSenderConfig"
import { activeUserTemplate } from "../templates/activeUserEmail"
import { pausedUserTemplate } from "../templates/pauseUserEmail"
import { pauseEventTemplate } from "../templates/pauseEventEmail"
import { activeEventTemplate } from "../templates/activeEventEmail"
import { reminderTemplate } from "../templates/remiderEmail"
import { forgotPasswordTemplate } from "../templates/forgotPasswordEmail"
import { lastReminderTemplate } from "../templates/lastReminderEmail"

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

    async sendPurchaseEmail(destinationEmail: string, title: string, date: Date, quantity: number) {
        const htmlContent = purchaseTemplate(title, date, quantity);
        const minifiedHtml = await minify(htmlContent, {
                                collapseWhitespace: true,
                                removeComments: true,
                                minifyCSS: true,
                                minifyJS: true,
                            });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: destinationEmail,
            subject: `¡Tu compra fue exitosa!`,
            html: minifiedHtml,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Correo enviado:', info.response);
        } catch (error) {
            console.error('Error enviando el correo:', error);
        }
    }

    async sendUserStatusEmail(destinationEmail: string, isActive: Boolean) {
        const htmlContent = isActive? activeUserTemplate() : pausedUserTemplate();
        const minifiedHtml = await minify(htmlContent, {
                                collapseWhitespace: true,
                                removeComments: true,
                                minifyCSS: true,
                                minifyJS: true,
                            });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: destinationEmail,
            subject: isActive? 'Tu cuanta ha sido reestablecida' : 'Tu cuenta ha sido pausada',
            html: minifiedHtml,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Correo enviado:', info.response);
        } catch (error) {
            console.error('Error enviando el correo:', error);
        }
    }

    async sendUserEventStatusEmail(destinationEmail: string, isActive: Boolean, eventName: string) {
        const htmlContent = isActive? activeEventTemplate(eventName) : pauseEventTemplate(eventName);
        const minifiedHtml = await minify(htmlContent, {
                                collapseWhitespace: true,
                                removeComments: true,
                                minifyCSS: true,
                                minifyJS: true,
                            });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: destinationEmail,
            subject: isActive? 'Tu evento ha sido reestablecido' : 'Tu evento ha sido pausado',
            html: minifiedHtml,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Correo enviado:', info.response);
        } catch (error) {
            console.error('Error enviando el correo:', error);
        }
    }

    async sendReminderEmail(destinationEmail: string, title: string, date: Date, quantity: number) {
        const htmlContent = reminderTemplate(title, date, quantity);
        const minifiedHtml = await minify(htmlContent, {
                                collapseWhitespace: true,
                                removeComments: true,
                                minifyCSS: true,
                                minifyJS: true,
                            });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: destinationEmail,
            subject: 'Tu evento se acerca!',
            html: minifiedHtml,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Correo enviado:', info.response);
        } catch (error) {
            console.error('Error enviando el correo:', error);
        }
    }

    async sendForgotPasswordEmail(destinationEmail: string, url: string) {
        const htmlContent = forgotPasswordTemplate(url);    
        const minifiedHtml = await minify(htmlContent, {
                                collapseWhitespace: true,
                                removeComments: true,
                                minifyCSS: true,
                                minifyJS: true,
                            });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: destinationEmail,
            subject: 'Reestablece tu constraseña',
            html: minifiedHtml,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Correo enviado:', info.response);
        } catch (error) {
            console.error('Error enviando el correo:', error);
        }
    }

    async sendLastReminderEmail(destinationEmail: string, title: string, date: Date, quantity: number) {
        const htmlContent = lastReminderTemplate(title, date, quantity);
        const minifiedHtml = await minify(htmlContent, {
                                collapseWhitespace: true,
                                removeComments: true,
                                minifyCSS: true,
                                minifyJS: true,
                            });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: destinationEmail,
            subject: 'Tu evento es hoy!',
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