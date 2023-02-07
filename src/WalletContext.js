import { createContext, useState } from "react";
import { Alert, Snackbar } from '@mui/material';

const WalletContext = createContext();

export function WalletProvider({ children }) {
    const [account, setAccount] = useState('');

    const [walletError, setWalletError] = useState(false);

    const [chainId, setChainId] = useState();

    const vertical = 'top';
    const horizontal = 'right';

    const handleCloseWalletError = () => {
        setWalletError(false);
    }

    const walletConnect = async () => {

        if (typeof window.ethereum === 'undefined') {
            setWalletError(true);
            return;
        }

        window.ethereum.on('chainChanged', (cId) => {
            setChainId(cId);
        });

        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    setAccount(accounts[0]);
                    setChainId(window.ethereum.networkVersion);
                });

            window.ethereum.on('accountsChanged', (a) => {
                if (a.length > 0) {
                    setAccount(a[0]);
                    return;
                }
                setAccount('');
            })
        }
    }

    const networkSetting = {
        'Mainnet': {
            chainId: '0x1',
            chainName: 'Ethereum Mainnet',
            nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
            rpcUrls: ['https://mainnet.infura.io/v3/'],
            blockExplorerUrls: ['https://etherscan.io'],
        },
        'Optimism': {
            chainId: '0xa',
            chainName: 'Optimistic Ethereum',
            nativeCurrency: { name: 'OP', decimals: 18, symbol: 'ETH' },
            rpcUrls: ['https://mainnet.optimism.io'],
            blockExplorerUrls: ['https://optimistic.etherscan.io'],
        },
        'Arbitrum': {
            chainId: '0xa4b1',
            chainName: 'Arbitrum One',
            nativeCurrency: { name: 'ARB', decimals: 18, symbol: 'ETH' },
            rpcUrls: ['https://arb1.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://arbiscan.io'],
        },
    }

    const changeNetwork = async (name) => {
        const net = networkSetting[name]
        if (window.ethereum.networkVersion !== net.chainId) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: net.chainId }]
                });
            } catch (err) {
                // This error code indicates that the chain has not been added to MetaMask
                if (err.code === 4902) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainName: net.chainName,
                                chainId: net.chainId,
                                nativeCurrency: net.nativeCurrency,
                                rpcUrls: net.rpcUrls,
                                blockExplorerUrls: net.blockExplorerUrls
                            }
                        ]
                    });
                }
            }
        }
    }

    const disconnectAccount = () => {
        setAccount('');
    }

    const truncateAddress = (adr) => {
        return adr.slice(0, 6) + '...' + adr.slice(-4);
    }

    return (
        <WalletContext.Provider value={{
            account: account,
            chainId: chainId,
            changeNetwork: changeNetwork,
            walletConnect: walletConnect,
            disconnectAccount: disconnectAccount,
            truncateAddress: truncateAddress,
        }}>
            {children}
            <>
                {
                    walletError &&
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={walletError}
                        onClose={handleCloseWalletError}
                        message="MetaMask Not Installed!"
                        key={vertical + horizontal}
                    >
                        <Alert onClose={handleCloseWalletError} severity='warning'>MetaMask Not Installed!</Alert>
                    </Snackbar>
                }
            </>
        </WalletContext.Provider>
    );
}

export default WalletContext;