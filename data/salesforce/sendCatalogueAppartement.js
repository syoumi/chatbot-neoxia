
var jsforce = require('jsforce');
var conn = new jsforce.Connection();


const {sendButtonMessage} = require('./../../send/fbApi/sendButtonMessage');
const {sendFileMessage} = require('./../../send/fbApi/sendFileMessage');
const {sendGenericMessage} = require('./../../send/fbApi/sendGenericMessage');
const {sendImageMessage} = require('./../../send/fbApi/sendImageMessage');
const {sendQuickReply} = require('./../../send/fbApi/sendQuickReplies');
const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');


//Louer un appartement
var sendCatalogueAppartementLocation= (sender, responseText)=> {
	selectAppart(sender, responseText, 'RENT');
}


//Acheter un appartement
var sendCatalogueAppartementVente= (sender, responseText) => {
	selectAppart(sender, responseText, 'SELL');
}


//Select appartement by operation
var selectAppart= (sender, responseText, op)=> {
		conn.login('mitaoumaiima@neoxia.ma', 'neoxia1232R5AQHzeTBQPeTciZ7EEiIySh', (err, res) => {
			if (err) { return console.error(err); }

			//Select from Salesforce
			conn.query('SELECT Type__c, Name, Price__c, Photo__c, Link__c FROM Appartement__c', (err, res) => {
				if (err) { return console.error(err); }

					sendTextMessage(sender, responseText);

					var elements=[];
					for (var i=0; i<res.records.length; i++) {
						var record = res.records[i];
						//console.log("Name: " + record.Name);

						var type=record.Type__c;

						//SELL or RENT
						if(type=== op){

							var title= record.Name;
							var price= record.Price__c;
							var photo= record.Photo__c;
							var link= record.Link__c;

							sendTextMessage(sender, title);

							var element= {
										title: title,
										subtitle: price,
										image_url: photo,

										buttons: [{
											type: "web_url",
											url: link,
											title: "Voir détails"
											}, {
											type: "postback",
											title: "Contacter",
											payload: "CONTACT_PAYLOAD",
										}]
									};
							elements.push(element);
						}
					}


					sendGenericMessage(sender, elements);


				});
			});
}



module.exports = {
  sendCatalogueAppartementVente, sendCatalogueAppartementLocation, selectAppart
}
