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
	
	var registry = (functions() {
		var _registry = [],
			_registryPriceLow = null,
			_registryRated = null,
			_registryQuantityHigh = null,
			
			/*
				Adds a new item to the array of items in the registry
			*/
			addItem = function ( newItem ) {
			
			}
			
			/* 
				Sorts the items in the registry according to the string in the sortType parameter,
				then stores that order in the appropriate variable and returns the sorted array. 
			*/
			sortRegistry = function ( sortType ) {
				var _newSort = [],
					_newSort_ind = 0;
					
				switch ( sortType ) {
					case 'price_low':
						if ( _registryPriceLow == null ) {
							// build up the sorted array and save it to _registryPriceLow
						} 
						// save the array specified by _registryPriceLow to _newsort

						break;
					case 'price_high':
						if ( _registryPriceLow == null ) {
							// build up the sorted array and save it to _registryPriceLow
						}
						// save the reverse of array specified by _registryPriceLow to _newsort

						break;
					case 'top_rated':
						if ( _registryRated == null ) {
							// build up the sorted array and save it to _registryPriceLow
						}
						// save the array specified by _registryPriceLow to _newsort
						break;
					case 'quantity_high':
						if ( _registryQuantityHigh == null ) {
							// build up the sorted array and save it to _registryPriceLow
						}
						// save the array specified by _registryQuantityHigh to _newsort
					
						break;
					case 'quantity_low':
						if ( _registryQuantityHigh == null ) {
							// build up the sorted array and save it to _registryPriceLow
						}
						// save the reverse of array specified by _registryQuantityHigh to _newsort
					
						break;
					case default:
						// save the default _registry array to _newSort
						break;
					 
				}
				
				return _newSort;
			}
		
			/*
				By default, prints out the html for all of the items in the Registry. Can be passed a different
				array of Registry items as a parameter, in which case it will output that array instead of the
				default array.
			*/
			outputRegistry = function( itemList ) {
				var _html;

				return html;	
			}
			
		return {
			addItem : addItem,
			sortRegistry : sortRegistry,
			outputRegistry : outputRegistry
		}
		
	})();
	
	// Constructor Function
	var RegistryItem = function ( itemXmlObj ) {
		var imageSize = '?hei=40&wid=40',
			prodDet = null;
			qtyReq = parseInt ( itemXmlObj.find('QuantityRequested').text() ),
			qtyBought = parseInt ( itemXmlObj.find('QuantityBought').text() ),
			partNo = itemXmlObj.find('PartNumber').text();
				
		this.catentryId = itemXmlObj.find('CatentryID').text();
		this.image = itemXmlObj.find('ImageURL').text().split('?')[0];
		this.itemName = itemXmlObj.find('ItemName').text();
		this.category = itemXmlObj.find('CategoryName').text();
		this.qtyNeeded = (qtyBought < qtyReq) ? (qtyReq - qtyBought) : 0;
		this.price = itemXmlObj.find('ItemPrice').text();
		this.starrating = null;
		
		this.outputHTML = function () {
			return '<li class="registryItem"><img src="' + this.image + '"/><p>' + this.itemName + '</p><div class="starrating"></div><p class="price">' + this.price + '</p><p class="qtyNeeded">Quantity Needed: ' + this.qtyNeeded + '</p><a class="searsATC"></a></li>';
		}
		
		this.addProdDet = function ( json ) {
			// add the product details and the starrating
			// add the starrating to the page (or call another function that does so)
		
		}
		
		return {
			image: this.image,
			itemName: this.itemName,
			category: this.category,
			qtyNeeded: this.qtyNeeded,
			price: this.price,
			starrating: this.starrating,
			outputHTML : this.outputHTML,
			addProdDet : this.addProdDet
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
			$('#registryList').append( $(curLi).data({ regItem : registryLen }) );
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