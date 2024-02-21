import Eclipse from "./assets/images/Eclipse-circle-1.webp";
import Content from './components/content';
import Footer from './components/footer';
import Header from './components/header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProps } from "./types/index"
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css';

const queryClient = new QueryClient()

const projectId = import.meta.env.VITE_PROJECT_ID

const metadata = {
  name: 'ERC20 DAPP',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [polygonMumbai] as const

const config = defaultWagmiConfig({
  chains, 
  projectId, 
  metadata, 
  enableWalletConnect: true, 
  enableInjected: true, 
  enableEIP6963: true, 
  enableCoinbase: true,
})


createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true
})


const App: React.FC<AppProps> = ({ children }) => {

  return (
    <WagmiProvider config={config}>
       <ToastContainer />
      <QueryClientProvider client={queryClient}>
        {children}
        <div className="App">
          <div className='banner-eclipse'>
            <img
              className="normal"
              src={Eclipse}
              width="840"
              alt="Blockchainx"
            />
          </div>
          <div className='banner-eclipse-alt'>
            <img
              className="normal"
              src={Eclipse}
              width="840"
              alt="Blockchainx"
            />
          </div>
          <Header />
          <Content />
          <Footer />
        </div>
      </QueryClientProvider>
    </WagmiProvider>

  );
}

export default App;
