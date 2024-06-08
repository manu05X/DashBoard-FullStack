import React, { useEffect } from "react";

import { Dialog, Transition } from "@headlessui/react";

import { ClockIcon } from "components/adaptive-icons/PinMarker";
import { PinMarkerIcon } from "components/adaptive-icons/Clock";
import { DialogCrossButton } from "components/DialogCrossButton";

import BalanceIcon from "./icons/balance.svg";

import Team1 from "assets/team-1.png";
import Team2 from "assets/team-2.png";
import { DialogSheet } from "components/DialogSheet";

interface PaymentBlockProp {
  pendingAmount: number;
}
function PaymentBlock(props: PaymentBlockProp) {
  return (
    <div className='flex flex-col gap-x-12 gap-y-5 desk-dialog:min-w-[40rem] desk-dialog:flex-row desk-dialog:items-center'>
      <div className='flex-1 rounded-half border border-grey-high p-5'>
        <div className='flex items-center gap-x-2 border-b border-outline-2 pb-5'>
          <div className='flex-shrink-0 overflow-hidden rounded-full'>
            <img className='w-7' src={Team1} />
          </div>
          <span className='min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>
            Team Soccer A
          </span>
          <p className='mx-3 flex-1 text-center text-grey-subtle sm:mx-5 md:mx-8 lg:mx-12'>
            V
          </p>
          <span className='min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>
            Team Soccer B
          </span>
          <div className='flex-shrink-0 overflow-hidden rounded-full'>
            <img className='w-7' src={Team2} />
          </div>
        </div>

        <div className='relative mt-5'>
          <p className='mb-1 flex items-center gap-x-2.5'>
            <PinMarkerIcon className='flex-shrink-0 text-blue-high' />

            <span className='min-w-0 overflow-hidden text-ellipsis font-semibold text-dim-white'>
              Emirate stadium, England
            </span>
          </p>
          <p className='flex items-center gap-x-2.5 text-dim-white'>
            <ClockIcon className='flex-shrink-0 text-blue-high' />

            <span className='min-w-0 overflow-hidden text-ellipsis text-fine text-dim-white'>
              15/10/2023 02:00 PM
            </span>
          </p>

          <p className='bottom-0 right-0 mt-6 text-dim-white xs:absolute'>
            You Owe:{" "}
            <span className='font-bold text-white'>${props.pendingAmount}</span>
          </p>
        </div>
      </div>
      <button className='rounded-half bg-blue-high px-10 py-3 text-center font-medium text-dim-black hover:bg-blue-high/80'>
        Make Payment
      </button>
    </div>
  );
}

interface DialogContentProps {
  onClose: () => void;
}
function DialogContent({ onClose }: DialogContentProps) {
  return (
    <>
      <Dialog.Title as='header' className='relative'>
        <h2 className='text-center text-2xl font-bold desk-dialog:mx-16'>
          Balance/Payment
        </h2>
        <DialogCrossButton onClick={onClose} />
      </Dialog.Title>

      <div className='mt-5 rounded-2.5xl border border-grey-high px-6 py-3 text-center text-lg desk-dialog:mx-32'>
        You owe a total of <span className='font-bold text-blue-high'>$85</span>
      </div>

      <section className='mt-12 flex flex-col gap-y-8 desk-dialog:gap-y-5'>
        <PaymentBlock pendingAmount={47} />
        <PaymentBlock pendingAmount={17} />
      </section>

      <footer className='mt-14 flex flex-wrap gap-x-7 gap-y-4 sm:justify-center'>
        <button
          onClick={onClose}
          className='flex-1 rounded-half bg-grey-high px-16 py-3 text-dim-white hover:bg-blue-high/10 sm:flex-initial'
        >
          Cancel
        </button>
        <button className='flex-1 rounded-half bg-blue-high px-16 py-3 text-dim-black hover:bg-blue-high/80 sm:flex-initial'>
          Pay All
        </button>
      </footer>
    </>
  );
}

export function BalanceTrigger() {
  let [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='dashboard-actions group'
      >
        <div className='group-hover:bg-blue-high/20'>
          <img src={BalanceIcon} />
        </div>
        <span>Balance / payments</span>
      </button>

      <Transition show={isOpen} as={React.Fragment}>
        <Dialog onClose={() => {}}>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <DialogSheet>
              <DialogContent onClose={() => setIsOpen(false)} />
            </DialogSheet>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
