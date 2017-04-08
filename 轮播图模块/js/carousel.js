define(['jquery'],function($){
    function Carousel(settings){
        this.defaultSettings = {
            location: 'container1',
            width: 600,
            height: 400,
            imgsUrl: '',
            liHtml: '',
            btnsStyle:'circle',
            btnsPosition: 'leftbottom',
            prevNextStyle: 'center',
            speed: 500,
            runStyle: 'displayNone'
        };
        $.extend(this.defaultSettings,settings);
        this.$container = $('<div class="carousel-container"></div>');
        this.$btns_ul = $('<ul class="carousel-btns"></ul>');
        this.$prev_next = $('<div class="carousel-prevnext"></div>');
        this.$imgs = $('<div class="imgs"></div>');
        this.$next = $('<span class="carousel-next">&gt;</span>');
        this.$prev = $('<span class="carousel-prev">&lt;</span>');
    }
    Carousel.prototype.init = function(){
        var that = this;
        var indx = 0;
        $(this.defaultSettings.location).append(this.$container);
        this.$imgs.css({
            width: this.defaultSettings.width*this.defaultSettings.imgsUrl.length,
            height: this.defaultSettings.height
        });
        
        this.$container.css({
            width: this.defaultSettings.width,
            height: this.defaultSettings.height
        }).append(this.$imgs).append(this.$btns_ul).append(this.$prev_next);
        this.$prev_next.append(this.$next).append(this.$prev);
        this.$next.addClass(this.defaultSettings.prevNextStyle);
        this.$prev.addClass(this.defaultSettings.prevNextStyle);
        for(var i=0;i<this.defaultSettings.imgsUrl.length;i++){
            var $img = $('<img src="'+this.defaultSettings.imgsUrl[i]+'" alt="">');
            var $li = $('<li>'+this.defaultSettings.liHtml[i]+'</li>')
            this.$imgs.append($img);
            this.$btns_ul.append($li);
        }
        if(this.defaultSettings.runStyle == 'seamless'){
            $('img',this.$imgs).css('display','block');
        }
        $('li:first-child',this.$btns_ul).addClass('selected');
        $('img:first-child',this.$imgs).addClass('selected');
        $('li',this.$btns_ul).addClass(this.defaultSettings.btnsStyle).on('mouseover',function(){
            var indx = $(this).index();
            changeImg(indx);
        });
        this.$next.on('click',function(){
            indx++;
            if(indx == that.defaultSettings.imgsUrl.length){
                indx = 0;
            }
            changeImg(indx);
        });
        this.$prev.on('click',function(){
            indx--;
            if(indx == -1){
                indx = that.defaultSettings.imgsUrl.length-1;
            }
            changeImg(indx);
        });
        play();
        this.$container.hover(function(){
            clearInterval(that.timer);
        },function(){
            play();
        });
        function play(){
            that.timer = setInterval(function(){
                that.$next.trigger('click');
            },that.defaultSettings.speed);
        }
        function changeImg(indx){
            if(that.defaultSettings.runStyle == 'displayNone'){
                $('img',that.$imgs).eq(indx).addClass('selected').siblings().removeClass('selected');
                $('li',that.$btns_ul).eq(indx).addClass('selected').siblings().removeClass('selected');
               
            }
            if(that.defaultSettings.runStyle == 'seamless'){
                that.$imgs.animate({
                    left: -that.defaultSettings.width*indx
                },1000);
                 $('li',that.$btns_ul).eq(indx).addClass('selected').siblings().removeClass('selected');

            }
            
        }
    };
    return Carousel;
});