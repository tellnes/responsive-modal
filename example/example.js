var Modal = require('..')

window.onload = function () {
  var modal = new Modal()
  modal.wrapper.className += ' example-modal'
  modal.content.innerHTML = 'tester<div data-rm-close>Close</div>'
}
