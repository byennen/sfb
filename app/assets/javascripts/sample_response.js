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
				//add to cart from registry api call
				//checkout redirect services api calls
			
			}
		return {
			getProdDet : getProdDet,
			goToCheckout : goToCheckout
		}
	})();
	
	var UserCart = (function ( ) {
		var theCart = [],
			theCartLen = 0,
		
			addItemToCart = function ( productToAdd ) {
				theCart[theCartLen++] = productToAdd;
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
		
		this.outputHTML = function () {
			return '<li class="registryItem"><img src="' + this.image + '"/><p>' + this.itemName + '</p><div class="starrating"></div><p class="price">' + this.price + '</p><p class="qtyNeeded">Quantity Needed: ' + this.qtyNeeded + '</p><a class="searsATC"></a></li>';
		}
		
		return {
			image: this.image,
			itemName: this.itemName,
			qtyNeeded: this.qtyNeeded,
			price: this.price,
			starrating: this.starrating,
			outputHTML : this.outputHTML
		}
	}
	
	// Once xml is loaded
	function parseXml(xml) {
		var registryLen = 0,
			curLi;
		$('#registryName').text( $(xml).find('EventDescription').text() );
		$('#eventDate').text( 'Event Date: ' + $(xml).find('EventDate').text() );
		$(xml).find('GiftRegistryItem').each(function() {
			Registry[registryLen] = new RegistryItem( $(this) );
			
			curLi = Registry[registryLen].outputHTML();
			$(curLi).data({ regItem : registryLen })
			$('#registryList').append( curLi );
			console.log( registryLen );
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
	
	return {
		/* Only for testing purposes */
		SearsApiFuncs : SearsApiFuncs,
		UserCart : UserCart,
		Registry : Registry,
		RegistryItem : RegistryItem
	}

}();