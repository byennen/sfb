// Namespacing everything
var SearsRegistry = SearsRegistry || {};

SearsRegistry.fbook = function () {
	// Objects in use
	var SearsApiFuncs = (function () {
		var getProdDet = function ( partNo ) {
				var prodDetObj;
			
				return prodDetObj;
			},
			goToCheckout = function ( userCart ) {
			
			
			}
		return {
			getProdDet : getProdDet,
			goToCheckout : goToCheckout
		}
	})();
	
	var UserCart = (function ( ) {
		var theCart = [],
		
			addItemToCart = function ( productToAdd ) {
				theCart[0] = productToAdd;
			}
		
		return {
			addItemToCart : addItemToCart
		}
	})();
	
	var Registry = [];
	
	// Constructor Function
	var RegistryItem = function ( itemXmlObj ) {
		var prodDet = null;
			qtyReq = parseInt ( itemXmlObj.find('QuantityRequested').text() ),
			qtyBought = parseInt ( itemXmlObj.find('QuantityBought').text() ),
			partNo = itemXmlObj.find('PartNumber').text(),
			catentryId = itemXmlObj.find('CatentryID').text();
		
		this.image = itemXmlObj.find('ImageURL').text().split('?')[0];
		this.itemName = itemXmlObj.find('ItemName').text();
		this.qtyNeeded = (qtyBought < qtyReq) ? (qtyReq - qtyBought) : 0;
		this.price = itemXmlObj.find('ItemPrice').text();
		this.starrating = null;
		
		return {
			image: this.image,
			itemName: this.itemName,
			qtyNeeded: this.qtyNeeded,
			price: this.price,
			starrating: this.starrating
		}
	}
	
	// Once xml is loaded
	function parseXml(xml) {
		var registryLen = 0;
		$('#registryName').text( $(this).find('EventName').text() );
		$('#eventDate').text( 'Event Date: ' + $(this).find('EventDate').text() );
		$(xml).find('GiftRegistryItem').each(function() {
			Registry[registryLen] = new RegistryItem( $(this) );
			$('#registryList').append('<li class="registryItem"><img src="' + $(this).find('ImageURL').text() + '"/><p>' + $(this).find('ItemName').text() + '</p></li>');
		   registryLen++;
		});
	}
	
	// Load XML registry info once page loads and call parsing function
	$(document).ready(function() {
	  $.ajax({
	    type: "GET",
	    url: "sample_response.xml",
	    dataType: "xml",
	    success: parseXml
	  });
	});

}();