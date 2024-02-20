import { type BaseError, useReadContract } from 'wagmi';
import abi from "../abi/erc20.json"
import Logo from "../assets/images/logo.png";

const Header = () => {
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

  const balanceValue = balance as string;
  const tokenDecimalValue = tokenDecimal as number;

  const bVal = parseFloat(balanceValue);

  const fromWei = bVal / Math.pow(10, tokenDecimalValue);

  if (isPending) return <div>Loading...</div>;

  if (error) {
    const baseError = error as unknown as BaseError;
    return (
      <div>
        Error: {baseError.shortMessage || baseError.message}
      </div>
    );
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
            Balance: {fromWei}
            <w3m-button />
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;