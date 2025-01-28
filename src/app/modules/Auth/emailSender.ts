import nodemailer from "nodemailer";
import config from "../../../config";

const emailSender = async (subject: string, email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "fbelalhossain2072@gmail.com",
      pass: "itke gexv rold mhry",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: '"andrewdavenpo" <fbelalhossain2072@gmail.com>',
    to: email,
    subject: `${subject}`,
    html,
  });

  // console.log("Message sent: %s", info.messageId);
};

export default emailSender;
