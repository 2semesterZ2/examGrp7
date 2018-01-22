require('bootstrap/dist/js/bootstrap.bundle');

class Client {
  constructor() {
    this.bindUIActions();
    this.initNavbarHide();
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

  initNavbarHide() {
    let wScrollLast = $(window).scrollTop();
    $(window).scroll(function () {
      const wScrollCurrent = $(this).scrollTop();
      const element = $('.navbar');
      const elHeight = element.outerHeight();
      const wScrollDiff = wScrollLast - wScrollCurrent;
      const dHeight = $('body').outerHeight(true);
      const wHeight = $(window).innerHeight();
      let elTop = element.position().top + wScrollDiff;
      const offsetBottom = $('footer').outerHeight();
      console.log([wScrollCurrent, wScrollDiff, elTop]);
      if (wScrollCurrent <= 0) { // scrolled to the very top; element sticks to the top
        element.css({
          top: '0px',
        });
      } else if (wScrollDiff > 0) { // scrolled up; element slides in
        element.css({
          top: `${(elTop > 0 ? 0 : elTop)}px`,
        });
      } else if (wScrollDiff < 0) { // scrolled down
        if (wScrollCurrent + wHeight >= dHeight - elHeight - offsetBottom) { // scrolled to the very bottom; element slides in
          elTop = (wScrollCurrent + wHeight + offsetBottom) - dHeight;
          element.css('top', `${(elTop < 0 ? elTop : 0)}px`);
        } else { // scrolled down; element slides out
          element.css('top', `${(Math.abs(elTop) > elHeight ? -elHeight : elTop)}px`);
        }
      }
      wScrollLast = wScrollCurrent;
    });
  }
}

// eslint-disable-next-line no-unused-vars
const instance = new Client();
