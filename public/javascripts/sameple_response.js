// Namespacing everything
var SearsRegistry = SearsRegistry || {};

SearsRegistry.fbook = function () {
	// Objects in use
	var SearsApiFuncs = (function () {
		var getProdDet = function ( regItem ) {
				var prodDetObj;
			
				return prodDetObj;
			},
			
			/*
				Adds all of the items in the userCart array to the Sears shopping cart and sends the
				user to the sears checkout experience.
			*/
			goToCheckout = function ( userCart ) {
				//add to cart from registry api call
				//checkout redirect services api call
			
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
			
			deleteItemFromCart = function ( productToDelete ) {
				
				theCartLen--;
			}
			
			checkout = function ( ) {
				SearsApiFuncs.goToCheckout( theCart )
			}
		return {
			addItemToCart : addItemToCart,
			deleteItemFromCart : deleteItemFromCart
		}
	})();
	
	var Registry = (function() {
		var registry = {},
			regLen = 0,
			registryPriceLow = null,
			registryRated = null,
			registryQuantityHigh = null,
			
			/*
				Adds a new Registry item to the list of items in the registry, with its catentryId as
				the key
			*/
			addItem = function ( newItem ) {
				var key = newItem.catentryId;
				
				registry[key] = newItem;
				regLen++;
			},
			
			/*
				Finds the item in the registry identified by the itemID string that is passed in
				and returns a copy of that item
			*/
			findItem = function ( itemID ) {
				return registry[itemID];
			},
			
			/* 
				Uses the Sears API to load up all of the product details for the items in the Registry
			*/
			loadDetails = function ( ) {
				var item;
				
				for ( item in registry ) {
					registry[item].addProdDet();
				}
			},
			
			/* 
				Sorts the items in the registry according to the string in the sortType parameter,
				then stores that order in the appropriate variable and returns the sorted array. 
			*/
			sortRegistry = function ( sortType ) {
				var newSort = [],
					newSort_ind = 0;
					
				switch ( sortType ) {
					case 'price_low':
						if ( registryPriceLow == null ) {
							// build up the sorted array and save it to registryPriceLow
						} 
						// save the array specified by _registryPriceLow to newsort

						break;
					case 'price_high':
						if ( registryPriceLow == null ) {
							// build up the sorted array and save it to registryPriceLow
						}
						// save the reverse of array specified by registryPriceLow to newsort

						break;
					case 'top_rated':
						if ( registryRated == null ) {
							// build up the sorted array and save it to registryPriceLow
						}
						// save the array specified by registryPriceLow to newsort
						break;
					case 'quantity_high':
						if ( registryQuantityHigh == null ) {
							// build up the sorted array and save it to _registryPriceLow
						}
						// save the array specified by registryQuantityHigh to newsort
					
						break;
					case 'quantity_low':
						if ( registryQuantityHigh == null ) {
							// build up the sorted array and save it to registryPriceLow
						}
						// save the reverse of array specified by registryQuantityHigh to newsort
					
						break;
					default:
						// save the default _registry array to _newSort
						break;
					 
				}
				
				return _newSort;
			},
			
			// sorts based on price, from low to high
			sortPrice = function ( a, b ) {
				return parseInt(a.price.split('$')[1], 10) - parseInt(b.price.split('$')[1], 10);
			},
			// sorts based on rating, from high to low
			sortRating = function ( a, b ) {
			
			},
			// sorts based on quantity needed, from high to low
			sortQuantity = function ( a, b ) {
				return b.qtyNeeded - a.qtyNeeded;
			}
		
			/*
				By default, prints out the html for all of the items in the Registry. Can be passed a different
				array of Registry items as a parameter, in which case it will output that array instead of the
				default array.
			*/
			outputRegistry = function( itemList ) {
				var html = [],
					i = 0,
					item;
				
				for ( item in registry ) {
					html[i++] = registry[item].outputHTML();
				}

				return html.join('');	
			};
			
		return {
			addItem : addItem,
			findItem : findItem,
			sortRegistry : sortRegistry,
			outputRegistry : outputRegistry,
			//for debugging only
			reg : registry
		}
		
	})();
	
	// Constructor Function
	var RegistryItem = function ( itemXmlObj ) {
		var size = '215';
			imageSize = '?hei=' + size + '&wid=' + size,
			prodDet = null;
			qtyReq = parseInt ( itemXmlObj.find('QuantityRequested').text(), 10 ),
			qtyBought = parseInt ( itemXmlObj.find('QuantityBought').text(), 10 ),
			partNo = itemXmlObj.find('PartNumber').text();
				
		this.catentryId = itemXmlObj.find('CatentryID').text();
		this.image = itemXmlObj.find('ImageURL').text().split('?')[0] + imageSize;
		this.itemName = itemXmlObj.find('ItemName').text();
		this.category = itemXmlObj.find('CategoryName').text();
		this.qtyNeeded = (qtyBought < qtyReq) ? (qtyReq - qtyBought) : 0;
		this.price = itemXmlObj.find('ItemPrice').text();
		this.starrating = null;
	}
	RegistryItem.prototype.outputHTML = function () {
		var atcDisabled = '';
		
		if ( this.qtyNeeded == 0 ) {
			atcDisabled = ' disabled';
		}
		
		return '<li class="registryItem"><img src="' + this.image + '"/><p>' + this.itemName + '</p><div class="starrating"></div><p class="price">' + this.price + '</p><p class="qtyNeeded">Quantity Needed: ' + this.qtyNeeded + '</p><a href="javascript:;" class="searsATC' +  atcDisabled + '">Add to Cart</a></li>';
	};
	RegistryItem.prototype.addProdDet = function ( json ) {
		// add the product details and the starrating
		// add the starrating to the page (or call another function that does so)	
	};
	
	// Once xml is loaded
	function parseXml(xml) {
		var eventDate = $(xml).find('EventDate').text().split('-')
		
		$('#registryName').text( $(xml).find('EventDescription').text() );
		$('#eventDate').text( 'Event Date: ' + eventDate[2] + '/' + eventDate[1] + '/' + eventDate[0] );
		$(xml).find('GiftRegistryItem').each(function() {
			Registry.addItem( new RegistryItem( $(this) ) );			
		});
		$('#registryList').append( Registry.outputRegistry() );
//		Registry.loadDetails();
		loadEventHandlers();
	}
	
	/* Loads all of the event handlers for the page */
	function loadEventHandlers ( ) {
	
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