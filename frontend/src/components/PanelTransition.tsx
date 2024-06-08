// import React from "react";
// import { Transition } from "@headlessui/react";

export const commonTransitionProps = {
  enter: "transition duration-100 ease-out",
  enterFrom: "transform scale-95 opacity-0",
  enterTo: "transform scale-100 opacity-100",
  leave: "transition duration-75 ease-out",
  leaveFrom: "transform scale-100 opacity-100",
  leaveTo: "transform scale-95 opacity-0"
};

/* export function PanelTransition({ children, ...props }: React.PropsWithChildren<any>) {
  return (
    <Transition
      enter='transition duration-100 ease-out'
      enterFrom='transform scale-95 opacity-0'
      enterTo='transform scale-100 opacity-100'
      leave='transition duration-75 ease-out'
      leaveFrom='transform scale-100 opacity-100'
      leaveTo='transform scale-95 opacity-0'
      as={React.Fragment}
      {...props}
    >
      {children}
    </Transition>
  );
}
 */
