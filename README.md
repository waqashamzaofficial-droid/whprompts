# WHprompts React

React/Vite migration of the WHprompts prompt library.

## Local development

```bash
npm install
npm run dev
```

## GitHub Pages deployment

1. Create a GitHub repository and push this project to the `main` or `master` branch.
2. In GitHub, open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push changes. The workflow at `.github/workflows/deploy-pages.yml` builds and publishes the site automatically.

For a repository named `my-prompts`, the site will be available at:

```text
https://YOUR-USERNAME.github.io/my-prompts/
```

The workflow automatically configures the repository base path, React Router basename, prompt image paths, legal CSS paths, route metadata, and a `404.html` SPA fallback.

Place prompt images here:

```text
public/images/1.jpg
public/images/2.jpg
```

Prompt data should reference them as:

```js
img: "images/1.jpg"
```
