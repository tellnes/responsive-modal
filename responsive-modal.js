
var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')

module.exports = Modal

function createElement(name) {
  return document.createElement(name)
}

function Modal() {
  if (!(this instanceof Modal)) return new Modal()
  EventEmitter.call(this)

  this.destroyed = false

  this.wrapper = createElement('div')
  this.wrapper.className = 'rm-wrapper'

  this.content = createElement('div')
  this.content.className = 'rm-content'
  this.wrapper.appendChild(this.content)

  this.wrapper.addEventListener('click', this, false)
  window.addEventListener('resize', this, false)
  window.addEventListener('orientationchange', this, false)

  document.body.appendChild(this.wrapper)
}

inherits(Modal, EventEmitter)

Modal.prototype.handleEvent = function (event) {
  if (this.destroyed) return

  switch (event.type) {
  case 'click':
    this.handleClick(event)
    break
  case 'resize':
  case 'orientationchange':
    this.emit('resize')
    break
  }
}

Modal.prototype.handleClick = function (event) {
  var element = event.target
  while (element) {
    if (element === this.content) return
    if (element === this.wrapper) break
    if (element.hasAttribute('data-rm-close')) break
    element = element.parentNode
  }
  this.close()
}

Modal.prototype.destroy = function () {
  if (this.destroyed) return
  this.destroyed = true

  this.wrapper.removeEventListener('click', this, false)
  window.removeEventListener('resize', this, false)
  window.removeEventListener('orientationchange', this, false)

  document.body.removeChild(this.wrapper)

  delete this.wrapper
  delete this.content
}

Modal.prototype.close = function () {
  this.emit('close')
  this.destroy()
}
