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
    let $carouselContainer = $('.js-carousel');
    let $arrowLeft = $('.js-arrow-left');
    let $arrowRight = $('.js-arrow-right');

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


    



});