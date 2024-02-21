import { type BaseError, useWaitForTransactionReceipt, useWriteContract, useReadContract } from 'wagmi';
import abi from "../abi/erc20.json";
import { FormData, Transaction } from '../types';
import { schema } from '../validations/transfer-input-validation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { fetchTransaction } from '../utils/fetchTransaction';

const Content = () => {
    const { data: hash, error, isPending, writeContract } = useWriteContract();

    const [transactions, setTransactions] = useState([]);

    const [storedValue,] = useLocalStorage('sessionToken');

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
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

        if (balanceValue < amount) {
            toast.dismiss();
            return toast.error('Insufficient Balance', {
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
        reset();
    };

    useEffect(() => {
        const fetchData = async () => {
            if (isConfirmed && hash) {
                toast.dismiss();
                toast.success("Transaction Successfully Completed", {
                    autoClose: 3000,
                    pauseOnHover: false,
                    closeOnClick: true
                });
                const transactions = await fetchTransaction(connectedWalletAddress, storedValue);
                setTransactions(transactions);
            } else if (error) {
                const errorMessage = (error as BaseError).shortMessage || error.message;
                toast.dismiss();
                toast.error('Error: ' + errorMessage, {
                    autoClose: 3000,
                    pauseOnHover: false,
                    closeOnClick: true
                });
            }
        };
        fetchData();
    }, [isConfirmed, error, hash])

    useEffect(() => {
        const fetchData = async () => {
            const transactions = await fetchTransaction(connectedWalletAddress, storedValue);
            setTransactions(transactions);
        };
        fetchData();
    }, [connectedWalletAddress, storedValue])

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
                                            <button className="btn btn-primary connect-wallet" disabled={isPending || Object.keys(errors).length > 0} type="submit">{isPending ? 'Loading...' : 'Transfer'} </button>
                                        </div>
                                    </div>
                                </form>
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
                                            {transactions.length > 0 ? (
                                                transactions.map((transaction: Transaction, index: number) => (
                                                    <tr key={index}>
                                                        <td>{transaction?.transaction_hash}</td>
                                                        <td><button>Transfer</button></td>
                                                        <td>{new Date(transaction?.created_at).toLocaleDateString()}</td>
                                                        <td>{new Date(transaction?.created_at).toLocaleTimeString()}</td>
                                                        <td>{transaction?.sender_address}</td>
                                                        <td>{transaction?.receiver_address}</td>
                                                        <td> <a href={`https://mumbai.polygonscan.com/tx/${transaction?.transaction_hash}`} target='_blank'><button>View</button></a></td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={7}>No transactions available</td>
                                                </tr>
                                            )}

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
