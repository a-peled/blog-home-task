import { PageWrapper } from "./styled";
import BackButton from "./BackButton";

export default function Layout({ children }) {
  return (
    <PageWrapper>
      <BackButton />

      {children}
    </PageWrapper>
  );
}
