// import { useReadContract } from 'wagmi';
import { type BaseError, useWaitForTransactionReceipt, useWriteContract, useReadContract } from 'wagmi';
import abi from "../abi/erc20.json";
import { FormData } from '../types';
import { schema } from '../validations/transfer-input-validation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Content = () => {
    const { data: hash, error, isPending, writeContract } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const storedData = localStorage.getItem('wagmi.store') ?? '';

    const parsedData = JSON.parse(storedData);

    const accounts = parsedData?.state?.connections?.value[0]?.[1]?.accounts;

    // Retrieve the connected wallet address (assuming there's only one account)
    const connectedWalletAddress = accounts ? accounts[0] : null;

    const { data: balance, } = useReadContract({
        address: import.meta.env.VITE_WALLET_ADDRESS,
        abi: abi,
        functionName: 'balanceOf',
        args: [connectedWalletAddress],
    });

    const balanceValue = balance as number;

    const submit = async (data: FormData) => {

        const amount = data.value * Math.pow(10, 18)

        console.log(balanceValue, amount)

        if (balanceValue < amount) {
            toast.dismiss();
            return toast.error('Insufficient Balance',{
                autoClose: 3000,
                pauseOnHover: false,
                closeOnClick: true 
            });
        }

        writeContract({
            address: import.meta.env.VITE_WALLET_ADDRESS,
            abi,
            functionName: 'transfer',
            args: [data.address, amount],
        });
        
    };

    useEffect(()=>{
        if (isConfirmed && hash) {
            toast.dismiss();
            toast.success("Transaction successfully completed",{
                autoClose: 3000,
                pauseOnHover: false,
                closeOnClick: true 
            });
            
        } else if (error) {
            const errorMessage = (error as BaseError).shortMessage || error.message;
            toast.dismiss();
            toast.error('Error: ' + errorMessage,{
                autoClose: 3000,
                pauseOnHover: false,
                closeOnClick: true 
            });
        }
    },[isConfirmed,error,hash])
   
   
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
                                <form onSubmit={handleSubmit(submit)}>
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
                                                <input type="text" className="form-control" id="floatingWallet" placeholder="0xA0Cf…251e"  {...register('address')} />
                                                <label htmlFor="floatingWallet">Wallet Address</label>
                                                {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="floatingAmount" placeholder="0.05"  {...register('value')} />
                                                <label htmlFor="floatingAmount">Amount</label>
                                                {errors.value && <div className="invalid-feedback">{errors.value.message}</div>}
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
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>From</th>
                                                <th>To</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td> 
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                                <td><button>View</button></td>
                                            </tr>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td>
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                               
                                                <td><button>View</button></td>
                                            </tr>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td>
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                                <td><button>View</button></td>
                                            </tr>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td>
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                                <td><button>View</button></td>
                                            </tr>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td>
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                                <td><button>View</button></td>
                                            </tr>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td>
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                                <td><button>View</button></td>
                                            </tr>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td>
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                                <td><button>View</button></td>
                                            </tr>
                                            <tr>
                                                <td>-</td>
                                                <td><button>Signup</button></td>
                                                <td>19/02/2024 Monday</td>
                                                <td>1:22:04 PM</td>
                                                <td>oX5e27c...953af96</td>
                                                <td>oX5e27c...953af96</td>
                                                <td><button>View</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Content;
