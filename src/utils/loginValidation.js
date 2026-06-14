const validateLoginData = (req) => {
  const { email, password } = req.body;

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

  return true;
};

module.exports = validateLoginData;