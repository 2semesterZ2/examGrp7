require('bootstrap/dist/js/bootstrap.bundle');

class Client {
  constructor() {
    this.bindUIActions();
  }

  bindUIActions() {
    const $headerSibling = $('.section--statement').next(),
      $btnScrollDown = $('.btn-scroll-down'),
      $menuToggle = $('.menu-toggle'),
      $menuOverlay = $('.menu-overlay'),
      $contactSelect = $('.custom-select'),
      $contactDropdown = $('.custom-dropdown');

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

    $contactDropdown.find('a.dropdown-item').click(function (e) {
      e.preventDefault();
      const $el = $(this);
      $contactSelect.val($el.attr('data-value'));
      $contactDropdown.find('.current-choice').text($el.text());
    });
  }
}

// eslint-disable-next-line no-unused-vars
const instance = new Client();
