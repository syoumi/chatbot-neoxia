/**
 * Configuration file
 */

// Port that the express server will be listening at
const PORT = process.env.PORT || 9191;
// Facebook Page Access Token
const FB_PAGE_TOKEN = 'EAAEkoZBTgjzIBAH2nAilInhXo8vH34ab0F7HGI61QSusVnCMoh6Q9EJ3wxTxcDxHa0gWPAyYrZCKG8WBXHOfRjG1fwHhiuIZBwDCnGBWBrOXchbM97JzNhNfAFexoXSSMAEZBxdrMCr7YIJcXB5Y0OvW0qqvvfkNmuE9uIqFKgZDZD';
// Facebook authentification verify token
const VERIFY_TOKEN = 'SIMPLE_VERIFY_TOKEN';
// Salesforce login (Ex. test@example.com
const SF_LOGIN = 'sfchatbot@neoxia.ma';
// Salesforce password + security token
const SF_PASSWORD = '25072017CTPTRp4guwybpqgmCKsB5D5mM';
// API.ai client access token
const API_AI_CLIENT_ACCESS_TOKEN = '47370c9dd09c4ef9bf8dfa664aa86e39';
// Facebook app secret code
const FB_SECRET = '##';
// Maximum time to wait before re-prompt user for answer
const WAITING_BEFORE_PROMPT = 5000;
//URL application
const URL_APP = 'https://desolate-dusk-64146.herokuapp.com/';
//FB PAGE ID
const FB_PAGE_ID = '2027653890797502';
//FB ADMIN token TOP SECRET AND HARD TO FIND OUT FIGURE OUT xD
//This is gonna expire on November, 14h 2017
const FB_ADMIN_TOKEN = 'EAAEkoZBTgjzIBAAKDKs1eeY8wiGTdemWJdd3MnOZADiUxjoAimhaC5K5wiCKtxScVPjVRfL2Q8ijKvPVH0PWuGV1PQoP7i4G61FdJjZAoTkzIAqNxBBJLbbZCCzFiJOrZBhp8ZA2wJdX5ZBe6euBknlvpK3SThZCe4aWXWNXYmiZCvYa3KnBCC2ZCZC';


module.exports = {
  PORT,
  FB_PAGE_TOKEN,
  VERIFY_TOKEN,
  SF_LOGIN,
  SF_PASSWORD,
  API_AI_CLIENT_ACCESS_TOKEN,
  FB_SECRET,
  WAITING_BEFORE_PROMPT,
  FB_PAGE_ID,
  FB_ADMIN_TOKEN
}
