import nodemailer from "nodemailer";


const emailSender = async (subject: string, email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "fbelalhossain2072@gmail.com",
      pass: "itke gexv rold mhry",
      // user: config.emailSender.email,
      // pass: config.emailSender.app_pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"eleysGroup" <fbelalhossain2072@gmail.com>',
      to: email,
      subject: `${subject}`,
      html,
    });
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

export default emailSender;
