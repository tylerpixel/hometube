document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded'); // Debug line
    const video = document.getElementById('mainVideo');
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    const bookmarks = document.getElementById('bookmarks');
    const overlay = document.getElementById('overlay');
    const videoSource = video.currentSrc;

    // Debugging logs
    console.log('video', video);
    console.log('bookmarkBtn', bookmarkBtn);
    console.log('bookmarks', bookmarks);
    console.log('overlay', overlay);
  
    const savedBookmarks = JSON.parse(localStorage.getItem(`videoBookmarks-${videoSource}`)) || [];
    console.log('Saved bookmarks:', savedBookmarks); // Debug line
  
    savedBookmarks.forEach(time => {
      createBookmark(time);
    });
  
    bookmarkBtn.addEventListener('click', function() {
      const currentTime = video.currentTime;
      console.log('Current time:', currentTime); // Debug line

      savedBookmarks.push(currentTime);
      localStorage.setItem(`videoBookmarks-${videoSource}`, JSON.stringify(savedBookmarks));
      createBookmark(currentTime);
  
      overlay.style.display = 'block';
  
      setTimeout(function() {
        overlay.style.display = 'none';
      }, 3000);
    });
  
    function createBookmark(time) {
      const bookmarkElement = document.createElement('div');
      bookmarkElement.className = 'bookmark bookmark-item noselect';
      bookmarkElement.textContent = `${time.toFixed(2)}s`;
    
      let longpress = false;
      let isMouseDown = false;
      let timer;
      const longpressTime = 750;
    
      bookmarkElement.addEventListener('mousedown', function() {
        isMouseDown = true;
        longpress = false;
        timer = setTimeout(() => {
          if (isMouseDown) {
            longpress = true;
            bookmarkElement.classList.add('wiggling', 'turning-red');
          }
        }, longpressTime);
      });
    
      bookmarkElement.addEventListener('mouseup', function() {
        clearTimeout(timer);
        bookmarkElement.classList.remove('wiggling', 'turning-red');
        if (longpress) {
          bookmarkElement.remove();
          const index = savedBookmarks.indexOf(time);
          if (index !== -1) {
            savedBookmarks.splice(index, 1);
            localStorage.setItem(`videoBookmarks-${videoSource}`, JSON.stringify(savedBookmarks));
          }
        } else {
          video.currentTime = time;
        }
        isMouseDown = false;
        longpress = false;
      });
    
      bookmarkElement.addEventListener('mouseleave', function() {
        clearTimeout(timer);
        isMouseDown = false;
        longpress = false;
        bookmarkElement.classList.remove('wiggling', 'turning-red');
      });
    
      bookmarkElement.addEventListener('mouseenter', function() {
        if (isMouseDown) {
          timer = setTimeout(() => {
            if (isMouseDown) {
              longpress = true;
              bookmarkElement.classList.add('wiggling', 'turning-red');
            }
          }, longpressTime);
        }
      });
    
      bookmarks.appendChild(bookmarkElement);
    }    
});