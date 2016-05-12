;
(function (win) {

  var doc = win.document;
  var $wrap = doc.createElement('div');

  var insideReg = /jsm\-kb/g;
  var hunting = false;

  class Keyboard {
    huntNumber ($input) {
      new NumberBoard($input);
    }
  }

  class BaseBoard {
    constructor ($input) {
      this.$input = $input;
      this.beforeBuild();
      this.build();
      this.afterBuild();
    }
    beforeBuild () {
      this.$mask = buildMask(this.$input);
    }

    afterBuild () {
      this.bindKeyboard();
    }

    build () {}

    showKeyboard () {}

    hideKeyboard () {}

    bindKeyboard () {

      var self = this;

      if (!hunting) {
        doc.addEventListener('click', function (e) {
          if (filterEvent(e.target)) {
            return;
          }
          self.hideKeyboard();
        });
      }
      self.$mask.addEventListener('click', self.showKeyboard);
    }
  }

  class NumberBoard extends BaseBoard {
    build () {
      console.log(this.$mask);
    }
  }

  /**
   * 根据传入dom元素 生成它的遮罩层
   * @param  {[type]} $input [description]
   * @return {[type]}        [description]
   */
  function buildMask ($input) {
    var style = win.getComputedStyle($input);
    var width = style.width;
    var height = style.height;
    var top = `${$input.offsetTop}px`;
    var left = `${$input.offsetLeft}px`;

    var $mask = create('div', {
      'class': 'jsm-kb-mask',
      style: {
        top,
        left,
        width,
        height,
        position: 'absolute',
        'z-index': 666
      }
    });

    $input.parentNode.appendChild($mask);

    return $mask;
  }

  /**
   * 检查元素是否为keyboard中的元素
   * @param  {Element} target dom元素
   * @return {boolean}        如果className存在jsm-kb 返回true 否则false
   */
  function filterEvent (target) {
    if (insideReg.test(target.className)) {
      return true;
    }
    return false;
  }

  /**
   * 生成dom元素
   * @param  {string} tag  dom的标签名
   * @param  {object} attr 一个属性的集合
   * @return {Element}     生成后的dom元素
   */
  function create (tag, attr) {
    var str = '';
    str += `<${tag}`;
    for (let key in attr) {
      let item = attr[key];
      // 属性值不为object 应当生成如下格式 key="item"
      if (typeof item !== 'object') {
        str += ` ${key}=${item} `;
      } else {
        str += ` ${key}=" `;
        for (let aKey in item) {
          let aItem = item[aKey];
          str += ` ${aKey}: ${aItem}; `;
        }
        str += ` "`;
      }
    }
    str +='/>';
    $wrap.innerHTML = str;
    return $wrap.removeChild($wrap.firstChild);
  }

  win.Keyboard = win.Keyboard || new Keyboard();
})(window);
