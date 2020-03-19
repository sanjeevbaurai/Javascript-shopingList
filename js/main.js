	/* @author sanjeev
	 */
	
	
	class page {
		constructor() {
		this.name="ShoppingList";
	    this.init = function() {

	        this.setupUI();
	        this.registerUIEvents();
	        let body = document.getElementsByTagName('body')[0];
	        body.style.cursor='wait';
	        this.available_options;
	        this.productinCartLocal;
	        this.getCurrency = "";
	        this.objItemIndex;
	        AjaxServiceController.load(ajaxServiceDefinitions);
	        AjaxServiceController.products.cart.run(this, this.onProductsJSONSuccess, this.onProductsJSONError, {
	            callback: 'callbackFN'
	        });

	    };

	    this.onProductsJSONError = function(jqXHR, textStatus, errorThrown) {
	        consoleLog(errorThrown);
	    };

	    this.onProductsJSONSuccess = function(data, textStatus, jqXHR) {
	        this.populateProductsDetails(data);
	        let body = document.getElementsByTagName('body')[0];
	        body.style.cursor='default';

	    };

	    this.registerUIEvents = function() {
			var obj = this;
	        // When the user clicks on <span> (x), close the modal
			let modal = document.getElementById("myModal");
	        let close= document.getElementsByClassName("close")[0]
	        close.onclick = function() {
				modal.style.display = "none";
			  }
	    
			let addtoBag= document.getElementsByClassName("addtoBag-btn")[0]
			addtoBag.onclick = function() {
				modal.style.display = "none";
			  }
	        
	        let sortList= document.getElementById("sortList")
	        sortList.addEventListener('change', obj.sortList);
	    };

	    this.setupUI = function() {
			
	    };



	    this.populateProductsDetails = function(obj) {
	        let productData = obj;
	        obj = obj.products;
	        this.productinCartLocal = obj;
	        console.log(obj)
	        this.objItemIndex = obj;
	        if (obj == undefined || typeof(obj) != "object" || obj.length == undefined) {
	            let strHtml = '<div class="no_product"> No product available</div>';
	            $(".item_containers").html(strHtml);

	            return false;

	        }

	        let length = obj.length;
	        if (length == undefined) length = 1;
	        let item_container = "";
	        for (let i = 0; i < length; i++) {
	            item_container = "<div class='item_container'>";
	            let objItem = obj[i]; 
	            item_container ='<div class="card" id="card">'+
							        '<div class="card-img-top"><img class="card-img" src="'+objItem.images[0].src+'" alt="'+objItem.title+'"></div>'+
								        '<div class="card-body">'+
								          '<span class="card-title">'+objItem.title+'</span>'+
										  '<span class="card-price">£'+objItem.variants[0].price+'</span> </div>'+
										  '<div class="card-footer">'+
										   '<button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>'+
								           '<button class="btn btn-secondary quick-view-button" type="button">QUICK VIEW</button>'+
								           '</div>'+
								           '<div class="show-details hide">'+
										     '<div class="body_html">'+objItem.body_html+'</div' +
											 '<div id="options_values" class="options_values">' +
											 '<select name="size" id="availSizes">'+
							                     '<option value="Size">Size</option>'+
							                '</select></div'+
								        '</div>'+
								 '</div>';
	            
	            item_container += '</div>';
	           
	            $(".item_containers").append(item_container);
				
	        }
			let addToCartButtons = document.getElementsByClassName('shop-item-button');
			for (let i = 0; i < addToCartButtons.length; i++) {
				let button = addToCartButtons[i]
				button.addEventListener('click', this.addToCartClicked)
			}
			
	        var quickViewButtons = document.getElementsByClassName('quick-view-button');
	        for (let i = 0; i < quickViewButtons.length; i++) {
				let button = quickViewButtons[i]
				button.addEventListener('click', this.quickViewClicked);
			}
	    };
		
		this.quickViewClicked = function(event) {
			let button = event.target
			let shopItem = button.parentElement.previousSibling;
			let shopItemImage = shopItem.previousSibling;
			let showDetails=button.parentElement.nextSibling;
			let title = shopItem.getElementsByClassName('card-title')[0].innerText
			let price = shopItem.getElementsByClassName('card-price')[0].innerText
			let imageSrc = shopItemImage.getElementsByClassName('card-img')[0].src
			let body_html = showDetails.getElementsByClassName('body_html')[0].innerText
			viewItem(title, price, imageSrc,body_html);
		}
		
	    function viewItem(name, price, imageSrc, body_html) {
			var modal = document.getElementById("myModal");
			var viewDetailContainer = modal.getElementsByClassName('viewDetailContainer')[0];
			var product_name=viewDetailContainer.getElementsByClassName('product_name')[0];
				product_name.innerText=name;
			var product_price=viewDetailContainer.getElementsByClassName('product_price')[0];
				product_price.innerHTML="Now <b>"+price+"</b>";	
			var	product_img= viewDetailContainer.getElementsByClassName('product_img')[0];
				product_img.src=imageSrc;
			var	product_bodyHtml= viewDetailContainer.getElementsByClassName('product_bodyHtml')[0];
				product_bodyHtml.innerText=body_html;
			
			modal.style.display='block';

		}
	     this.addToCartClicked = function(event) {
			let button = event.target
			let shopItem = button.parentElement.previousSibling;
			let shopItemImage = shopItem.previousSibling;
			let title = shopItem.getElementsByClassName('card-title')[0].innerText
			let price = shopItem.getElementsByClassName('card-price')[0].innerText
			let imageSrc = shopItemImage.getElementsByClassName('card-img')[0].src
			addItemToCart(title, price, imageSrc)
			updateCartTotal()
		}

		function addItemToCart(title, price, imageSrc) {
			let cartRow = document.createElement('div')
			cartRow.classList.add('cart-row')
			let cartItems = document.getElementsByClassName('cart-items')[0]
			let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
			for (let i = 0; i < cartItemNames.length; i++) {
				if (cartItemNames[i].innerText == title) {
					alert('This item is already added to the cart')
					return
				}
			}
			let cartRowContents = `
				<div class="cart-item cart-column">
					<img class="cart-item-image" src="${imageSrc}" width="60" height="60">
					<span class="cart-item-title">${title}</span>
				</div>
				<span class="cart-price cart-column">${price}</span>
				<div class="cart-quantity cart-column">
					<input class="cart-quantity-input" type="number" value="1">
					<button class="btn btn-danger" type="button">REMOVE</button>
				</div>`
			cartRow.innerHTML = cartRowContents
			cartItems.append(cartRow)
			cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
			cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
		}
		function removeCartItem(event) {
			let buttonClicked = event.target
			buttonClicked.parentElement.parentElement.remove()
			updateCartTotal()
		}
		function quantityChanged(event) {
			let input = event.target
			if (isNaN(input.value) || input.value <= 0) {
				input.value = 1
			}
			updateCartTotal()
		}
		function updateCartTotal() {
			let cartItemContainer = document.getElementsByClassName('cart-items')[0]
			let cartRows = cartItemContainer.getElementsByClassName('cart-row')
			let noItems=document.getElementsByClassName('no_items')[0]
			let productCount=document.getElementsByClassName('product_count')[0]
			let total = 0
			for (let i = 0; i < cartRows.length; i++) {
				let cartRow = cartRows[i]
				let priceElement = cartRow.getElementsByClassName('cart-price')[0]
				let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
				let price = parseFloat(priceElement.innerText.replace('£', ''))
				let quantity = quantityElement.value
				total = total + (price * quantity)
			}
			total = Math.round(total * 100) / 100
			document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total
			if(cartRows.length>0){
				noItems.style.display = "none";
				productCount.style.display="block"
				productCount.innerHTML=cartRows.length
			}else{
				noItems.style.display = "block"
				productCount.style.display="none"
			}
		}
		
		this.sortList = function(domEvent) {
		console.log("sa", domEvent)
		var selectedValue = domEvent.target[domEvent.target.selectedIndex].value;
		console.log(selectedValue)
		
		  }
		
	   
	    /*-Cart part close--*/
		}
	};

	
	
	if (document.readyState == 'loading') {
		document.addEventListener('DOMContentLoaded', ready)
	} else {
		ready()
	}
	
	function ready(){
		let obj = new page();
		obj.init();
	}