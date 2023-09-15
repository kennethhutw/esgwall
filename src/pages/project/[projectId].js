
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectID } from "bson";
import clientPromise from "../../../lib/mongodb";
import { AppLayout } from "../../components/AppLayout";
import { PublicLayout } from "../../components/PublicLayout";
import { getAppProps } from '../../utils/getAppProps';
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import Router from 'next/router'; import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance, useContractWrite, usePrepareContractWrite
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Loader, WalletOptionsModal } from "../../components";
import { v4 } from 'uuid';
import { useForm } from "react-hook-form";
import * as openpgp from 'openpgp';
import { getNewSessionId } from "../../utils/getNewSessionId";

async function createCryptoPayment(inputAmount) {

  try {
    const url = 'https://api-sandbox.circle.com/v1/paymentIntents';

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer QVBJX0tFWTplNWI0YmY0NzVkOGM5MTYyNDNhZWFjOWE5Y2I3YTFhMDo3MTQ3MDgzZmRhYTVkODQ0OWI2ZDAyM2VlOTkwMjE1Ng=='
      },
      body: JSON.stringify({
        amount: { amount: inputAmount, currency: 'USD' },
        idempotencyKey: v4(),
        settlementCurrency: 'USD',
        paymentMethods: [{ type: 'blockchain', chain: 'ETH' }],
        merchantWalletId: '1011979511'
      })
    };



    const response = await fetch(url, options);
    const res = await response.json();

    return res;
  } catch (e) {
    console.error("payment =========", e)
  }
}


