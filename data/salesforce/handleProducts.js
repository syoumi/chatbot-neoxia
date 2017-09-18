/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Handle Products
  */
const {doLogin} = require('./login');

/*
  * @desc      Get product records as generic message for catalogue using query
  * @param     query: SOQL query
  * @return    Generic message with product records
  */
var getProductRecords = (query, callback) => {
  doLogin((conn) => {
    conn.query(query, (err, res) => {
         if (err) { return console.error(err); }
         getElements(res.records, (elements) =>{
           callback(elements);
          });
    });
  });
};

/*
  * @desc      Get product by Id
  * @param     productID: product's Id
  * @return    Product
  */
var getProduct = (productID, callback) => {
  doLogin((conn) => {
    var product = undefined;
    var query = "SELECT Id, Type__c, Operation__c, Name, Amount__c, Image__c, link__c, Description__c, Salesman__r.Id, Salesman__r.Name, Salesman__r.MobilePhone FROM product2 WHERE Id= '" + productID + "' LIMIT 1";
    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }
      if(res.records.length > 0){
        product = res.records[0];
      }
      callback(product);
    });
  });
};


/*
  * @desc      Get Elements as generic message
  * @param     products:product records
  * @return    Generic message
  */
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

    console.log("TITLE: ", title );
    elements.push(element);

  }
  callback(elements);
};


module.exports = {
  getProductRecords, getProduct, getElements
};
