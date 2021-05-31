const nodemailer = require('nodemailer')
const { createTemplate } = require('./mail')

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
})

exports.sendMail = async (receivers, subject, html) => {
  const mailOptions = {
    from: `Puzzle Service <${process.env.GMAIL_USER}>`, // sender address
    to: receivers, // list of receivers
    subject: subject, // Subject line,
    replyTo: 'noreply.puzzletechnical@gmail.com',
    html: createTemplate(html) // plain text body
  }

  let ret
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) throw err
    ret = info
  })
  return ret
}
