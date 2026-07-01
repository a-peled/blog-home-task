import StyledComponentsRegistry from "./registry"; // this is how the consistant class names are being called and activated
import Providers from "./providers"; // both the theme context, and the activation of global styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
