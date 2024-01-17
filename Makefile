build:
	cd backend && docker build . -t hardik

front:
	cd frontend && npm install && npm run dev

back:
	docker run -p 8080:8080 hardik

run:
	make front & make back
