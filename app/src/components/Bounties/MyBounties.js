import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import BountyCard from './BountyCard';
import { toast, ToastContainer } from 'react-toastify';

function MyBounties({
  userBounties,
  fetchUserBounties,
  cancelBounty,
  wallet,
  connect,
  disconnect,
  connecting,
}) {
  const refreshBounties = useCallback(
    toToast => {
      if (wallet) {
        fetchUserBounties();
        if (toToast) {
          toast.success('Bounty cancelled successfully!');
        }
      }
    },
    [wallet, fetchUserBounties]
  );

  return (
    <div className="bounties-grid">
      <ToastContainer />
      {!wallet ? (
        <div>
          <h2>connect your wallet to view your bounties</h2>
          <button
            disabled={connecting}
            onClick={() =>
              wallet ? disconnect({ label: wallet.label }) : connect()
            }
          >
            {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
          </button>
        </div>
      ) : (
        userBounties
          .filter(bounty => bounty.amount > 0)
          .map(bounty => (
            <BountyCard
              key={bounty.id}
              bounty={bounty}
              wallet={wallet}
              cancelBounty={cancelBounty}
              refreshBounties={refreshBounties}
            />
          ))
      )}
    </div>
  );
}

MyBounties.propTypes = {
  userBounties: PropTypes.array.isRequired,
  wallet: PropTypes.object,
  connect: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
  connecting: PropTypes.bool.isRequired,
  fetchUserBounties: PropTypes.func.isRequired,
  cancelBounty: PropTypes.func.isRequired,
};

export default MyBounties;
