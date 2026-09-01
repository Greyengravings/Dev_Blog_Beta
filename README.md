# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Beta testing landing page

A Vite + React landing page for recruiting testers, styled to match the editorial developer-blog reference.

## Google Sheets collection

1. Create a Google Sheet with a header row such as `submittedAt`, `username`, `email`, `phone`, `areas`, and `consent`.
2. Open **Extensions > Apps Script** and paste:

```js
function doGet() {
	return ContentService.createTextOutput('Beta form endpoint is ready.');
}

function doPost(e) {
	if (!e || !e.parameter) {
		return ContentService.createTextOutput('Run this function by submitting the website form.');
	}
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
	const data = e.parameter;
	sheet.appendRow([
		data.submittedAt || new Date().toISOString(),
		data.username || '',
		data.email || '',
		data.phone || '',
		data.areas || '',
		data.consent || '',
	]);
	return ContentService.createTextOutput(JSON.stringify({ ok: true }))
		.setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy it as a **Web app**, execute as yourself, and allow access to anyone.
4. Copy the `/exec` URL into a local `.env` file using the key shown in `.env.example`.

## Run locally

```bash
npm install
npm run dev
```

The form uses a URL-encoded `POST` request, which works with the Apps Script web-app endpoint without exposing Google credentials in the frontend.

## GitHub Pages

The Vite base path is configured for `https://greyengravings.github.io/Dev_Blog_Beta/`. The workflow in `.github/workflows/deploy.yml` deploys automatically after pushes to `main`. In the repository settings, set **Pages > Build and deployment > Source** to **GitHub Actions**. Add the Apps Script URL as the repository secret `VITE_GOOGLE_SHEET_ENDPOINT` so production submissions reach the sheet.
