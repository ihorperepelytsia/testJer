// import Vue from "vue";
import locomotiveScroll from "locomotive-scroll";

let inited = false, interval

const init = () => {
  let scroller = document.querySelector(".scroller")
  if (!scroller) return false
  
    window.lmS = new locomotiveScroll({
      el: scroller, 
      smooth: true,
      lerp: 0.15,
      // lerp: 1,
      offset: ['9%','9%'],
      tablet: { smooth: false },
      smartphone: { smooth: false },
    });
    
    window.lmS.on('call', (func, type, el) => {
      if (func === 'lazy') {
        el.el.src = el.el.getAttribute('data-src')
      }
    })
  
    inited = true
    setTimeout(() => {
      window.lmS.update();
    },200)
  }
  
  init()
  
  if (!inited) {
    interval = setInterval(() => {
      init()
      if (inited) {
        clearInterval(interval)
      }
    }, 500)
  }
