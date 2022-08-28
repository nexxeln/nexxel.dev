import { withOGImage } from 'next-api-og-image';

interface QueryParams {
  title: string;
}

export default withOGImage<'query', QueryParams>({
  template: {

    html: ({ title }) => `
    <html>
      <body>
        <h1>${title}</h1>
      </body>
    </html>
    `
  },
  cacheControl: 'public, max-age=604800, immutable',
  dev: {
    inspectHtml: false,
  },
});
