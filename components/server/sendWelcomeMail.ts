import nodemailer from "nodemailer";


interface Props {
  userEmail: string;
  userName: string;
}

export const sendWelcomeEmail = async ({ userEmail, userName }: Props) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.mailID, // Your Gmail email
        pass: process.env.mailPass, // Your App Password
      },
    });

    const mailOptions = {
      from: `"Ebook Reader 📖"`,
      to: userEmail, // Receiver's email
      subject: "📚 Welcome to Ebook Reader – Your Journey Begins!",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; background: #fff; padding: 20px; margin: auto; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333;">📖 Welcome, ${userName}! </h2>
            <p style="font-size: 16px; color: #555;">
              We’re thrilled to have you on board! Your reading journey starts now with **Ebook Reader** – your go-to place for discovering and enjoying endless books.
            </p>
            <p style="font-size: 16px; color: #555;">
              Get ready to explore, save your favorite books, and immerse yourself in amazing stories.
            </p>
            <p style="font-size: 16px; font-weight: bold; color: #444;">Happy Reading! 📚✨</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 14px; color: #777;">
              If you have any questions, feel free to reach out to us at **support@ebookreader.com**.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

