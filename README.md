## How To Run it

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) running, with ports 3000 and 8080 free.

```bash
git clone <this-repo-url>
cd blog-home-task
docker compose up --build
```

First startup takes a couple of minutes. Wait for this in the logs:

```
==========================================
 App password loaded, starting Next.js.
 Blog is ready at http://localhost:3000
==========================================
```

Then open **http://localhost:3000** and browse the blog.

## Stop / reset

```bash
docker compose down      # stop (keeps data)
docker compose down -v   # stop and wipe everything for a fresh start
```
