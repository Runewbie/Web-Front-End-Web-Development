import $ from 'jquery';
import md5 from 'crypto-js/md5';
import moment from 'moment';//格式化日期用的模块

//创建用户的头像url
function createGravatarUrl(username) {
  let userhash = md5(username);
  return `http://www.gravatar.com/avatar/${userhash.toString()}`;
}
// 请求用户名,提示用户输入用户名
export function promptForUserName() {
  let username = prompt('Enter a username');
  // diana.prince@bignerdranch.com
  // clark.kent@bignerdranch.com
  return username.toLowerCase();
}

export class ChatForm {
  constructor(formSel, inputSel) {
    this.$form = $(formSel);
    this.$input = $(inputSel);
  }

  init(submitCallbcak) {
    this.$form.submit((event) => {
      event.preventDefault();
      let val = this.$input.val();
      submitCallbcak(val);
      this.$input.val('');
    });

    this.$form.find('button').on('click', () => this.$form.submit());
  }
}
//创建ChatList类
export class ChatList {
  constructor(listSel, username) {
    this.$list = $(listSel);
    this.username = username;
  }

  //用来绘制消息的方法
  drawMessage({
    user: u,
    timestamp: t,
    message: m
  }) {
    let $messageRow = $('<li>', {
      'class': 'message-row'
    });


    if (this.username === u) {
      $messageRow.addClass('me');
    }
    let $message = $('<p>');
    $message.append($('<span>', {
      'class': 'message-username',
      text: u
    }));

    $message.append($('<span>', {
      'class': 'timestamp',
      'data-time': t,
      text: moment(t).fromNow()
      // text: (new Date(t)).getTime()
    }));

    $message.append($('<span>', {
      'class': 'message-message',
      text: m
    }));

    let $img = $('<img>', {
      src: createGravatarUrl(u),
      title: u
    });
    $messageRow.append($img);
    $messageRow.append($message);
    this.$list.append($messageRow);
    $messageRow.get(0).scrollIntoView();
  }

  // 格式化时间
  init(){
    this.timer = setInterval(()=>{
      $('data-time').each((idx,element)=>{
        let $element = $(element);
        let timestamp = new Date().setTime($element.attr('data-time'));
        let ago = moment(timestamp).fromNow();
        $element.html(ago);
      });
    },1000);
  }
}
