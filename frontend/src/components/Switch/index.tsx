import React from "react";
import cx from "classnames";

import "./styles.css";

let lastId = 0;

type SwitchProps = React.HTMLProps<HTMLDivElement> & {
  inputProps?: React.HTMLProps<HTMLInputElement>;
};
export function Switch({ inputProps, ...props }: SwitchProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const labelRef = React.useRef<HTMLLabelElement>(null);

  React.useEffect(() => {
    let next = lastId++;
    let id = `app-sw-${next}`;

    if (inputRef.current !== null) inputRef.current.id = id;

    if (labelRef.current !== null) labelRef.current.htmlFor = id;
  }, []);

  return (
    <div {...props} className={cx("app-switch", props.className)}>
      <input
        {...inputProps}
        ref={inputRef}
        type='checkbox'
        className='app-switch-checkbox'
      />
      <label ref={labelRef} className='app-switch-label'>
        <span className='app-switch-inner'></span>
        <span className='app-switch-switch'></span>
      </label>
    </div>
  );
}
