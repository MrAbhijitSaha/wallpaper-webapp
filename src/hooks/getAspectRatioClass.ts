// const getAspectRatioClass = ( width: number | null,
//   height: number | null,
// : string) => {
// if (!width || !height) return "aspect-[4/3]";
//   const ratio = width / height;

//   if (ratio > 1.7) return "aspect-video";
//   if (ratio > 1.3) return "aspect-[4/3]";
//   if (ratio > 0.9) return "aspect-square";
//   if (ratio > 0.6) return "aspect-[3/4]";
//   return "aspect-[9/16]";
// }
// export default getAspectRatioClass;

const getAspectRatioClass = (width: number | null, height: number | null) => {
  if (!width || !height) return "aspect-[4/3]";
  const ratio = width / height;

  if (ratio > 1.7) return "aspect-video";
  if (ratio > 1.3) return "aspect-[4/3]";
  if (ratio > 0.9) return "aspect-square";
  if (ratio > 0.6) return "aspect-[3/4]";

  return "aspect-[9/16]";
};

export default getAspectRatioClass;
