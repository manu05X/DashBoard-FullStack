import React, { useEffect } from "react";
import cx from "classnames";
import { Listbox as ImplListBox, Transition } from "@headlessui/react";

import SelectDownArrow from "assets/select-down-arrow.svg";

import "./styles.css";

type ListboxProps<T> = {
  label?: React.ReactNode;
  placeholder?: string;
  btnClassName?: string;
  onChangeValue: (value: string) => void
  data: T[];
  initValue?: T;

  keyFunc?: string | ((x: T) => React.Key);
  renderFunc?: (x: T) => React.ReactNode;
};
export function ListBox<T>({
  keyFunc,
  renderFunc,
  label,
  initValue,
  onChangeValue,
  ...props
}: ListboxProps<T> & Omit<React.HTMLProps<HTMLDivElement>, "data">) {
  const [selectedItem, setSelectedItem] = React.useState<T | null>(
    initValue === undefined ? null : initValue
  );

  const makeKey = React.useCallback(
    (option: T) => {
      if (keyFunc === undefined) return option as any;

      if (typeof keyFunc === "string") return (option as any)[keyFunc];

      return keyFunc(option);
    },
    [keyFunc]
  );

  const render = React.useCallback(
    (option: T) => {
      return renderFunc?.(option) || (option as any);
    },
    [renderFunc]
  );

  let { defaultValue: _$01, ref: _$02, selected, ...divProps } = props;

  useEffect(() => {
    if (typeof selectedItem !== "object")
      onChangeValue(selectedItem)
  }, [selectedItem])

  useEffect(() => {
    setSelectedItem(selected)
  }, [selected])

  return (
    <ImplListBox
      {...divProps}
      value={selectedItem}
      onChange={setSelectedItem}
      as='div'
      className={cx("app-listbox", props.className)}
    >
      {label && <ImplListBox.Label>{label}</ImplListBox.Label>}
      <ImplListBox.Button
        data-app-active={selectedItem !== null}
        className={cx("app-listbox-btn", props.btnClassName)}
      >
        {selectedItem === null || selected === null
          ? props.placeholder || "Select an option"
          : render(selectedItem)}
        <img src={SelectDownArrow} />
      </ImplListBox.Button>
      <Transition
        as={React.Fragment}
        leave='transition ease-in duration-100'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <ImplListBox.Options as='ul' className='app-listbox-options'>
          {props.data.map(option => (
            <ImplListBox.Option as='li' key={makeKey(option)} value={option}>
              {render(option)}
            </ImplListBox.Option>
          ))}
        </ImplListBox.Options>
      </Transition>
    </ImplListBox>
  );
}
