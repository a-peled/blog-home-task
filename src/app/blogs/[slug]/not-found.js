"use client";

import { NotFoundWrapper, NotFoundTitle, NotFoundMessage } from "./styled";

export default function NotFound() {
  return (
    <NotFoundWrapper>
      <NotFoundTitle>פוסט לא נמצא</NotFoundTitle>
      <NotFoundMessage>הפוסט שחיפשת לא קיים או הוסר</NotFoundMessage>
    </NotFoundWrapper>
  );
}
