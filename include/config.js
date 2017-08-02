/**
 * Configuration file
 */

const PORT = process.env.PORT || 9191;
const FB_PAGE_TOKEN = '###';
const VERIFY_TOKEN = 'SIMPLE_VERIFY_TOKEN';
const SF_LOGIN = 'example@mail.com';
const SF_PASSWORD = '************';
const API_AI_CLIENT_ACCESS_TOKEN = '##';
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
