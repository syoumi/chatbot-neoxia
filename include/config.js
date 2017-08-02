/**
 * Configuration file
 */

// Port that the express server will be listening at
const PORT = process.env.PORT || 9191;
// Facebook Page Access Token
const FB_PAGE_TOKEN = 'EAACPEJjwnWwBAHDV7IdGEHu7H6VVogZAvFzZAqQijNNquerdp07tJtGa91TMMFlwDJF7CA0RPy3VUOZC2elYHQGMIRnQRRAqHJ5bitmtpcnchLe7md5ZBW15TSpZB0vXYrkfV2ctpR7vAyGtyrsa2UUNnRtSaIGfOA4Vjv3PwN7xS3oSMZBRoS';
// Facebook authentification verify token
const VERIFY_TOKEN = 'SIMPLE_VERIFY_TOKEN';
// Salesforce login (Ex. test@example.com)
const SF_LOGIN = 'example@mail.com';
// Salesforce password + security token
const SF_PASSWORD = '************';
// API.ai client access token
const API_AI_CLIENT_ACCESS_TOKEN = 'ee41bacb813eca20bf766e7eb7364922';
// Facebook app secret code
const FB_SECRET = '##';
// Maximum time to wait before re-prompt user for answer
const WAITING_BEFORE_PROMPT = 5000;


module.exports = {
  PORT,
  FB_PAGE_TOKEN,
  VERIFY_TOKEN,
  SF_LOGIN,
  SF_PASSWORD,
  API_AI_CLIENT_ACCESS_TOKEN,
  FB_SECRET,
  WAITING_BEFORE_PROMPT
}
