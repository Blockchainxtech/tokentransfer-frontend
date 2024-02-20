import { useReadContract } from 'wagmi';
import abi from "../abi/erc20.json"
import Logo from "../assets/images/logo.png";
import { post } from '../service/api';
import { useEffect, useState } from 'react';

const Header = () => {
  const [balanceData, setBalanceData] = useState<number>();

  const storedData = localStorage.getItem('wagmi.store') ?? '';

  const parsedData = JSON.parse(storedData);

  const accounts = parsedData?.state?.connections?.value[0]?.[1]?.accounts;

  // Retrieve the connected wallet address (assuming there's only one account)
  const connectedWalletAddress = accounts ? accounts[0] : null;

  
  const { data: balance, error, isPending } = useReadContract({
    address: import.meta.env.VITE_WALLET_ADDRESS,
    abi: abi,
    functionName: 'balanceOf',
    args: [connectedWalletAddress],
  });

  const { data: tokenDecimal } = useReadContract({
    address: import.meta.env.VITE_WALLET_ADDRESS,
    abi: abi,
    functionName: 'decimals'
  });

  useEffect(() => {
    if (!isPending && !error && balance !== null && tokenDecimal !== null) {
      const balanceValue = balance as string;
      const tokenDecimalValue = tokenDecimal as number;
      const bVal = parseFloat(balanceValue);
      const fromWei = bVal / Math.pow(10, tokenDecimalValue);
      setBalanceData(fromWei);
    }
  }, [isPending, error, balance, tokenDecimal]);


   const connect=async()=>{
    try {
      const {data}=await post("/connect",{wallet_address:connectedWalletAddress})
      console.log(data)
    } catch (error) {
      console.log(error)
    }
   }

  return (
    <header>
      <nav className="navbar navbar-expand-lg" id="navbar_top">
        <div className="container">
          <div className="header">
            <div className="green-vector"></div>
            <div className="logo-rotate">
              <img className="normal" src={Logo} width="200" alt="BlockchainX"/>
            </div>
            {isPending && <div>Loading...</div>}
            {!isPending && !error && (
              <div>
                Balance: {balanceData}
              </div>
            )}
            <div onClick={connect}>
            <w3m-button />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;