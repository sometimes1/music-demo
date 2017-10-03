function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
        }


var id = getParameterByName('id');
        var query = new AV.Query('Song');
        query.get(id).then(function (song) {
          var {url, lyric} = song.attributes
          var images = song.attributes.images
          var singer = song.attributes.singer
          var img = `<img class="cover" src="${images}" alt="封面图片">`
          $('.circle').append(img)
          $('.background').css('background-image',`url(${images})`)
          var h2 = `<h2>${singer}</h2>`
          $('.lyric > .name').append(h2)
          var audio = document.createElement('audio')
          audio.src = url
          $('body').append(audio)
          $('.pointer').addClass('pause')
          $('.icon-pause3').on('click',function(){
              audio.pause()
              $('.circle').removeClass('playing')
              $('.pointer').addClass('pause')
          })
          $('.icon-play1').on('click',function(){
              audio.play()
              $('.circle').addClass('playing')
              $('.pointer').removeClass('pause')
          })
          audio.loop = false
          audio.addEventListener('ended',function(){
            $('.circle').removeClass('playing')
              $('.pointer').addClass('pause')
          },false)
          
          var array = []
          var parts = lyric.split('\n')
          parts.forEach(function(string,index){
            var xxx = string.split(']')
            xxx[0] = xxx[0].substring(1)
            var regex = /(\d+):([\d.]+)/
            var matches = xxx[0].match(regex)
            var minute = +matches[1]
            var seconds = +matches[2]
            array.push({
              time: minute*60+seconds,
              lyric: xxx[1]
            })
            
        })
        var $lyric = $('.lyric > .song-lyric')
            array.map(function(song){
                if(!song){return}
                var $p =$('<p/>')
                $p.attr('data-time',song.time).text(song.lyric)
                $p.appendTo($lyric.children('.lines'))
            })
        setInterval(function(){
            var $lines = $('.lines > p')
        var current = audio.currentTime
        var $whichLine
        for(var i=0;i<$lines.length;i++){
            var currentLineTime = $lines.eq(i).attr('data-time');
            var nextLineTime = $lines.eq(i+1).attr('data-time');
            if($lines.eq(i+1).length !==0 && currentLineTime < current && nextLineTime > current){
                $whichLine = $lines.eq(i)
        }
        if($whichLine){
            $whichLine.addClass('active').prev().removeClass('active')
            var top = $whichLine.offset().top;
            var linesTop = $('.lines').offset().top;
            var delta = Math.floor(top - linesTop - $('.song-lyric').height()/4)
            $('.lines').css('transform',`translateY(-${delta}px)`)
                }
            }
        },300)
        
        
    })