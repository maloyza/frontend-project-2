publish:
	npm publish --dry-run

install: 
	npm ci

publish:
	npm publish --dry-run
	
lint:
	npx eslint .	

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test: 
	npm test
	
.PHONY: test




