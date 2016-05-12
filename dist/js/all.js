'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;
(function (win) {

  var doc = win.document;
  var $wrap = doc.createElement('div');

  var insideReg = /jsm\-kb/g;
  var hunting = false;

  var Keyboard = function () {
    function Keyboard() {
      _classCallCheck(this, Keyboard);
    }

    _createClass(Keyboard, [{
      key: 'huntNumber',
      value: function huntNumber($input) {
        new NumberBoard($input);
      }
    }]);

    return Keyboard;
  }();

  var BaseBoard = function () {
    function BaseBoard($input) {
      _classCallCheck(this, BaseBoard);

      this.$input = $input;
      this.beforeBuild();
      this.build();
      this.afterBuild();
    }

    _createClass(BaseBoard, [{
      key: 'beforeBuild',
      value: function beforeBuild() {
        this.$mask = buildMask(this.$input);
      }
    }, {
      key: 'afterBuild',
      value: function afterBuild() {
        this.bindKeyboard();
      }
    }, {
      key: 'build',
      value: function build() {}
    }, {
      key: 'showKeyboard',
      value: function showKeyboard() {}
    }, {
      key: 'hideKeyboard',
      value: function hideKeyboard() {}
    }, {
      key: 'bindKeyboard',
      value: function bindKeyboard() {

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
    }]);

    return BaseBoard;
  }();

  var NumberBoard = function (_BaseBoard) {
    _inherits(NumberBoard, _BaseBoard);

    function NumberBoard() {
      _classCallCheck(this, NumberBoard);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(NumberBoard).apply(this, arguments));
    }

    _createClass(NumberBoard, [{
      key: 'build',
      value: function build() {
        console.log(this.$mask);
      }
    }]);

    return NumberBoard;
  }(BaseBoard);

  /**
   * 根据传入dom元素 生成它的遮罩层
   * @param  {[type]} $input [description]
   * @return {[type]}        [description]
   */


  function buildMask($input) {
    var style = win.getComputedStyle($input);
    var width = style.width;
    var height = style.height;
    var top = $input.offsetTop + 'px';
    var left = $input.offsetLeft + 'px';

    var $mask = create('div', {
      'class': 'jsm-kb-mask',
      style: {
        top: top,
        left: left,
        width: width,
        height: height,
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
  function filterEvent(target) {
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
  function create(tag, attr) {
    var str = '';
    str += '<' + tag;
    for (var key in attr) {
      var item = attr[key];
      // 属性值不为object 应当生成如下格式 key="item"
      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
        str += ' ' + key + '=' + item + ' ';
      } else {
        str += ' ' + key + '=" ';
        for (var aKey in item) {
          var aItem = item[aKey];
          str += ' ' + aKey + ': ' + aItem + '; ';
        }
        str += ' "';
      }
    }
    str += '/>';
    $wrap.innerHTML = str;
    return $wrap.removeChild($wrap.firstChild);
  }

  win.Keyboard = win.Keyboard || new Keyboard();
})(window);