import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DialogCrossButton } from "components/DialogCrossButton";

function WalletConnectModal({ onClose, onConnect }) {
  const [chain, setChain] = useState("Ethereum"); // Default chain
  const [wallet, setWallet] = useState(""); // Selected wallet

  // Function to handle wallet connection
  const handleConnect = () => {
    onConnect(chain, wallet);
    onClose();
  };

  // Function to handle chain selection
  const handleChainChange = (e) => {
    setChain(e.target.value);
  };

  // Function to handle wallet selection
  const handleWalletChange = (e) => {
    setWallet(e.target.value);
  };

  return (
    <Transition show={true} as={React.Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-[999999] overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block align-bottom bg-grey-low rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full p-6">
              <Dialog.Title as="h2" className="text-2xl font-bold text-center text-white">
                Connect Wallet
              </Dialog.Title>
              <DialogCrossButton onClick={onClose} className="absolute top-4 right-4" />

              <div className="mt-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white">Select Chain:</label>
                  <select
                    value={chain}
                    onChange={handleChainChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="Ethereum">Ethereum</option>
                    <option value="Binance Smart Chain">Binance Smart Chain</option>
                    {/* Add more chain options as needed */}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-white">Select Wallet:</label>
                  <select
                    value={wallet}
                    onChange={handleWalletChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="MetaMask">MetaMask</option>
                    <option value="Trust Wallet">Trust Wallet</option>
                    {/* Add more wallet options as needed */}
                  </select>
                </div>

                <button
                  onClick={handleConnect}
                  className="w-full rounded-md bg-blue-high px-4 py-2 text-center font-medium text-black hover:bg-blue-high/80"
                >
                  Connect
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default WalletConnectModal;
