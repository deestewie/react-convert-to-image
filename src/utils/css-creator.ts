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
    const minZIndex = getTheLowestZIndex();
    component.style.zIndex = `${minZIndex <= 0 ? -10 : minZIndex}`;
  } else {
    const maxZIndex = getTheHighestZIndex();
    component.style.zIndex = `${maxZIndex <= 0 ? 2 : maxZIndex}`;
  }
}
