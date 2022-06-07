$(function(){
  
  /*
   * jQuery Slider
   */
  $('.sec-slider.jquery').each(function (){
    
    var $section    = $(this),
        $slides       = $section.find('.slider-wrap .slides'),
        $slide        = $slides.find('.slide'),
        $nav          = $section.find('.slider-wrap .slider-nav'),
        $indicator    = $section.find('.indicator'),

        slideCount    = $slide.length,
        indicatorHTML = '',
        currentIndex  = 0,
        interval      = 7500,
        timer;

    $slide.each(function (i) {
      indicatorHTML += '<a href="#"></a>';
    });
    $indicator.html(indicatorHTML);


    // 関数の定義
    // - - - - - - - - - - - - - - - - - - - - 

      // 次のスライドを表示する関数
      function showSlide(index) {
        var nextIndex = index;

        $slide.eq(currentIndex).fadeOut();  // 現在のスライドをフェードアウト
        $slide.eq(nextIndex).fadeIn();      // 次のスライドをフェードイン
        currentIndex = nextIndex;           // インデックを更新
        update();                           // ナビゲーションとインジケーターの更新 
      }

      // ナビゲーションとインジケーターを更新する関数
      function update() {
        var $prev = $nav.find('.prev');
            $next = $nav.find('.next');

        // 最初のスライドであれば，$prev ナビゲーションを無効にする
        if(currentIndex == 0){
          $prev.addClass('disabled');
        } else {
          $prev.removeClass('disabled');
        }
        // 最初のスライドであれば，$next ナビゲーションを無効にする
        if(currentIndex == slideCount-1){
          $next.addClass('disabled');
        } else {
          $next.removeClass('disabled');
        }
        // 現在のスライドのインジケーターを有効化
        $indicator.find('a').removeClass('active')
                  .eq(currentIndex).addClass('active');
      }

      // タイマーを開始する関数
      function startTimer() {
        timer = setInterval(function () {
          // 次に表示するスライドのインデックス
          var nextIndex = (currentIndex+1) % slideCount;
          showSlide(nextIndex);
        }, interval);
      }

      // タイマーを停止する関数
      function stopTimer() {
        clearInterval(timer);
      }


    // イベントの登録
    // - - - - - - - - - - - - - - - - - - - - 

      // ナビゲーションがクリックされたら該当するスライドを表示
      $nav.on('click', 'a', function(event) {
        event.preventDefault();
        if($(this).hasClass('prev')) {
          showSlide(currentIndex-1);
        } else {
          showSlide(currentIndex+1);
        }
      });

      // インジケーターがクリックされたら該当するスライドを表示
      $indicator.on('click', 'a', function(event) {
        event.preventDefault();
        if( !$(this).hasClass('active') ){
          showSlide($(this).index());
        }
      });

      // マウスが乗ったらタイマーを停止
      $slides.on({
        mouseenter: stopTimer,
        mouseleave: startTimer
      });


    // スライドショーの開始
    // - - - - - - - - - - - - - - - - - - - - 
    showSlide(currentIndex);
    startTimer();
  });
});



window.onload = function(){

  /*
   * Vue.js Slider
   */

  var imgs = [
        { src: 'https://source.unsplash.com/T-VS-7y_fAY/960x300' },
        { src: 'https://source.unsplash.com/YKtxjGsl1BY/960x300' },
        { src: 'https://source.unsplash.com/oZu6mNLGJrU/960x300' },
        { src: 'https://source.unsplash.com/FoBq12oj6SY/960x300' },
        { src: 'https://source.unsplash.com/kCes633Hh1M/960x300' }
      ],
      slideCount    = imgs.length,
      indicatorHTML = '<a href="#"></a>',
      interval      = 7500,
      timer;

  const app = Vue.createApp({
    data() {
      return {
        currentIndex: 0,
        imgs: imgs,
        slideCount: slideCount,
        indicatorHTML: indicatorHTML,
        timer: timer
      }
    },

    // インスタンスが作成された後に同期的に呼び出す
    created: function() {
      this.startTimer();
    },

    // メソッドの定義
    methods: {
      prev(e) {  // 次のスライドを表示
        e.preventDefault();
        this.currentIndex--;
      },
      next(e) {  // 前のスライドを表示
        e.preventDefault();
        this.currentIndex++;
      },
      jump(i,e) {  // インジケーターがクリックされたら該当するスライドを表示
        e.preventDefault();
        this.currentIndex = i;
      },
      startTimer() {  // タイマーを開始する関数
        this.timer = setInterval( () => {
          this.currentIndex = (this.currentIndex+1) % slideCount;
        }, interval);
      },
      stopTimer() {  // タイマーを停止する関数
        clearInterval(this.timer);
      }
    }
  }).mount('#app')
}