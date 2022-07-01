o?=$(o)

ropsten:
	o=ropsten $(MAKE) deploy

mainnet:
	o=mainnet $(MAKE) deploy

deploy:
	npm run codegen:$(o)
	npm run build:$(o)
	npm run deploy:$(o)

.PNOHY: ropsten \
	mainnet \
	deploy