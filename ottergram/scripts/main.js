var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

// 设置图片详情
function setDetails(imageUrl,titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src',imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

// 返回缩略图图片的引用
function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

// 返回缩略图标题的引用
function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

// 调用之前的函数,用于获取缩略图并设大图
function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail),titleFromThumb(thumbnail));
}

// 添加缩略图点击事件监听
function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click',function(event){
  	event.preventDefault();
  	setDetailsFromThumb(thumb);
    showDetails();
  });
}

// 访问所有缩略图
function getThumbnailsArray(){
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
   // 这句话相当于Array.slice.call(arguments)，目的是将arguments对象的数组提出来转化为数组，arguments本身并不是数组而是对象
  var thumbnailArray  = [].slice.call(thumbnails);
  return thumbnailArray;
}

// 隐藏大图
function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAL_CLASS);
}
// 显示大图
function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function(){
    frame.classList.remove(TINY_EFFECT_CLASS);
  },50);
}
// 添加键盘事件监听
function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup',function(event){
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
}

function initializeEvents(){
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
}

initializeEvents();
