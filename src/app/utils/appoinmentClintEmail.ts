const appoinmentClientEmail = (payload: any) => {
  return `
    
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Slot Booking</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; border: 0; border-spacing: 0; background-color: #ffffff;">
                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 40px 0 30px 0; background-color: #70bbd9;">
                            <img src="https://via.placeholder.com/200x50" alt="Logo" width="200" style="height: auto; display: block;" />
                        </td>
                    </tr>
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 36px 30px 42px 30px;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0;">
                                <tr>
                                    <td style="padding: 0 0 36px 0; color: #153643;">
                                        <h1 style="font-size: 24px; margin: 0 0 20px 0; font-family: Arial, sans-serif;">Your Appointment Slot is Reserved!</h1>
                                        <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px; font-family: Arial, sans-serif;">Dear [Client Name],</p>
                                        <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px; font-family: Arial, sans-serif;">We're excited to confirm that your appointment slot has been reserved. Here are the details:</p>
                                        <ul style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px; font-family: Arial, sans-serif;">
                                            <li>Date: [Appointment Date]</li>
                                            <li>Time: [Appointment Time]</li>
                                            <li>Service: [Service Name]</li>
                                            <li>Location: [Location Details]</li>
                                        </ul>
                                        <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px; font-family: Arial, sans-serif;">Please confirm your appointment by clicking the button below:</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding: 0;">
                                        <table role="presentation" style="border-collapse: collapse; border: 0; border-spacing: 0;">
                                            <tr>
                                                <td align="center" style="padding: 0; background-color: #70bbd9;">
                                                    <a href="[Confirmation Link]" style="color: #ffffff; text-decoration: none; font-weight: bold; display: block; padding: 12px 25px; font-size: 16px;">Confirm Appointment</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 30px 0 0 0; color: #153643;">
                                        <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px; font-family: Arial, sans-serif;">If you need to reschedule or have any questions, please don't hesitate to contact us.</p>
                                        <p style="margin: 0; font-size: 16px; line-height: 24px; font-family: Arial, sans-serif;">We look forward to seeing you!</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #70bbd9;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0; font-size: 9px; font-family: Arial, sans-serif;">
                                <tr>
                                    <td style="padding: 0; width: 50%;" align="left">
                                        <p style="margin: 0; font-size: 14px; line-height: 16px; font-family: Arial, sans-serif; color: #ffffff;">
                                            &reg; [Your Company Name], 2023<br/>
                                        </p>
                                    </td>
                                    <td style="padding: 0; width: 50%;" align="right">
                                        <table role="presentation" style="border-collapse: collapse; border: 0; border-spacing: 0;">
                                            <tr>
                                                <td style="padding: 0 0 0 10px; width: 38px;">
                                                    <a href="http://www.twitter.com/" style="color: #ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height: auto; display: block; border: 0;" /></a>
                                                </td>
                                                <td style="padding: 0 0 0 10px; width: 38px;">
                                                    <a href="http://www.facebook.com/" style="color: #ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height: auto; display: block; border: 0;" /></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    
    `;
};

export default appoinmentClientEmail;
