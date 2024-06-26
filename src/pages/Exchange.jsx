import { useState } from "react";
import Footer from "../Components/Footer";
import Options from "../Components/Options";
import Navbar from "../Components/Navbar";
import MainForm from "../Components/MainForm";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoadingSpinner.css';

const api_key = '707e91ed-2523-4447-9996-09713cc0f1f1';
const summaryStyle = {
  outline: 'none',
  cursor: 'pointer',
  margin: 0,
};

const Exchange = ({ props }) => {
  const { exchangeInfo, setExchangeInfo } = props;
  const [refundAddress, setRefundAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const navigateTo = useNavigate();

  const handleRefundAddress = (e) => {
    setRefundAddress(e.target.value);
  };

  const handleToAddress = (e) => {
    setToAddress(e.target.value);
  };

  const handleSwap = async () => {
    try {
      setIsLoading(true);
      const url = `https://api.simpleswap.io/create_exchange?api_key=${api_key}`;
      const bodyContent = {
        fixed: false,
        currency_from: exchangeInfo.fromCoin.symbol,
        currency_to: exchangeInfo.toCoin.symbol,
        amount: exchangeInfo.fromCoinAmount,
        address_to: toAddress,
        extra_id_to: ''
      };
      if (refundAddress) {
        bodyContent.user_refund_address = refundAddress;
      }
      const res = await axios.post(url, bodyContent);
      setIsLoading(false);
      if (res.status == 200) {
        navigateTo(`/swap-tgapp/status/${res.data.id}`);
      }
    } catch (error) {
      showAlert();
      setIsLoading(false);
      setAlertContent(error.response.data.description);
      console.error('Error:', error);
    }
  }

  const showAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  return (
    <>
      <>
        <div className="relative">
          <Navbar />
        </div>
        <div className="">
          <Options />
          <div className="bg-white mx-3 rounded-xl">
            <div className="flex justify-center items-center">
              <h1 className="text-black pt-4 font-semibold text-xl">
                Add Exchange Details
              </h1>
            </div>
            <div className="p-4 flex flex-col ">
              <MainForm {...{ exchangeInfo, setExchangeInfo }} />
            </div>
            <div className='shadow-2xl' >
              <div className='mx-4' >
                <div className='mt-1' >
                  <input
                    type="text"
                    value={toAddress}
                    onChange={handleToAddress}
                    placeholder={`The recepients ${exchangeInfo.toCoin.name} address`}
                    className='w-full p-2 ps-3 text-[18px] text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 
                      focus:border-blue-500' />
                </div>
              </div>
              <div className='cursor-pointer rounded-xl h-12 mt-4 mx-4 my-5 flex justify-center'>
                <button
                  onClick={handleSwap}
                  className='w-full p-1 text-center flex justify-center items-center rounded-xl bg-[#0F75FC] hover:bg-[#0F75FC]/60 text-white 
                  text-[18px] font-[500] bold font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
                  Exchange
                </button>
              </div>
              <div className='mb-5' >
                <p className='text-center'>By clicking Create an exchange, I agree to the <a href="" className='text-blue-700 underline ' >Privacy Policy</a> and <a href="" className='text-blue-700 underline ' >Terms of Service</a>. </p>
              </div>
              <details className='mx-8' >
                <summary style={summaryStyle} className="py-2 outline-none flex cursor-pointer">
                  <h1 className='ml-[25%] text-black font-[400] text-[16px]'>Additional Details </h1>
                  <span className=''><IoIosArrowDown size={25} /></span>
                </summary>
                <div className="pb-4">
                  <p className='font-[600] text-[16px]' >Enter the refund address</p>
                  <p className='leading-tight text-[14px] text-gray-600 ' >We recommend adding your wallet address for a refund. </p>
                  <div className='mt-1' >
                    <input
                      type="text"
                      value={refundAddress}
                      onChange={handleRefundAddress}
                      placeholder={`The ${exchangeInfo.fromCoin.name} Refund address`}
                      className='w-full p-2 ps-3 text-[18px] text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 
                      focus:border-blue-500' />
                  </div>
                </div>
              </details>
            </div>

            <div className='text-[16px] font-[600] ml-5 my-5 ' >  <p> Have Any Question </p> </div>
            <div className=' mx-3 rounded-lg mb-5 '>
              <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
                <div className="flex flex-col divide-y  divide-gray-700">
                  <details className='mx-4' >
                    <summary style={summaryStyle} className="py-2 outline-none  flex justify-between cursor-pointer">
                      <h1 className='w-[90%] text-black font-[400] text-[15px] '>What is the recipient's address and where do I get it?</h1>
                      <span className=''><IoIosArrowDown size={25} /></span>
                    </summary>
                    <div className=" pb-4 pt-11 ">
                      You can find the cryptocurrency address in the crypto wallet that you use to keep your coins and tokens. It contains letters and numbers and looks like an alphanumeric string. Cryptocurrencies are based on different blockchains and have their own unique address formats. It’s necessary to provide us with the crypto wallet address, and we’ll send your coins there.
                    </div>
                  </details>
                  <details className='mx-4' >
                    <summary style={summaryStyle} className="py-2 outline-none  flex justify-between cursor-pointer  ">
                      <h1 className='w-[90%] text-black font-[400] text-[15px] '>Why is my recipient address shown as invalid?</h1>
                      <span className=''><IoIosArrowDown size={25} /></span>
                    </summary>
                    <div className="pb-4">
                      <p className='mb-3' >There may be various reasons, including:  </p>
                      <ul className='text-sm ml-[15%] cursor-pointer'>
                        <li><span className='font-bold text-black/80 ' >The spelling of the address.</span> Make sure that the address contains all the necessary auxiliary characters, suffixes, and prefixes (dots, dashes).</li>
                        <li><span className='font-bold text-black/80 ' >Extra spaces.</span> Make sure all address characters have been copied. Сheck there are no spaces at the beginning and end of the address.</li>
                        <li><span className='font-bold text-black/80 ' >Incorrect blockchain.</span> Make sure that the network of the selected coin matches the network your address belongs to.</li>
                        <li><span className='font-bold text-black/80 ' >Some other issues.</span> Feel free to contact our support team which is available 24/7 via email <a href="" className='text-blue-700' > (support@simpleswap.io) </a> or live chat.</li>
                      </ul>
                    </div>
                  </details>
                  <details className='mx-4' >
                    <summary style={summaryStyle} className="py-2 outline-none flex justify-between cursor-pointer  "><h1 className='w-[90%] text-black font-[400] text-[15px]'>How do I get cashback for the exchange on SimpleSwap?</h1><span className=''><IoIosArrowDown size={25} /></span></summary>
                    <div className="pb-4">
                      <p>Log in to your account, swap crypto, and receive cashback for every exchange. If you still don’t have a customer account on SimpleSwap, you are welcome to <a href="" className='text-blue-700 underline ' >sign up!</a></p>
                      <br />
                      <p> Don’t forget to log in to your account every time before creating the exchange as this is the only way to get crypto cashback. Please, read about different types of cashback subscriptions and find the terms and conditions of our Loyalty Program <a href="" className='text-blue-700 underline ' >here.</a> </p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
            {/* </section> */}
          </div>
        </div>
        <Footer />
        <div className={`fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-75 ${isLoading ? '' : 'hidden'}`}>
          <div className="custom-spinner"></div>
        </div>
        {alert && <div class="absolute top-0 right-0 flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">Warning!</span> {alertContent}
          </div>
        </div>}
      </>
    </>
  );
};
export default Exchange;
