publish:
	npm publish --dry-run

install: 
	npm ci

gendiff: 
	node bin/gendiff .\__fixtures__\file1.json .\__fixtures__\file2.json

publish:
	npm publish --dry-run
	
lint:
	npx eslint .	

test-coverage:
	npm test -- --coverage --coverageProvider=v8
	
test: 
	npm test
	
.PHONY: test