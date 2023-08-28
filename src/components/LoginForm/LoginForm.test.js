const { validatePassword } = require("./index");
import * as EmailValidator from "email-validator";

describe("LoginForm validator", () => {
  // test case for password validation
  it("should return success message if password is valid", () => {
    const password = "1234@ABCdef";
    const result = validatePassword(password);
    expect(result).toEqual(true);
  });

  it("should return an error message if password is invalid", () => {
    const password = "1234@1234";
    const result = validatePassword(password);
    expect(result).toEqual(false);
  });

  // Test case for email validation
  it("should return success message if email is valid", () => {
    const email = "bereketlemma@gmail.com";
    const result = EmailValidator.validate(email);
    expect(result).toEqual(true);
  });

  it("should return error message if email is invalid", () => {
    const email = "b@gmail";
    const result = EmailValidator.validate(email);
    expect(result).toEqual(false);
  });
});
