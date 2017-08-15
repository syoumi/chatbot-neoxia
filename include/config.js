/**
 * Configuration file
 */

// Port that the express server will be listening at
const PORT = process.env.PORT || 9191;
// Facebook Page Access Token
const FB_PAGE_TOKEN = 'EAAEBOyWX84IBABLPKuEatf794KuhnJyXgqJ5V8qwknKmVvT0VlxCG3AzgkwVXSqpMZB47ymWF9kR3xwAnC53uvfiXjyiY3IWUh00d0zZBkAmKUfeio0zyVr68Uy3rxmTLeZARJYMkQCANy2Mkpvx0epD31AjXAw6gRM77Ro2AZDZD';
// Facebook authentification verify token
const VERIFY_TOKEN = 'SIMPLE_VERIFY_TOKEN';
// Salesforce login (Ex. test@example.com
const SF_LOGIN = 'chatbot@neoxia.ma';
// Salesforce password + security token
const SF_PASSWORD = '25072017fkmop3JAAuAHoMAjWdjOmITJwswB';
// API.ai client access token
const API_AI_CLIENT_ACCESS_TOKEN = '47370c9dd09c4ef9bf8dfa664aa86e39';
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
