$(document).ready(function()
{
  $.ajax({
    type: "GET",
    url: "sample_response.xml",
    dataType: "xml",
    success: parseXml
  });
});
var SearsApiFuncs = function () {
	var GetProdDet = function ( partNo ) {
		
		return 
		}
	return {
		GetProdDet : GetProdDet
	}
};

var RegistryItem = function ( itemXml )
{
	var prodDet = null;
		qtyReq = pareseInt ( $(itemXML).find('QuantityRequested').text() ),
		qtyBought = parseInt ( $(itemXML).find('QuantityBought').text() ),
		partNo = $(itemXML).find('PartNumber').text(),
		catentryId = $(itemXML).find('CatentryID').text();
	
	this.image = $(itemXML).find('ImageURL').text().split('?')[0];
	this.itemName = $(itemXML).find('ItemName').text();
	this.qtyNeeded = (qtyBought < qtyReq) ? (qtyReq - qtyBought) : 0;
	this.price = $(itemXML).find('ItemPrice').text();
	this.starrating = null;
	
	return {
		image: this.image,
		itemName: this.itemName,
		qtyNeeded: this.qtyNeeded,
		price: this.price,
		starrating: this.starrating,
	}
}
RegistryItem.prototype.getProdDet() = function () {
	var self = this;
}

function parseXml(xml)
{
  $(xml).find("GiftRegistryItem").each(function()
  {
    
    $("#registryList").append('<li class="registryItem"><img src="' + $(this).find("ImageURL").text() + '"/><p>' + $(this).find("ItemName").text() + '</p></li>');
  });
}