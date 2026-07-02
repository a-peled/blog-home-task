"use client"; // is a client component

import Image from "next/image";
import PropTypes from "prop-types";
import { ImageWrapper } from "./WordpressImage.styled";

export default function WordPressImage({
  src,
  alt,
  height,
  borderRadius,
  priority,
  sizes,
}) {
  if (!src) return null;

  return (
    <ImageWrapper $height={height} $borderRadius={borderRadius}>
      <Image
        src={src}
        alt={alt || ""}
        fill
        priority={priority}
        sizes={sizes || "100vw"}
      />
    </ImageWrapper>
  );
}

WordPressImage.propTypes = {
  // using propTypes for validation since it is a client component
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  priority: PropTypes.bool,
  sizes: PropTypes.string,
};

WordPressImage.defaultProps = {
  alt: "",
  height: "200px",
  borderRadius: "8px",
  priority: false,
  sizes: "100vw",
};
