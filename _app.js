// _app.js
import { ClerkProvider, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';

const publicPages = ['/sign-in/[[...index]]', '/sign-up/[[...index]]'];

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();

  // Check if the current page is a public page
  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider {...pageProps}>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <RedirectToSignIn />
      )}
    </ClerkProvider>
  );
}

export default MyApp;
