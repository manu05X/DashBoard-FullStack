import React from "react";
import { usePopper } from "react-popper";

export function useMenu(offset?: number) {
  let [referenceElem, setReferenceElem] = React.useState();
  let [floatingElement, setFloatingElement] = React.useState();
  let { styles, attributes } = usePopper(referenceElem, floatingElement, {
    placement: "bottom-end",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, offset === undefined ? 12 : offset]
        }
      }
    ]
  });

  return {
    styles,
    attributes,
    setReferenceElem,
    setFloatingElement
  };
}
