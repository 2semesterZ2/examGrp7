require('bootstrap/dist/js/bootstrap.bundle');

class Client {
  constructor() {
    this.bindUIActions();
  }

  bindUIActions() {
    const $headerSibling = $('.section--statement').next(),
      $btnScrollDown = $('.btn-scroll-down'),
      $menuToggle = $('.menu-toggle'),
      $menuOverlay = $('.menu-overlay');

    if ($headerSibling.length) {
      $btnScrollDown.click(function (e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $headerSibling.offset().top - $('.navbar').innerHeight()
        }, 270);
      });
    } else {
      $btnScrollDown.hide();
    }

    $menuToggle.click(function (e) {
      e.preventDefault();
      const isVisible = $menuOverlay.is('.visible');
      if (isVisible) {
        $menuOverlay.removeClass('visible');
        $menuToggle.removeClass('open');
      } else {
        $menuOverlay.addClass('visible');
        $menuToggle.addClass('open');
      }
    });
  }
}

// eslint-disable-next-line no-unused-vars
const instance = new Client();
