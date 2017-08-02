/**
 * Configuration file
 */

const PORT = process.env.PORT || 9191;
const FB_PAGE_TOKEN = 'EAACPEJjwnWwBAHDV7IdGEHu7H6VVogZAvFzZAqQijNNquerdp07tJtGa91TMMFlwDJF7CA0RPy3VUOZC2elYHQGMIRnQRRAqHJ5bitmtpcnchLe7md5ZBW15TSpZB0vXYrkfV2ctpR7vAyGtyrsa2UUNnRtSaIGfOA4Vjv3PwN7xS3oSMZBRoS';
const VERIFY_TOKEN = 'SIMPLE_VERIFY_TOKEN';
const SF_LOGIN = 'chatbot@neoxia.ma';
const SF_PASSWORD = '25072017fkmop3JAAuAHoMAjWdjOmITJwswB';
const API_AI_CLIENT_ACCESS_TOKEN = '47370c9dd09c4ef9bf8dfa664aa86e39';
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
