export function isValidImage(imageURL: string) {
  if (!imageURL || imageURL.trim().length === 0) return false;

  //check for empty base64 string
  return imageURL !== 'data:,';
}

export function getFilename(type: string, filename?: string) {
  const downloadFilename = filename || `download_${Date.now()}`;
  return `${downloadFilename}.${type}`;
}
export function getTheLowestZIndex() {
  return Math.min(
    ...Array.from(document.querySelectorAll('body *'), (el) =>
      parseFloat(window.getComputedStyle(el).zIndex),
    ).filter((zIndex) => !Number.isNaN(zIndex)),
  );
}

export function getTheHighestZIndex() {
  return Math.max(
    ...Array.from(document.querySelectorAll('body *'), (el) =>
      parseFloat(window.getComputedStyle(el).zIndex),
    ).filter((zIndex) => !Number.isNaN(zIndex)),
  );
}
