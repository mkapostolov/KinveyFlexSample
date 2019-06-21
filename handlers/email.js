module.exports.emailSend = (context, complete, modules) => {
  const from = "matioa@example.com";
  const to = "matioa@gmail.com";
  const subject = "Test";
  const text_body = "You've been invited to join octagon in my-app!";
  const reply_to = "matioa@gmail.com";

  modules.email
    .send(from, to, subject, text_body, reply_to)
    .then(result =>
      complete()
        .setBody(result)
        .done()
    )
    .catch(err =>
      complete()
        .setBody(err)
        .badRequest()
        .done()
    );
};
