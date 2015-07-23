
all: example/build.js example/build.css

example/build.js: example/example.js responsive-modal.js package.json
	node_modules/.bin/browserify --debug -e example/example.js > example/build.js

example/build.css: example/example.styl responsive-modal.styl package.json
	node_modules/.bin/stylus --include example/ < example/example.styl > example/build.css

.PHONY: all
