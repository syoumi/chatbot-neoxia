/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Configuration file
  */

// Port that the express server will be listening at
const PORT = process.env.PORT || 9191;
// Facebook Page Access Token
const FB_PAGE_TOKEN = 'EAAEkoZBTgjzIBANcGch34Vllwvm9zWsZC0uxRjoc94fJ7iMVUCGqZB809grtrHgmiZANm1Tz51WcGrRGOKYgTgfbMIvvU2S4thKCEd9b2f2jksp7gvxnzEhCeSRViwHn6LWIThwET0ow1MlzZCZCKPuO0jU2p7Hw71bouU5FGWOPVnZC1JdFmZCB';
// Facebook authentification verify token
const VERIFY_TOKEN = 'SIMPLE_VERIFY_TOKEN';
// Salesforce login (Ex. test@example.com
const SF_LOGIN = 'sfchatbot@neoxia.ma';
// Salesforce password + security token
const SF_PASSWORD = '25072017fkmoCTPTRp4guwybpqgmCKsB5D5mM';
// Maximum time to wait before re-prompt user for answer
const WAITING_BEFORE_PROMPT = 5000;
//URL application
const URL_APP = 'https://desolate-dusk-64146.herokuapp.com/';
//FB PAGE ID
const FB_PAGE_ID = '2027653890797502';
//FB ADMIN token - Will Expire on November, 14h 2017
const FB_ADMIN_TOKEN = 'EAAEkoZBTgjzIBAAKDKs1eeY8wiGTdemWJdd3MnOZADiUxjoAimhaC5K5wiCKtxScVPjVRfL2Q8ijKvPVH0PWuGV1PQoP7i4G61FdJjZAoTkzIAqNxBBJLbbZCCzFiJOrZBhp8ZA2wJdX5ZBe6euBknlvpK3SThZCe4aWXWNXYmiZCvYa3KnBCC2ZCZC';


module.exports = {
  PORT,
  FB_PAGE_TOKEN,
  VERIFY_TOKEN,
  SF_LOGIN,
  SF_PASSWORD,
  URL_APP,
  WAITING_BEFORE_PROMPT,
  FB_PAGE_ID,
  FB_ADMIN_TOKEN
};
