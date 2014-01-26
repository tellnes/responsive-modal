
all: example/build.js example/build.css

example/build.js: example/example.js responsive-modal.js
	node_modules/.bin/browserify --debug --fast -e example/example.js > example/build.js

example/build.css: example/example.styl responsive-modal.styl
	node_modules/.bin/stylus --include example/ < example/example.styl > example/build.css

.PHONY: all
