import React from "react";
import cx from "classnames";

export const ChildSet = (
  _props: React.PropsWithChildren<React.HTMLProps<HTMLOrSVGElement>>
) => null;

export function enhance<TagName extends keyof JSX.IntrinsicElements>(
  tag: TagName,
  Component: () => React.ReactElement
) {
  const getBaseProps = () => {
    let childset = Component();
    let { props } = childset;
    return props;
  };

  return (selfProps: React.HTMLProps<JSX.IntrinsicElements[TagName]>) => {
    let { children, ...baseProps } = getBaseProps();

    let { children: selfChildren, ...restSelfProps } = selfProps;

    let injectedProps = {
      ...baseProps,
      ...restSelfProps,
      className: cx(baseProps.className, selfProps.className) || undefined,
      style: { ...(baseProps.style || {}), ...(selfProps.style || {}) }
    };

    return React.createElement(tag, injectedProps, children, selfChildren);
  };
}
