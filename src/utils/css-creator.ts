import { getTheHighestZIndex, getTheLowestZIndex } from "./utils";

export function setCSSStyling(
  styling: Partial<CSSStyleDeclaration> | undefined,
  component: HTMLElement,
  hideComponent = true,
) {
  const defaultStyling: Partial<CSSStyleDeclaration> = {
    position: 'absolute',
    top: '0',
    left: '0',
    display: 'flex',
    justifyContent: 'center',
  };

  const fullStyling: Partial<CSSStyleDeclaration> = {
    ...defaultStyling,
    ...styling,
  };

  Object.keys(fullStyling).forEach((value) => {
    component.style.setProperty(value, fullStyling[value]);
  });

  component.style.pointerEvents = 'none';

  if (hideComponent) {
    component.setAttribute('aria-hidden', 'true');
    let minZIndex = getTheLowestZIndex();
    const newMinZIndex = minZIndex === Number.parseFloat('0')?  Number.parseFloat('2'):   Number.parseFloat(`${5 * Math.abs(minZIndex)}`);
    component.style.zIndex = `-${newMinZIndex}`;
  } else {
    const maxZIndex = getTheHighestZIndex();
    const newMaxZIndex = maxZIndex ===  Number.parseFloat('0')?  Number.parseFloat('2'):  Number.parseFloat(`${5 + Math.abs(maxZIndex)}`)
    component.style.zIndex = `${newMaxZIndex}`;
  }
}
