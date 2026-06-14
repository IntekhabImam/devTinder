
// validation for signup data
const validateSignupData = (req) => {
  const { firstName, lastName, email, password, age } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First name and Last name are required");
  }

  if (!email) {
    throw new Error("Email is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  if (!password) {
    throw new Error("Password is required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  if (age && (age < 18 || age > 100)) {
    throw new Error("Age should be between 18 and 100");
  }

  return true;
};









module.exports = validateSignupData;