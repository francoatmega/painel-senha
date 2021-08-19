
const crypto = require('crypto')

/**
 * @function
 * @params null
 * @return {Promise}
 */
exports.generateCode = async () => {
  const code = await crypto.randomBytes(48)
  return code.toString('hex')
}
