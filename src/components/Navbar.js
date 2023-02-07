import React, { useContext } from 'react'
import WalletContext from '../WalletContext'

function Navbar() {

    const { account, chainId, changeNetwork, walletConnect, disconnectAccount, truncateAddress } = useContext(WalletContext);
    const nets = [
        "Mainnet",
        "Optimism",
        "Arbitrum",
    ];

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light navbar-dark bg-dark">
                <div className="container justify-content-between">
                    <a className="navbar-brand" href="#">MY DAPP</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Mint</a>
                            </li>
                        </ul>
                    </div>
                    {
                        !account &&
                        <button type="button" className="btn btn-primary" onClick={walletConnect}>Connect Wallet</button>
                    }
                    {
                        account &&
                        <div className="text-light">
                            <span className='mx-3'>{truncateAddress(account)}</span>
                            <button type="button" className="btn btn-warning" onClick={disconnectAccount}>Disconnect</button>
                            <span className='mx-3'>Net: {chainId}</span>
                            <button className="network-toggler btn btn-info" type="button" data-bs-toggle="collapse" data-bs-target="#networks" aria-controls="networks" aria-expanded="false" aria-label="Toggle network">
                                <span>Change Network</span>
                            </button>
                            <div className='collapse mt-3' id="networks">
                                <ul className="navbar-nav">
                                    {
                                        nets.map(net => <li className="nav-item mx-4" key={net}>
                                            <button type="button" className="btn btn-secondary" onClick={() => changeNetwork(net)}>{net}</button>
                                        </li>)
                                    }
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar
