"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetSuccessEmail = exports.sendPasswordResetEmail = exports.sendWelcomeEmail = exports.sendVerificationEmail = void 0;
const htmlEmail_1 = require("./htmlEmail");
const mailtrape_1 = require("./mailtrape");
const sendVerificationEmail = (email, verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const recipients = [
        {
            email
        }
    ];
    try {
        const res = yield mailtrape_1.client.send({
            from: mailtrape_1.sender,
            to: recipients,
            subject: "verify your email",
            html: htmlEmail_1.htmlContent.replace("{verificationToken}", verificationToken),
            category: "Email Verification",
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to send email verification");
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
const sendWelcomeEmail = (email, name) => __awaiter(void 0, void 0, void 0, function* () {
    const recipients = [{ email }];
    const htmlContenet = (0, htmlEmail_1.generateWelcomeEmailHtml)(name);
    try {
        const res = yield mailtrape_1.client.send({
            from: mailtrape_1.sender,
            to: recipients,
            subject: "Welcome to TotatoEats",
            html: htmlContenet,
            template_variables: {
                company_info_name: "TotatoEats",
                name: name,
            },
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to send welcome email");
    }
});
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendPasswordResetEmail = (email, resetURL) => __awaiter(void 0, void 0, void 0, function* () {
    const recipients = [{ email }];
    const htmlContenet = (0, htmlEmail_1.generatePasswordResetEmailHtml)(resetURL);
    try {
        const res = yield mailtrape_1.client.send({
            from: mailtrape_1.sender,
            to: recipients,
            subject: "Reset your password",
            html: htmlContenet,
            category: "Reset Password",
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to Reset Password");
    }
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendResetSuccessEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const recipients = [{ email }];
    const htmlContenet = (0, htmlEmail_1.generateResetSuccessEmailHtml)();
    try {
        const res = yield mailtrape_1.client.send({
            from: mailtrape_1.sender,
            to: recipients,
            subject: "Password Reset Successfully",
            html: htmlContenet,
            category: "Password Reset",
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to send password reset success email");
    }
});
exports.sendResetSuccessEmail = sendResetSuccessEmail;
