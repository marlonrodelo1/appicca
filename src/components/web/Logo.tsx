/* eslint-disable @next/next/no-img-element */
export function Logo({
  height = 46,
  rounded = 10,
}: {
  height?: number;
  rounded?: number;
}) {
  return (
    <img
      src="/logo.png"
      alt="Iglesia Cuerpo de Cristo"
      style={{
        height,
        width: "auto",
        display: "block",
        borderRadius: rounded,
      }}
    />
  );
}
