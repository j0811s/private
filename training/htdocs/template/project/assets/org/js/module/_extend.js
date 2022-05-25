/** プロパティを上書き */
export const extend = (dest, src) => {
  for (const property in src) {
    dest[property] = src[property]
  }

  return dest
}