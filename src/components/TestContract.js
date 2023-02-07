import { Alert } from '@mui/material';
import React, { useContext, useState } from 'react'
import ContractContext from '../ContractContext';

function TestContract() {

    const { getTokenURI } = useContext(ContractContext);

    const [uri, setUri] = useState('');
    const [tid, setTid] = useState(1);

    const readFromContract = async () => {
        setUri('')
        getTokenURI(tid)
            .then( result => setUri(result))
    }

    const handleTidInput = (e) => {
        const val = parseInt(e.target.value);
        setTid(val);
    }

    return (
        <>
            <div className='container'>
                <div className="my-5">
                    <h4>Example: Read from contract</h4>
                    <h5>Tiny Dinos (eth) Token URI for token id</h5>
                    <input type="number" name="tid" id="tid" value={tid} onChange={handleTidInput}/>
                    <button className='btn btn-info' onClick={readFromContract}>Read tokenURI</button>
                    <p> Result: {uri}</p>
                </div>
                <div className="container my-5">
                    <Alert severity='warning'>For Security Reasons I decided not to include a write function in this page, but you can see the code in ContractContext File, for tiny dinos donate method.</Alert>
                </div>
            </div>
        </>
    )
}

export default TestContract
