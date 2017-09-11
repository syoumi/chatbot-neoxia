
const {doLogin} = require('./login');


//Get product records for catalogue
var getProductRecords = (query, callback) => {
  doLogin((conn) => {
    var elements = [];
    conn.query(query, (err, res) => {
         if (err) { return console.error(err); }

           for (var i=0; i<res.records.length; i++) {
             var record = res.records[i];

             //Extract fields
             var id = record.Id;
             var title= record.Name;
             var price= record.Amount__c +"DH";
             var photo= record.Image__c;
             var description= "DESCRIPTION_PAYLOAD|" + record.Description__c;
             //var link= record.Link__c;
             var contact = "CONTACT_PAYLOAD|" + record.Salesman__r.Id + "|" + record.Salesman__r.Name + "|" + record.Salesman__r.MobilePhone + "|" + id;

             //Create element
             var element= {
                 title: title,
                 subtitle: price,
                 image_url: photo,

                 buttons: [
                   {
                     type: "postback",
                     title: "Détails",
                     payload: description
                   },
                   {
                     type: "postback",
                     title: "Contacter",
                     payload: contact
                 }]
             };

             console.log("TITRE: ", title );
             elements.push(element);

           }

           callback(elements);

     });
  });

}


//Get product by Id
var getProduct = (productID, callback) => {
  doLogin((conn) => {
    var product = undefined;
    var query = "SELECT Id, Name, Amount__c FROM Product2 WHERE Id= '" + productID + "' LIMIT 1";
    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }
      if(res.records.length > 0){
        product = res.records[0];
      }
      callback(product);
    });
  });
}


module.exports = {
  getProductRecords, getProduct
}
