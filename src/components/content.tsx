import { useState, ChangeEvent } from 'react';
// import { useReadContract } from 'wagmi';
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import abi from "../abi/erc20.json";
import { FormData } from '../types';

const Content = () => {

    const [formData, setFormData] = useState<FormData>({ address: '', value: 0,});

    // Handle change for input fields
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

    const {
        data: hash,
        error,
        isPending,
        writeContract
    } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash });

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const amount = formData.value * Math.pow(10, 18)
        writeContract({
            address: import.meta.env.VITE_WALLET_ADDRESS,
            abi,
            functionName: 'transfer',
            args: [formData.address, amount],
        });
    };



    // const { data: tokenName } = useReadContract({
    //     address: import.meta.env.VITE_WALLET_ADDRESS,
    //     abi: abi,
    //     functionName: 'name',
    // });

    // const name = tokenName as string;

    return (
        <>
            <section className="transfer-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="main-heading"><h1>Token Transfer Platform</h1></div>
                                <form onSubmit={submit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            {/* <div className="form-floating">
                                                <select className="form-control form-select" id="floatingTokens" aria-label="Tokens" name="selectedToken" value={formData.selectedToken} onChange={handleInputChange}>
                                                    <option selected>Tokens</option>
                                                    <option value={name}>{name}</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                                <label htmlFor="floatingTokens">Test Tokens</label>
                                            </div> */}
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-floating mb-3">
                                                <input name="address" type="text" className="form-control" id="floatingWallet" placeholder="0xA0Cf…251e" value={formData.address} onChange={handleInputChange} required/>
                                                <label htmlFor="floatingWallet">Wallet Address</label>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-floating">
                                                <input name="value" type="number" className="form-control" id="floatingAmount" placeholder="0.05" value={formData.value} onChange={handleInputChange} required/>
                                                <label htmlFor="floatingAmount">Amount</label>
                                            </div>
                                        </div>
                                    </div>
                               
                                <div className="row">
                                    <div className="col-md-12">
                                        <button className="btn btn-primary connect-wallet" disabled={isPending} type="submit">{isPending ? 'Loading...' : 'Transfer'} </button>
                                    </div>
                                </div>
                                </form>
                                {hash && <div>Transaction Hash: {hash}</div>}
                                {isConfirming && <div>Waiting for confirmation...</div>}
                                {isConfirmed && <div>Transaction confirmed.</div>}
                                {error && (
                                    <div>Error: {(error as BaseError).shortMessage || error.message}</div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="transfer-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="main-heading"><h1>Transaction Logs</h1></div>

                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Txn hash</th>
                                                <th>Method</th>
                                                <th>User Name</th>
                                                <th>Block</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>From</th>
                                                <th>To</th>
                                                <th>Gas fee</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td>
                                                <td>ABC</td>
                                                <td>-</td>
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>-</td>
                                                <td><button>View</button></td>
                                            </tr>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td>
                                                <td>ABC</td>
                                                <td>-</td>
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>-</td>
                                                <td><button>View</button></td>
                                            </tr>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td>
                                                <td>ABC</td>
                                                <td>-</td>
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>-</td>
                                                <td><button>View</button></td>
                                            </tr>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td>
                                                <td>ABC</td>
                                                <td>-</td>
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>-</td>
                                                <td><button>View</button></td>
                                            </tr>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td>
                                                <td>ABC</td>
                                                <td>-</td>
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>-</td>
                                                <td><button>View</button></td>
                                            </tr>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td>
                                                <td>ABC</td>
                                                <td>-</td>
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>-</td>
                                                <td><button>View</button></td>
                                            </tr>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td>
                                                <td>ABC</td>
                                                <td>-</td>
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>-</td>
                                                <td><button>View</button></td>
                                            </tr>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td>
                                                <td>ABC</td>
                                                <td>-</td>
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>-</td>
                                                <td><button>View</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section></>
    );
};

export default Content;
