publish:
	npm publish --dry-run

install: 
	npm ci

gendiffJson: 
	node bin/gendiff .\__fixtures__\file1.json .\__fixtures__\file2.json

gendiffYml: 
	node bin/gendiff .\__fixtures__\file1.yml .\__fixtures__\file2.yml

publish:
	npm publish --dry-run
	
lint:
	npx eslint .	

test-coverage:
	npm test -- --coverage --coverageProvider=v8
	
test: 
	npm test
	
.PHONY: test