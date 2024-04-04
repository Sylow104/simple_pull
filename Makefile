all :
	npx webpack --stats-error-details

.PHONY : clean

clean : 
	rm dist/pull_test.js