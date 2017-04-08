require(['jquery','carousel'],function($,Carousel){
    var imgUrl = ['images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg'];
    var imgUrl1 = ['imgs/1.jpg','imgs/2.jpg','imgs/3.jpg'];
    var liHtml = ['','',''];
    var liHtml1 = [1,2,3,4];
    var settings1 = {
        location: '#container1',
        width: 600,
        height: 400,
        imgsUrl: imgUrl,
        liHtml: liHtml1,
        btnsStyle:'quare',
        btnsPosition: 'leftbottom',
        prevNextStyle: 'center',
        speed: 500,
        runStyle: 'displayNone'
    };
    var carousel1 = new Carousel(settings1);
    carousel1.init();
    var settings2 = {
        location: '#container2',
        width: 680,
        height: 344,
        imgsUrl: imgUrl1,
        liHtml: liHtml,
        btnsStyle:'circle',
        btnsPosition: 'rightbottom',
        prevNextStyle: 'bottom',
        speed: 1000,
        runStyle: 'seamless'
    }
    var carousel2 = new Carousel(settings2);
    carousel2.init();

});