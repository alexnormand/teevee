.PHONY = all, clean, gen

DEPLOY = deploy
SQUEEZE = squeeze
HTMLCOMPRESSOR = $(SQUEEZE) htmlcompressor
YUICOMPRESSOR = $(SQUEEZE) yuicompressor
CLOSURE = $(SQUEEZE) closure

all :  clean gen

clean:
	rm -rf $(DEPLOY)

gen: 
	mkdir -p $(DEPLOY)/css
	mkdir -p $(DEPLOY)/js
	cp -r get/ $(DEPLOY)/
	$(HTMLCOMPRESSOR) index.html -o $(DEPLOY)/index.html
	$(YUICOMPRESSOR)  css/style.css -o $(DEPLOY)/css/style.css
	$(CLOSURE) --js js/onload.js --js_output_file $(DEPLOY)/js/onload.js



