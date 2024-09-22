// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Example for an Express.js API route
app.post("/api/send-reset-password-email", (req, res) => {
  const { email } = req.body;
  // Integrate with your email service to send the reset link
  // If successful:
  res.status(200).send("Email sent");
  // On failure, send an appropriate status code and message:
  // res.status(500).send('Error sending email');
});
