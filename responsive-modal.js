
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

  document.body.appendChild(this.wrapper)
}

inherits(Modal, EventEmitter)

Modal.prototype.handleEvent = function (event) {
  if (this.destroyed) return
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
  document.body.removeChild(this.wrapper)
  delete this.wrapper
  delete this.content
}

Modal.prototype.close = function () {
  this.emit('close')
  this.destroy()
}
