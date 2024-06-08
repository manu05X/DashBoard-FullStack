import React, { useState } from "react";
import WalletConnectModal from "./WalletConnectModal";

function ConnectWalletButton() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConnect = (chain, wallet) => {
    console.log("Connected to:", chain, "via", wallet);
  };

  return (
    <>
      <button
        className='ml-1 rounded-md p-2 transition-colors text-black hover:text-white bg-blue-high/12'
        onClick={handleOpenModal}
      >
        Connect Wallet
      </button>
      {showModal && (
        <WalletConnectModal onClose={handleCloseModal} onConnect={handleConnect} />
      )}
    </>
  );
}

export default ConnectWalletButton;