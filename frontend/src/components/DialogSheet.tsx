import React from "react";
import { Dialog } from "@headlessui/react";

export const DialogSheet = React.forwardRef(
  (props: React.PropsWithChildren, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} className='fixed inset-0 overflow-y-auto'>
        <div
          className='flex min-h-full flex-col items-stretch justify-end pt-16
          desk-dialog:items-center desk-dialog:justify-center desk-dialog:px-2 desk-dialog:py-12'
        >
          <Dialog.Panel className='rounded-t-2.5xl bg-grey-low px-6 py-6 text-white desk-dialog:rounded-card'>
            {props.children}
          </Dialog.Panel>
        </div>
      </div>
    );
  }
);
