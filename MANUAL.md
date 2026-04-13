# Site Manual & Roadmap - APEX Magazine

## Current Status
- **Auth**: Google Login integrated via Navbar.
- **Articles**: 
  - Mock data is currently used in `App.tsx`.
  - **ArticleForm** is implemented for adding new articles (Draft mode).
  - **Backend** handles image uploads to `public/uploads/` and HTML sanitization.
- **SEO**: `react-helmet-async` integrated for dynamic meta tags.
- **Legal**: GDPR and Impressum pages available via Footer.

## Placeholders & TODOs
1. **Recaptcha**: The verification in `server.ts` is currently mocked. You need to add your `SITE_KEY` and `SECRET_KEY`.
2. **Database Migration**: The `Journal` component currently uses `MOCK_ARTICLES`. 
   - *Action*: Update `Journal.tsx` to fetch from Firestore `articles` collection.
3. **Moderation UI**: There is no UI for admins to "Approve" articles yet.
   - *Action*: Create an Admin Dashboard to toggle `published: true` on articles.
4. **Sitemap**: `public/sitemap.xml` needs to be created and updated as new articles are added.

## Security Features
- **XSS**: All article content is sanitized via `DOMPurify` on the backend before saving.
- **Rate Limiting**: Users are limited to 3 article submissions per 10 minutes (IP-based).
- **Email Validation**: Handled by Firebase Auth and HTML5 input types.

## Future Roadmap
### 1. Mobile Optimization
- Implement "Pull to Refresh" for the article list.
- Optimize image sizes using a CDN or sharp (Node.js library) on upload.
- Add PWA (Progressive Web App) support for offline reading.

### 2. CDN Integration (Images)
To scale the application and handle high traffic, it is recommended to move image storage from the local server to a CDN (like Firebase Storage, AWS S3, or Cloudinary).
#### Steps to implement:
1. **Update `server.ts`**: In the `/api/upload` route, after the `sharp` optimization, upload the resulting file to your chosen CDN provider using their SDK.
2. **Return CDN URL**: Instead of returning a local path (`/uploads/...`), return the public URL provided by the CDN.
3. **Update Firestore**: Store the CDN URL in the `article` document.
4. **Nginx Config**: If using a VPS, you can still use Nginx to cache these CDN assets or redirect requests.

### 3. Performance
- **Lazy Loading**: Use `React.lazy` for heavy components like `ArticleForm` and `LegalPages`.
- **Image Optimization**: Implement WebP conversion on the backend.
- **Caching**: Add Redis or a simple in-memory cache for frequently read articles.

### 3. Cybersecurity
- Implement CSRF protection for the Express API.
- Add Security Headers (Helmet middleware for Express).
- Regular dependency audits (`npm audit`).
