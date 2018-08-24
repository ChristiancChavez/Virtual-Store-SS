$( document ).ready(function(){
    const image1 = './Images/skate.jpg';
    const image2 = './Images/sailing.jpg';
    const image3 = './Images/skiing.jpg';
    const image4 = './Images/snowboard.jpg';
    const image5 = './Images/soccer.jpg';
    const image6 = './Images/surf.jpg';
    const images = [image1, image2, image3, image4, image5, image6];
    const sports = ["skate", "sailing", "skiing", "snowboard", "soccer", "surf"];
    let countCarousel = 0;
    const $carouselContainer = $('.js-carousel');
    const $arrowLeft = $('.js-arrow-left');
    const $arrowRight = $('.js-arrow-right');
    const $toggleFilters = $('.js-toggle');
    const $filterContain = $('.js-filters');
    const $addShopCarButton = $('.js-btn-add-product');
    const $shopCarImage = $('.js-shop-car-image');
    const $amountProducts = $('.js-amount-shop');
    let counterShop = 0;
    const $shopCarModal = $('.js-modal-shop');

    function moveLeft () {
        if((countCarousel === 0)){
            countCarousel = images.length -1;
        } else {
            countCarousel = countCarousel -1;
        }
        $carouselContainer.empty();
        appendImagesCarousel();
    };
    $arrowLeft.click(moveLeft);

    function appendImagesCarousel(){
        const divcarousel = `<img class="carousel__image js-carousel-image" src="${images[countCarousel]}"/>`;
        const carouselTextContainer = `<span class="carousel__text js-carousel-text ">${sports[countCarousel]}</span>`;
        $carouselContainer.prepend(divcarousel, carouselTextContainer);
    }

    function moveRight() {
        if((countCarousel === images.length-1)){ 
            countCarousel = 0;
        } else {
            countCarousel = countCarousel +1;
        }
        $carouselContainer.empty();
        appendImagesCarousel();
    };
    setInterval(moveRight, 3000);
    $arrowRight.click(moveRight);

    function hideShowFilters(){
        $filterContain.toggleClass('lateralSlide')
    };
    $toggleFilters.click(hideShowFilters);

    
    const $itemShopCarModal = $('.js-container-shop');
    let dataIdClose = 0;
    const $containerTotal = $('.js-total-price-modal');;
    $addShopCarButton.click(addInfoToModalCart);

    function addInfoToModalCart(){
        $shopCarImage.effect( "shake", {times:2, direction:'up'}, 1000 );
        $amountProducts.text(counterShop += 1);
        const $singleProduct = $(this).parent();
        let nameProduct = $singleProduct.find('.js-name-product').text();
        let priceProduct = $singleProduct.find('.js-price-product').text();
        let imageProduct = $singleProduct.find('.js-image-product').attr('src');
        let valueSubtotal = $(this).val();
        let priceProductInteger = parseInt(priceProduct.substring(1,priceProduct.length));
        const subtotalFull = priceProductInteger * valueSubtotal;
        $itemShopCarModal.append(`<div class="shopCar__item"><img class="shopCar__item-image js-image-shop" src="${imageProduct}" alt="">
        <span class="js-name-shop">${nameProduct}</span>
        <span class="js-price-shop">${priceProduct}</span>
        <input class="shopCar__item-amount js-amount-shop" value="1" type="number" min="1" max="99">
        $<span class="shopCar__item-subtotal js-subtotal-shop">${subtotalFull}</span>
        <img class="shopCar__item-remove js-cancel-item-shop"data-id="${dataIdClose += 1}" src="./Images/remove.png" alt=""></div>`);
        disableAddToCartButton($(this), dataIdClose)
        calculateTotalPrice();
    };

    function disableAddToCartButton(addButton, idClose) {
        addButton.addClass('deactivate');
        addButton.html('Inside the cart');
        addButton.attr("disabled", true);
        addButton.attr('data-id',`${idClose}`);
    };

    function calculateTotalPrice() {
        const $subtotals = $('.js-subtotal-shop');
        let total = 0;
        $.each($subtotals, function(){
           total += parseInt($(this).text());
        });
        $containerTotal.text(total);
    };

    $itemShopCarModal.on('click', '.js-cancel-item-shop', closeItemModal);
        
    function closeItemModal(){ 
        let dataId = $(this).data('id');
        $amountProducts.text(counterShop -= 1);
        const sameBtns = $('.js-single-product').find(`button[data-id ='${dataId}']`);
        removeDeactivate(sameBtns);
        $(this).parent().remove();
        calculateTotalPrice();
    };
    
    function removeDeactivate(element){
        element.removeClass('deactivate');
        element.html('ADD TO CART');
        element.attr("disabled", false); 
    };

    let newPrice;
    $itemShopCarModal.on('click', '.js-amount-shop', newSubtotalItemModal);
        
    function newSubtotalItemModal(){
        let valueInsideShop = $(this).val();
        let priceProductPrev = $(this).prev().text();
        let priceProductPrevInt = parseInt(priceProductPrev.substring(1,priceProductPrev.lenght));
        newPrice = valueInsideShop * priceProductPrevInt;
        $(this).next().text(newPrice);
        calculateTotalPrice();
    };
        
    

    $shopCarImage.click(function(){
        $shopCarModal.removeClass('hide');
    });


    let $btnCLoseShop = $('.js-close-shop');
    $btnCLoseShop.click(closeModal);

    function closeModal(){
        $shopCarModal.addClass('hide');
        $amountProducts.text(0);
        counterShop = 0;
        $itemShopCarModal.empty();
        $('.js-total-price-modal').empty();
        const changeAllBtn = $('.js-single-product').find(`button`);
        if(changeAllBtn.hasClass('deactivate')){
            removeDeactivate(changeAllBtn);
        };
        $successPurchase.remove();
        $modalBtnBuy.attr("disabled", false);
        $modalBtnBuy.removeClass('getOff');
    }
        
    
    
    

    let $modalBtnBuy = $('.js-btn-buy-modal');
    let $successPurchase;
    $modalBtnBuy.click(buyPurchase);
        
    function buyPurchase(){
        let $containerButtons = $('.js-btns-modal');
        $containerButtons.parent().find('.js-btns-modal').after('<div class="js-success-purchase"><h1>Successful Purchase</h1></div>')
        $successPurchase = $('.js-success-purchase');
        $successPurchase.slideDown("slow");
        $successPurchase.css({"background":"linear-gradient(to bottom, red 30%, black 60%)", "border-radius":"20px", "color":"white", "text-align":"center", "border":"2px white solid"}, 1000);
        $successPurchase.html("<h1>Successful Purchase</h1>");
        $(this).attr("disabled", true);
        $(this).addClass('getOff');
    };
        
    



    let $modalBtnAddItem = $('.js-btn-add-modal');
    $modalBtnAddItem.click(function(){
        $shopCarModal.addClass('hide');
        $successPurchase.remove();
        $modalBtnBuy.attr("disabled", false);
        $modalBtnBuy.removeClass('getOff');
    });


    let $filterOption = $('.js-filter');
    function filteringOptions(){
        let dataFilter = $(this).data("reference");
        let $itemsProducts = $('.js-single-product');
        $itemsProducts.show();
        if(dataFilter === "all"){
            $(item).show();
        }else{
            $.each($itemsProducts, function(index, item){
                const sportItem = $(item).data('sport');
                if (dataFilter !== sportItem) {
                    $(item).hide();
                }
            });
        } 
    }
    $filterOption.click(filteringOptions);

    
});
