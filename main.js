$( document ).ready(function(){
    const image1 = './Images/skate.jpg';
    const image2 = './Images/sailing.jpg';
    const image3 = './Images/skiing.jpg';
    const image4 = './Images/snowboard.jpg';
    const image5 = './Images/soccer.jpg';
    const image6 = './Images/surf.jpg';
    const images = [image1, image2, image3, image4, image5, image6];
    const sports = ["skate", "sailing", "skiing", "snowboard", "soccer", "surf"];
    let countImage = 0;
    let divcarousel;
    let countText = 0;
    let carouselTextContainer;
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
        if((countImage === 0) && (countText === 0)){
            countImage = images.length -1;
            countImage = countImage -1;
            countText = sports.length-1
            countText = countText -1
        } else {
            countImage = countImage -1;
            countText = countText -1;
        }
        $carouselContainer.empty();
        divcarousel = `<img class="carousel__image js-carousel-image" src="${images[countImage]}"/>`;
        carouselTextContainer = `<span class="carousel__text js-carousel-text ">${sports[countText]}</span>`;
        $carouselContainer.prepend(divcarousel, carouselTextContainer);
    };
    $arrowLeft.click(moveLeft);

    function moveRight() {
        if((countImage === images.length-1) && (countImage === images.length-1)){ 
            countImage = 0;
            countText = 0;
        } else {
            countImage = countImage +1;
            countText = countText +1;
        }
        $carouselContainer.empty();
        divcarousel = `<img class="carousel__image js-carousel-image" src="${images[countImage]}"/>`;
        carouselTextContainer = `<span class="carousel__text js-carousel-text ">${sports[countText]}</span>`;
        $carouselContainer.prepend(divcarousel, carouselTextContainer);
    };
    setInterval(moveRight, 3000);
    $arrowRight.click(moveRight);

    function hideShowFilters(){
        if($filterContain.hasClass('lateralSlide')){
            $filterContain.removeClass('lateralSlide')
        } else {
            $filterContain.addClass('lateralSlide');
        }  
    };
    $toggleFilters.click(hideShowFilters);


    const $itemShopCarModal = $('.js-container-shop');
    let subtotalFull;
    let dataIdClose = 0;
    $addShopCarButton.click(function(){
        $shopCarImage.effect( "shake", {times:2, direction:'up'}, 1000 );
        $amountProducts.text(counterShop += 1);
        const $singleProduct = $(this).parent();
        let nameProduct = $singleProduct.find('.js-name-product').text();
        let priceProduct = $singleProduct.find('.js-price-product').text();
        let imageProduct = $singleProduct.find('.js-image-product').attr('src');
        let valueSubtotal = $(this).val();
        let priceProductInteger = parseInt(priceProduct.substring(1,priceProduct.length));
        subtotalFull = priceProductInteger * valueSubtotal;
        $itemShopCarModal.append(`<div class="shopCar__item"><img class="shopCar__item-image js-image-shop" src="${imageProduct}" alt="">
        <span class="js-name-shop">${nameProduct}</span>
        <span class="js-price-shop">${priceProduct}</span>
        <input class="shopCar__item-amount js-amount-shop" value="1" type="number" min="1" max="99">
        $<span class="shopCar__item-subtotal js-subtotal-shop">${subtotalFull}</span>
        <img class="shopCar__item-remove js-cancel-item-shop"data-id="${dataIdClose += 1}" src="./Images/remove.png" alt=""></div>`);
        $(this).addClass('deactivate');
        $(this).html('Inside the cart');
        $(this).attr("disabled", true);
        $(this).attr('data-id',`${dataIdClose}`);
    });

    $itemShopCarModal.on('click', '.js-cancel-item-shop', function(){
        let dataId = $(this).data('id');
        console.log(dataId);
        $amountProducts.text(counterShop -= 1);
        const sameBtns = $('.js-single-product').find(`button[data-id ='${dataId}']`);
        sameBtns.removeClass('deactivate');
        sameBtns.html('ADD TO CART');
        sameBtns.attr("disabled", false);
        $(this).parent().remove();
    });

    let numbers = 0;
    let newPrice;
    $itemShopCarModal.on('click', '.js-amount-shop', function(){
        let valueInsideShop = $(this).val();
        let priceProductPrev = $(this).prev().text();
        let priceProductPrevInt = parseInt(priceProductPrev.substring(1,priceProductPrev.lenght));
        newPrice = valueInsideShop * priceProductPrevInt;
        $(this).next().text(newPrice);
        numbers += newPrice;
    });

    $shopCarImage.click(function(){
        $shopCarModal.removeClass('hide');
    })


    let $btnCLoseShop = $('.js-close-shop');
    $btnCLoseShop.click(function(){
        $shopCarModal.addClass('hide');
        $amountProducts.text(0);
        counterShop = 0;
        $itemShopCarModal.empty();
    });

    let $btnTotalShop = $('.js-btn-total-modal');
    let total = 0;
    $btnTotalShop.click(function(){
        let $subtotals = $('.js-subtotal-shop');
        $subtotals.each(number => {
             console.log(number.innerText);
        // $('.js-total-price-modal').text(total);
        });
        
    });
    
    let $modalBtnAddItem = $('.js-btn-add-modal');
    $modalBtnAddItem.click(function(){
        $shopCarModal.addClass('hide');
    });

    let $modalBtnBuy = $('.js-btn-buy-modal');
    $modalBtnBuy.click(function(){
        let $containerButtons = $('.js-btns-modal');
        $containerButtons.css({"background":"linear-gradient(to bottom, red 30%, black 60%)", "border-radius":"20px", "color":"white"}, 1000);
        $containerButtons.html("<h1>Successful Purchase</h1>");
    });

    
});