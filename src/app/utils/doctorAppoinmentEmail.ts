const doctorAppoinmentEmail = (payload: any) => {
  return `
    
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Patient Appointment</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f0f0f0;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; border: 0; border-spacing: 0; background-color: #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 20px 30px; background-color: #005eb8;">
                            <h1 style="margin: 0; font-size: 24px; line-height: 28px; font-weight: bold; color: #ffffff;">New Patient Appointment</h1>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px;">
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #333333;">
                                Dear Dr. Smith,
                            </p>
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #333333;">
                                A new appointment has been scheduled with you. Here are the details:
                            </p>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid #dddddd;">
                                <tr>
                                    <td style="padding: 10px; border: 1px solid #dddddd; width: 40%; font-weight: bold; color: #333333;">Patient Name:</td>
                                    <td style="padding: 10px; border: 1px solid #dddddd; color: #333333;">John Doe</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold; color: #333333;">Date:</td>
                                    <td style="padding: 10px; border: 1px solid #dddddd; color: #333333;">Monday, June 5, 2023</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold; color: #333333;">Time:</td>
                                    <td style="padding: 10px; border: 1px solid #dddddd; color: #333333;">2:30 PM</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold; color: #333333;">Duration:</td>
                                    <td style="padding: 10px; border: 1px solid #dddddd; color: #333333;">30 minutes</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold; color: #333333;">Appointment Type:</td>
                                    <td style="padding: 10px; border: 1px solid #dddddd; color: #333333;">Follow-up</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold; color: #333333;">Reason for Visit:</td>
                                    <td style="padding: 10px; border: 1px solid #dddddd; color: #333333;">Medication review</td>
                                </tr>
                            </table>
                            <p style="margin: 20px 0 0 0; font-size: 16px; line-height: 24px; color: #333333;">
                                To view more details or make changes to this appointment, please click the button below:
                            </p>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                                <tr>
                                    <td align="center">
                                        <a href="https://example.com/appointment-details" style="background-color: #005eb8; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">View Appointment Details</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 30px; background-color: #f8f8f8; font-size: 14px; line-height: 20px; color: #666666; text-align: center;">
                            <p style="margin: 0;">
                                This is an automated message. Please do not reply to this email.<br>
                                If you need assistance, please contact the scheduling department.
                            </p>
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

export default doctorAppoinmentEmail;
