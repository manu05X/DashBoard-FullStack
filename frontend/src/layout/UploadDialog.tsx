import React, { PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DialogSheet } from "components/DialogSheet";
import { DialogCrossButton } from "components/DialogCrossButton";
import ConfirmationTick from "assets/confirm-tick.svg";
import Team1 from "assets/team-1.png";

export function UploadDialogTrigger({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = React.useState(false);

  children = React.Children.only(children);
  const handleElement =
    children &&
    React.cloneElement(children as any, {
      onClick: e => {
        console.log("Clicked");
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      }
    });

  const onClose = () => {
    setIsOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      {handleElement}
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
              <Content onClose={onClose} />
            </DialogSheet>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function Content(p: { onClose: () => void }) {
  return (
    <>
      <Dialog.Title as='header' className='relative mb-6'>
        <DialogCrossButton onClick={p.onClose} />
        <div className='flex flex-col items-center'>
          <img src={ConfirmationTick} />
          <p className='mt-2 font-medium text-dim-white'>Event Ended</p>
          <h1 className='mt-5 max-w-[29rem] text-center text-title font-bold'>
            Do you want to register the score for your event on your playmate?
          </h1>
        </div>
      </Dialog.Title>

      <div className='flex items-end rounded-half border border-outline-2 px-5 pb-4 pt-7 gap-x-8'>
        <div className='min-w-0 shrink-0 mb-2'>
          <img className='w7.5 h-7.5 rounded-full' src={Team1} />
          <p className='mt-2.5 text-fine font-medium'>Team Soccer A</p>
        </div>
        <div className='flex grow items-center justify-center gap-x-3'>
          <p className='overflow-hidden flex h-12.5 w-12.5 items-center justify-center rounded-half border border-grey-high bg-dim-black'>
            <input
              size={1}
              className="bg-transparent w-full h-full text-center text-idxtitle text-grey-classic"
              defaultValue="0"
            />
          </p>
          <Sep />
          <p className='overflow-hidden flex h-12.5 w-12.5 items-center justify-center rounded-half border border-grey-high bg-dim-black'>
            <input
              size={1}
              className="bg-transparent w-full h-full text-center text-idxtitle text-grey-classic"
              defaultValue="0"
            />
          </p>
        </div>
        <div className='flex min-w-0 shrink-0 flex-col items-end mb-2'>
          <img className='w7.5 h-7.5 rounded-full' src={Team1} />
          <p className='mt-2.5 text-fine font-medium'>Team Soccer B</p>
        </div>
      </div>

      <label className='app-checkbox mt-5'>
        <input checked type='checkbox' />
        Share with team members?
      </label>


      <footer className='mt-9 flex justify-center gap-x-7'>
        <button
          onClick={p.onClose}
          className='relative flex items-center rounded-half bg-blue-high px-14 py-3 text-dim-black hover:bg-blue-high/80'
        >
          Upload
        </button>
      </footer>
    </>
  );
}

function Sep() {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5 10H15'
        stroke='#888888'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