async function getCryptoPayment(id) {


  const url = `https://api-sandbox.circle.com/v1/paymentIntents/${id}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer QVBJX0tFWTplNWI0YmY0NzVkOGM5MTYyNDNhZWFjOWE5Y2I3YTFhMDo3MTQ3MDgzZmRhYTVkODQ0OWI2ZDAyM2VlOTkwMjE1Ng=='
    }
  };
  const response = await fetch(url, options);
  const res = await response.json();

  return res.data
}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: 'Bearer QVBJX0tFWTplNWI0YmY0NzVkOGM5MTYyNDNhZWFjOWE5Y2I3YTFhMDo3MTQ3MDgzZmRhYTVkODQ0OWI2ZDAyM2VlOTkwMjE1Ng=='
  }
};
export default function Project(props) {

  // form 
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const router = useRouter();

  const [sdgs, setSDGs] = useState([]);
  const [generating, setGenerating] = useState(false);

  const [abi, setABI] = useState();
  const [amount, setAmount] = useState('1.0');
  const [paymentAmount, setPaymentAmount] = useState("0");
  const [paymentInten, setPaymentIntent] = useState();
  const [paymentIntenId, setPaymentIntentId] = useState();
  const [paymentAddress, setPaymentAddress] = useState("0xea74ea71a93c9b3567cd868aca7b0fe495e28636");


  useEffect(() => {

    if (props) {
      const _sdgs = props.sdgs.split(",");
      setSDGs(_sdgs);

    }
    async function getUSDCABI() {
      const res = await fetch(`/api/abi`);
      const Artifact = await res.json();
      setABI(Artifact.abi);
    }
    getUSDCABI();

    console.log("isConnected========", isConnected)
  }, []);

  const [showWalletOptions, setShowWalletOptions] = useState(false);

  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })



  //step 1:

  async function createCryptoPaymentAndGetPaymentAddress() {
    try {
      console.log("amount========", amount)
      const _paymentInten = await createCryptoPayment(amount);
      setPaymentIntent(_paymentInten);
      if (_paymentInten.data) {
        setPaymentIntentId(_paymentInten.data.id);
        if (paymentIntenId) {
          const _payment = await getCryptoPayment(paymentIntenId);
          console.log("_payment?.data ===========", _payment.data)
          if (_payment.data) {
            const _paymentAddress = _payment?.data.paymentMethods[0].address;
            setPaymentAddress(_paymentAddress);
            const _paymentAmount = (parseFloat(amount) * 1000000).toString();
            setPaymentAmount(_paymentAmount);
          }
        }
      }

    } catch (error) {
      console.error("error ==========", error);
    }

  }

  const { config } = usePrepareContractWrite({
    address: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
    abi: abi,
    functionName: 'transfer',
    args: [
      paymentAddress,
      paymentAmount
    ]
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  const { disconnect } = useDisconnect()
  async function makePayment(e) {
    e.preventDefault()
    await createCryptoPaymentAndGetPaymentAddress();
    console.log("paymentIntenId====", paymentIntenId);
    if (paymentIntenId) {
      const _payment = await getCryptoPayment(paymentIntenId);

      const _paymentAddress = _payment.paymentMethods[0].address;
      setPaymentAddress(_paymentAddress);
      const _paymentAmount = (parseFloat(amount) * 1000000).toString();
      setPaymentAmount(_paymentAmount);

      write?.({
        args: [paymentAddress,
          _paymentAmount]
      });
    }
  }

  //creditcard 
  const [cardId, setCardId] = useState('28c5d70f-0a54-4fd1-85ca-618869c9ce56');
  async function onCreatePayment(data, e) {
    try {

      e.preventDefault();

      const sessionId = getNewSessionId();
      const url = 'https://api-sandbox.circle.com/v1/payments';

      const cardDetails = {
        cvv: data.cvv
      };


      const publicKey = await fetch('https://api-sandbox.circle.com/v1/encryption/public', options);

      const _pubKey = await publicKey.json();
      const message = await openpgp.createMessage({ text: JSON.stringify(cardDetails) })
      const decodedPublicKey = await openpgp.readKey({ armoredKey: window.atob(_pubKey.data.publicKey) })
      const encryptedData = await openpgp.encrypt({ message, encryptionKeys: decodedPublicKey })

      const paymentOptions = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer QVBJX0tFWTplNWI0YmY0NzVkOGM5MTYyNDNhZWFjOWE5Y2I3YTFhMDo3MTQ3MDgzZmRhYTVkODQ0OWI2ZDAyM2VlOTkwMjE1Ng=='
        },
        body: JSON.stringify({
          metadata: {
            email: 'kenneth.hu@hotmail.com',
            sessionId: sessionId,
            ipAddress: '244.28.239.130'
          },
          amount: { currency: 'USD', amount: data.amount.toString() },
          autoCapture: true,
          verification: 'cvv',
          source: { type: 'card', id: cardId },
          idempotencyKey: v4(),
          keyId: 'key1',
          description: data.description,
          encryptedData: window.btoa(encryptedData)
        })
      };

      const response = await fetch(url, paymentOptions);
      const res = await response.json();

      const responseCard = await fetch('/api/transaction/tx', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          txId: res.data.id,
          cardId: cardId,
          email: res.data.metadata?.email,
          merchantId: res.data.merchantId,
          merchantWalletId: res.data.merchantWalletId,
          status: res.data.status,
          updateDate: res.data.createDate,
          amount: data.amount,
          currency: res.data.amount.currency
        })
      })

    } catch (error) {
      console.error("Create Card failed", error);
    }
  }


  return (
    <div className="h-full  mt-20 ">
      {!!generating && (
        <div className="text-slate-800 h-full w-full flex flex-col animate-pulse justify-center items-center">
          <FontAwesomeIcon icon={faBlog} className="text-8xl"></FontAwesomeIcon>
          <h6>loading....</h6>
        </div>
      )}
      <div className="grid grid-cols-[1fr_500px] h-screen justify-center items-centerx">
        {!generating && (
          <div className="max-w-3xl mx-auto bg-white p-8">
            <section className="bg-gray-300 rounded-lg px-6 py-8 mb-8">
              <Image className="rounded w-full h-auto" width="0"
                height="0"
                sizes="100vw"
                src={`${props.image}`} alt="" />
            </section>
            <section className="bg-gray-300 rounded-lg px-6 py-8 mb-8">
              <span className="text-gray-800 text-lg font-bold mb-4">Topic :</span>
              <p className=" text-gray-800 text-2xl">{props.topic}</p>

            </section>

            <section className="bg-gray-300 rounded-lg px-6 py-8 mb-8">
              <span className="text-gray-800 text-lg font-bold mb-4">Content :</span>
              <div className="text-gray-800 mb-4" dangerouslySetInnerHTML={{ __html: props.description }}></div>
            </section>

            <section className="my-4">
              <h2 className="text-gray-800 text-lg font-bold mb-4"> In support of SDGs:</h2>
              <div className="flex flex-wrap gap-2">

                {props.sdgs.split(',').map((goal, i) => (
                  <Image className="rounded" key={i} width={75}
                    height={75} src={`/icons/E-WEB-Goal-${goal}.png`} alt="" />

                ))}
              </div>
            </section>

          </div>
        )}

        <div className="flex flex-col text-block overflow-hidden p-8">

          <div>
            <div className="h2">$10,591</div>
            <div className="body-txt body-txt--small body-txt--no-letter-space bold">raised from 78 donors</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
            </div>

            <span className="body-txt body-txt--small body-txt--no-letter-space bold">45% of $10,000</span>
          </div>

          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-medium text-white dark:text-white bg-blue-700 p-4">USDC Donation</h5>
              <ul className="grid w-full gap-6 md:grid-cols-2">
                <li>
                  <input type="radio" id="usdc-10" name="usdc-amount" value="1" onChange={(e) => {
                    console.log("target =========", e.target); e.preventDefault();
                    setAmount(e.target.value);
                  }} className="hidden peer" ></input>
                  <label htmlFor="usdc-10" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="block">
                      <div className="w-full text-lg font-semibold">$1</div>

                    </div>

                  </label>
                </li>
                <li>
                  <input type="radio" id="usdc-30" name="usdc-amount" value="3" onChange={(e) => { console.log("target =========", e.target); e.preventDefault(); setAmount(e.target.value); }} className="hidden peer"></input>
                  <label htmlFor="usdc-30" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="block">
                      <div className="w-full text-lg font-semibold">$3</div>
                    </div>

                  </label>
                </li>
                <li>
                  <input type="radio" id="usdc-50" name="usdc-amount" value="5" onChange={(e) => { console.log("target =========", e.target); e.preventDefault(); setAmount(e.target.value); }} className="hidden peer"></input>
                  <label htmlFor="usdc-50" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="block">
                      <div className="w-full text-lg font-semibold">$5</div>
                    </div>

                  </label>
                </li>
                <li>
                  <input type="radio" id="usdc-100" name="usdc-amount" value="100" onChange={(e) => { console.log("target =========", e.target); e.preventDefault(); setAmount(e.target.value); }} className="hidden peer"></input>
                  <label htmlFor="usdc-100" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="block">
                      <div className="w-full text-lg font-semibold">$100</div>
                    </div>

                  </label>
                </li>
              </ul>
              <div>
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter donation amount (Minimum $10)</label>
                <input type="number" name="amount" value={amount} id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></input>
              </div>

              {!isConnected && (
                <button
                  loading={isLoading}
                  onClick={() => setShowWalletOptions(true)}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Connect to Wallet
                </button>
              )}


              {!!isConnected && (
                <>
                  <button onClick={async (e) => {
                    e.preventDefault()

                    await makePayment(e);
                  }} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">DONATE TODAY</button>
                  <button onClick={async (e) => {
                    e.preventDefault()

                    await disconnect();
                  }} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">DISCONNECT</button>
                </>
              )}


              {isSuccess && (<>Successful</>)}
            </form>

          </div>


          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mt-10">
            <form className="space-y-6" onSubmit={handleSubmit(onCreatePayment)}>
              <div className="relative z-0 w-full mb-6 group">
                <h3> Credit/Debit Card Payment </h3>
              </div>

              <div>
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter donation amount (Minimum $10)</label>
                <input type="number" name="amount" {...register("amount", { required: true })} id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></input>
              </div>
              <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <input type="text" name="description" {...register("description", { required: true })} id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></input>
              </div>

              <div>
                <label htmlFor="cardNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Card Number</label>
                <input type="text" name="cardNumber" {...register("cardNumber", { required: true })} id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></input>
              </div>

              <div>
                <label htmlFor="input_cvv" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CVV</label>
                <input type="text" name="input_cvv" {...register("cvv", { required: true })} id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></input>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <label htmlFor="input_expiredMonth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expired Month(MM)</label>
                  <input type="text" name="input_expiredMonth" {...register("expiredMonth", { required: true })} id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></input>

                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <label htmlFor="input_expiredYear" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expired Year(YYYY)</label>
                  <input type="text" name="input_expiredYear" {...register("expiredYear", { required: true })} id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></input>


                </div>
              </div>


              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

          </div>
        </div>


      </div>
      <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      />
    </div>
  )
}

Project.getLayout = function getLayout(page, pageProps) {

  if (pageProps.userId != "") {
    return <AppLayout {...pageProps}>{page}</AppLayout>
  } else {
    return <PublicLayout {...pageProps}>{page}</PublicLayout>

  }
}

export const getServerSideProps =
  async function getServerSideProps(ctx) {

    const props = await getAppProps(ctx);
    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    const db = client.db("ContentAI")

    let userId = "";
    if (userSession?.user) {
      //   user= await db.collection("users").findOne({
      //     auth0Id:userSession.user.sub
      // });

      userId = userSession.user.sub;
    }

    const project = await db.collection('projects').findOne({
      _id: new ObjectID(ctx.params.projectId)
    })

    // if(!project){
    //     return {
    //         redirect:{
    //             destination:"/post/new",
    //             permanent:false
    //         }
    //     }
    // }

    return {
      props: {
        id: ctx.params.projectId,
        sdgs: project?.sdgs,
        description: project?.description,
        topic: project?.topic,
        image: project?.image,
        ...props
      }
    }
  }
  ;
