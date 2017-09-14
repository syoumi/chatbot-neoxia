
const {doLogin} = require('./login');


//Get product records for catalogue
var getProductRecords = (query, callback) => {
  doLogin((conn) => {

    conn.query(query, (err, res) => {
         if (err) { return console.error(err); }
         getElements(res.records, (elements) =>{
           callback(elements);
          });
    });

  });

}


//Get product by Id
var getProduct = (productID, callback) => {
  doLogin((conn) => {
    var product = undefined;
    var query = "SELECT Id, Name, Amount__c, Image__c, link__c, Description__c, Salesman__r.Id, Salesman__r.Name, Salesman__r.MobilePhone FROM product2 WHERE Id= '" + productID + "' LIMIT 1";
    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }
      if(res.records.length > 0){
        product = res.records[0];
      }
      callback(product);
    });
  });
}


//Get Elements
var getElements = (products, callback) => {
  var elements = [];

  for (var i=0; i<products.length; i++) {
    var product = products[i];

    //Extract fields
    var id = product.Id;
    var title= product.Name;
    var price= product.Amount__c +"DH";
    var photo= product.Image__c;
    var description= "DESCRIPTION_PAYLOAD|" + product.Description__c;
   //var link= product.Link__c;
    var contact = "CONTACT_PAYLOAD|" + product.Salesman__r.Id + "|" + product.Salesman__r.Name + "|" + product.Salesman__r.MobilePhone + "|" + id;

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

}


module.exports = {
  getProductRecords, getProduct, getElements
}
