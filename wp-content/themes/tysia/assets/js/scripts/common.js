const common = ($ => {
  "use strict";

  /**
   * Fire events on document ready and bind other events
   *
   * @since   1.0.0
   */
  const ready = () => {

  };


  $(window).bind( 'grid:items:added', function(){

  });

  /**
   * Only expose the ready function to the world
   */
  return {
    ready: ready
  };
})(jQuery);

jQuery(common.ready);