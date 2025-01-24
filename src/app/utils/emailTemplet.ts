const emailTemplate = (payload:any) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 30px; background-color: #0056b3; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0;">Thank You for Contacting Us</h1>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5;">Dear ${payload.name},</p>
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5;">Thank you for reaching out to us. We have received your message and appreciate you taking the time to contact us.</p>
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5;">Our team will review your inquiry and get back to you as soon as possible, usually within 1-2 business days.</p>
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5;">Here's a summary of the information you provided:</p>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Name:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${payload.name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Email:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${payload.email}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Subject:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${payload.phone}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Subject:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${payload.country}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Subject:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${payload.address}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px;"><strong>Message:</strong></td>
                                    <td style="padding: 10px;">${payload.message}</td>
                                </tr>
                            </table>
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5;">If you have any additional questions or concerns, please don't hesitate to reply to this email.</p>
                            <p style="margin: 0; font-size: 16px; line-height: 1.5;">Best regards,<br>The [Your Company] Team</p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #f0f0f0; text-align: center;">
                            <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #666666;">&copy; 2023 [Your Company]. All rights reserved.</p>
                            <p style="margin: 10px 0 0 0; font-size: 14px; line-height: 1.5; color: #666666;">
                                <a href="https://www.yourcompany.com" style="color: #0056b3; text-decoration: none;">Visit our website</a> | 
                                <a href="https://www.yourcompany.com/privacy" style="color: #0056b3; text-decoration: none;">Privacy Policy</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
};

export default emailTemplate;
