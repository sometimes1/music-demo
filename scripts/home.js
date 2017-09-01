
/*tabs组件*/
$('.tabs').on('click', 'li', function (e) {
    var $li = $(e.currentTarget)
    var index = $li.index()
    $li.addClass('active').siblings().removeClass('active')
    $('.tab-content').children().eq(index)
        .addClass('active').siblings().removeClass('active')
        
        close()
})


//最新音乐歌曲应用

var $olSongs = $('ol#songs')
var query = new AV.Query('Song');
query.find().then(function (results) {
    $('#songs-loading').remove()
    for (var i = 0; i < results.length; i++) {
        var song = results[i].attributes
        if(song.hot===true){
            var li = `
            <li>
                <a href="./song.html?id=${song.id}">
                    <h3>${song.name}</h3>
                    <p><i class="sq"></i>${song.singer}</p>
                    <div></div>
                </a>
            </li>
                    `    
            $olSongs.append(li)
        }
        
    }
    
}, function (error) {
    alert('获取歌曲曲失败')
})



/*热歌榜*/ 

var $olSong = $('ol#song')
var query = new AV.Query('Song');
query.find().then(function (results) {
    for (var i = 0; i < results.length; i++) {
        var song = results[i].attributes
        if((i-9)<10){
            if(song.hot===false){
                var li = `
                <li>
                    <a href="./song.html?id=${song.id}">
                        <div class="number">0${(i-9)}</div>
                        <h3>${song.name}</h3>
                        <p><i></i>${song.singer}</p>
                        <div class="button"></div>
                    </a>
                </li>
                        `
                $olSong.append(li)
            }
        }else{
            if(song.hot===false){
                var li = `
                <li>
                    <a href="./song.html?id=${song.id}">
                        <div class="number">${i-9}</div>
                        <h3>${song.name}</h3>
                        <p><i></i>${song.singer}</p>
                        <div class="button"></div>
                    </a>
                </li>
                        `
                $olSong.append(li)
            }
        }
    }
}, function (error) {
    alert('获取歌曲曲失败')
})

/*搜索结果*/
var timer = null
$('input#search').on('input', function (e) {
    if (timer) { window.clearTimeout(timer) }
    timer = setTimeout(function () {
        timer = null
        var $input = $(e.currentTarget)
        var value = $input.val()
        var query = new AV.Query('Song');
        $('.hot-seek').hide()
        $('.close').addClass('active')
        $('.search-content').html(`<h3>搜索“${value}”</h3>`).show()
        query.contains('name', value);
        query.find().then(function (results) {
            $('#searchResult').empty()
            if(results.length === 0){
                $('#searchResult').html('<div>暂无搜索结果</div>')
                $('.search-content').hide()
            }else{
                for (var i = 0; i < results.length; i++) {
                    var song = results[i].attributes
                    var li = `
                <li>
                        <i class="iconfont icon-weibiaoti-"></i>
                        <a href="./song.html?id=${song.id}">${song.name}</a>
                </li>
                `
                    $('#searchResult').append(li)
                }
                if (value === '') {
                    return (close())
                }
            }
        })
    }, 400)
})

/*包装清空按钮*/
var close = function () {
    $('#search').val('')
    $('.close').removeClass('active')
    $('#searchResult').empty()
    $('.hot-seek').show()
    $('.search-content').hide()
}
/*清空按钮*/
$('.close').on('click', function () {
    return (close())
})


/*热门搜索*/
$('.hot-seek > ul').on('click', 'li', function (e) {
    var $ul = $(e.currentTarget)
    $('#search').val($ul.text())
    var value = $('#search').val()
    var query = new AV.Query('Song');
    $('.hot-seek').hide()
    $('.close').addClass('active')
    $('.search-content').html(`<h3>搜索“${value}”</h3>`).show()
    query.contains('name', value);
    query.find().then(function (results){
        $('#searchResult').empty()
        if(results.length === 0){
            $('#searchResult').html('<div>暂无搜索结果</div>')
            $('.search-content').hide()
        }else{
            for (var i = 0; i < results.length; i++) {
                var song = results[i].attributes
                var li = `
            <li>
                    <i class="iconfont icon-weibiaoti-"></i>
                    <a href="#">${song.name}</a>
            </li>
            `
                $('#searchResult').append(li)
            }
            if (value === '') {
                return (close())
            }
        }
    })
})
//显示搜索
$('#searchResult').on('click','li > a',function(e){
    $a = $(e.currentTarget)
    var value = $a.text()
    var query = new AV.Query('Song');
    $('.search-content').hide()
    query.contains('name', value);
    query.find().then(function (results){
        $('#searchResult').empty()
        for (var i = 0; i < results.length; i++) {
            var song = results[i].attributes
            var ol = `
            <ol class="list" id="songs">
            <li>
            <a href="./song.html?id=${song.id}">
                <h3>${song.name}</h3>
                <p><i></i>${song.singer}</p>
                <div></div>
            </a>
            </li>
            </ol>
    `
            $('#searchResult').append(ol)
        }
    })
})




/*热门歌曲列表*/

$('.hotlist > ul').on('click', 'li>div>span', function () {
    $('#search').val($(this).text())
    hot()
})

//搜索包装
var hot = function () {
    $('.hotlist').hide()
    $('.hot-seek').hide()
    $('.close').addClass('active')
    $('#searchResults').empty()
    var value = $('#search').val()
    $('.search-content').html(`<h3>搜索“${value}”</h3>`).show()
}




 //

        //歌曲上传
        /*var SongObject = AV.Object.extend('Song');//选择表名
        var songObject = new SongObject();//生成一条数据
        songObject.save({
            name:'If You Feel My Love',//数据里面的内容
            singer:'Blaxy Girls',
            url:'http://ovapiv064.bkt.clouddn.com/If%20You%20Feel%20My%20Love'
        }).then(function(object) {
            alert('保存成功');
        })*/