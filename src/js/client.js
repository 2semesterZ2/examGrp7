require('bootstrap/dist/js/bootstrap.bundle');

class Client {
  constructor() {
    this.bindUIActions();
  }

  bindUIActions() {
    const $headerSibling = $('.section--statement').next(),
      $btnScrollDown = $('.btn-scroll-down');

    if ($headerSibling.length) {
      $btnScrollDown.click(function (e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $headerSibling.offset().top
        }, 200);
      });
    } else {
      $btnScrollDown.hide();
    }
  }
}

// eslint-disable-next-line no-unused-vars
const instance = new Client();
