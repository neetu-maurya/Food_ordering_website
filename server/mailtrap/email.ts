import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";
import { client,sender } from "./mailtrape";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipients = [
    {
      email
    }
  ];
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "verify your email",
      html: htmlContent.replace("{verificationToken}", verificationToken),
      category: "Email Verification",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email verification");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipients = [{ email }];
  const htmlContenet = generateWelcomeEmailHtml(name);
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Welcome to TotatoEats",
      html: htmlContenet,
      template_variables: {
        company_info_name: "TotatoEats",
        name: name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send welcome email");
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
) => {
  const recipients = [{ email }];
  const htmlContenet = generatePasswordResetEmailHtml(resetURL);
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Reset your password",
      html: htmlContenet,
      category: "Reset Password",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to Reset Password");
  }
};
export const sendResetSuccessEmail = async (
  email: string

) => {
  const recipients = [{ email }];
  const htmlContenet = generateResetSuccessEmailHtml();
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Password Reset Successfully",
      html: htmlContenet,
      category: "Password Reset",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send password reset success email");
  }
};
