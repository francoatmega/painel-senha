const sendGridMail = require('@sendgrid/mail')

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)

/**
 * @function
 * @param  {{html, text, subject, from}}
 * @return {{html, text, subject, from, to}}
 */
const createDataSendGridSend = ({ html, subject, to }) => ({
  from: process.env.SENDGRID_EMAIL_PAINEL_SENHA, to, subject, html
})

/**
 * @function
 * @param  {{html: string, subject: string, from: string}} data
 * @return {Promise}
 */
exports.sendGridIntegrationEmail = (data) => sendGridMail.send(createDataSendGridSend(data))
