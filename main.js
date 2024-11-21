document.addEventListener('DOMContentLoaded', () => {
const $ = document.querySelector.bind(document) 
const $$ = document.querySelectorAll.bind(document) 
const playBtn =$('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const heading = $('header h2')
const thumb = $('.cd-thumb')
const playList = $('.playlist')
const audio = $('#audio')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    song: [
        {
        name: 'Vạn sự tùy duyên',
        singer: 'Thanh Hưng',
        path: './assets/music/song1.mp3',
        img: './assets/img/img1.jpg'
    },
    {
        name: 'Hứa đợi nhưng chẳng tới',
        singer: 'Lâm Tuấn',
        path: './assets/music/song2.mp3',
        img: './assets/img/img2.jpg'
    },
    {
        name: 'Tiếng Pháo Tiễn Người',
        singer: 'Hùng Quân',
        path: './assets/music/song3.mp3',
        img: './assets/img/img3.jpg'
    },
    {
        name: 'Như Anh Đã Thấy Em',
        singer: 'PhucXp x Orinn',
        path: './assets/music/song4.mp3',
        img: './assets/img/img4.jpg'
    },
    {
        name: 'Kỳ Vọng Sai Lầm',
        singer: ' Nguyễn Đình Vũ x Tăng Phúc x Yuno BigBoi',
        path: './assets/music/song5.mp3',
        img: './assets/img/img5.jpg'
    },
    {
        name: 'Nơi Vực Nơi Trời',
        singer: ' Lê Bảo Bình',
        path: './assets/music/song6.mp3',
        img: './assets/img/img6.jpg'
    },
    {
        name: 'Mây x Gió ( Mashup )',
        singer: 'JanK ft. Sỹ Tây x Quanvrox',
        path: './assets/music/song7.mp3',
        img: './assets/img/img7.jpg'
    },
    {
        name: 'Chắc Ai Đó Sẽ Về',
        singer: 'Sơn Tùng MTP',
        path: './assets/music/song8.mp3',
        img: './assets/img/img8.jpg'
    }, 
    {
        name: 'Trả Lại Thanh Xuân Cho Em',
        singer: 'H2K',
        path: './assets/music/song9.mp3',
        img: './assets/img/img9.jpeg'
    },
    {
        name: 'Ba Kiếp Tình Một Kiếp Duyên',
        singer: 'Lâm Tuấn ',
        path: './assets/music/song10.mp3',
        img: './assets/img/img10.jpg'
    },
    {
        name: 'Nơi Này Có Anh ',
        singer: 'Sơn Tùng MTP',
        path: './assets/music/song11.mp3',
        img: './assets/img/img11.jpg'
    },
    {
        name: 'Em Ơi Anh Phải Làm Sao ',
        singer: 'Dương Minh Tuấn x DC Tâm',
        path: './assets/music/song12.mp3',
        img: './assets/img/img12.jpg'
    },
    {
        name: 'Đừng Làm Trái Tim Anh Đau ',
        singer: 'Sơn Tùng MTP',
        path: './assets/music/song13.mp3',
        img: './assets/img/img13.jpg'
    }
],
   render: function () {
    const htmls = this.song.map(function (song,index) { 
        return `
         <div class="song ${index === app.currentIndex ? 'active' : '' }" data-index= "${index}">
      <div class="thumb" style="background-image: url('${song.img}')">
      </div>
      <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
      </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>
        `
    })
    playList.innerHTML = htmls.join('')
   }
    ,
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.song[this.currentIndex]
            }
     })},
    handelEvents: function () {
        // Xử lý phóng to thu nhỏ đĩa than
        const _this = this
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth
        document.onscroll = function () {
          var scrollTop = window.scrollY || document.documentElement.scrollTop
          var newCdWidth = cdWidth - scrollTop;
          cd.style.width = newCdWidth>0 ? newCdWidth + 'px' : 0
          cd.style.opacity = newCdWidth / cdWidth
        }
        // Xử lý cd quay/ dừng
       const cdThumb = thumb.animate([ 
            {transform:' rotate(360deg)'}],
            {duration: 10000,
            iterations: Infinity
            }
        )

        cdThumb.pause()

        // Xử lí khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            }
            else {
                _this.isPlaying = true,
                audio.play()
            }
        }
        // khi song được play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumb.play()
        }
       
        //Xử lý chuyển bài hát khi phát hết nhạc
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.onclick()
            }
        }
        // khi song bị pause 
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumb.pause()
        }
        // khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
          if ( audio.duration) {
            const progressPercent = Math.floor( audio.currentTime / audio.duration * 100  )
            progress.value = progressPercent
          }
        }
        // xử lý tua song
        progress.onchange = function (e) { 
            const seek = audio.duration / 100 * e.target.value 
            audio.currentTime = seek
        }
        // Xử lý chuyển bài hát tiếp theo
        nextBtn.onclick = function () {
            if(_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong()
            }
           audio.play()
           _this.render()
           _this.scrollToActiveSong()
        }
        // Xử lý chuyển bài hát phía trước
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.lastSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
         }
         // Xử lý random
         randomBtn.onclick = function (e) {
         _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active',_this.isRandom)
         }
         // Xử lý repeat song 
         repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active',_this.isRepeat)
            }
        // xử lý chọn bài hát
        playList.onclick = function (e) {
            const songNode =  e.target.closest('.song:not(.active)')
            if ( songNode || e.target.closest('.option') ) {
                // xử lý chọn bài hát
                if (songNode) {
                   _this.currentIndex = Number(songNode.dataset.index)
                   _this.loadCurrentSong()
                   _this.render()
                   audio.play()
                }
                // xử lý chọn option
                if ( e.target.closest('.option')) {

                }
            }
        }
    },
       // Xử lý scroll to active song 
       scrollToActiveSong: function () {
        setTimeout( () => {
            $('.song.active').scrollIntoView({
                behavior : 'smooth',
                block: 'center',
            }) 
        },300)
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        thumb.style.backgroundImage = `url('${this.currentSong.img}')`
        audio.src = this.currentSong.path
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.song.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    lastSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0 ) {
            this.currentIndex = this.song.length - 1
        }
        this.loadCurrentSong()
    },
    randomSong: function () {
        let newIndex 
        do {
            newIndex = Math.floor(Math.random() * this.song.length)
        } while (newIndex === this.currentIndex)
            this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function() {
        //định nghĩa các thuộc tính cho object
        this.defineProperties()
        //lắng nghe sk
        this.handelEvents()

        this.loadCurrentSong()
        // render list
        this.render()
    }
}

app.start()

})