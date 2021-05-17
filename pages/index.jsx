import { Web3Provider } from '@ethersproject/providers';
import {
  Button,
  Card, CardContent, Container, Grid, TextField,
} from '@material-ui/core';
import { Web3ReactProvider } from '@web3-react/core';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import Number from '../components/Number';
import ContractConfig from '../configs/contract';

const Home = () => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(100);
  const [connected, setConnected] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const makeArray = (_from, _to) => {
    const result = [];
    for (let i = _from; i <= _to; i += 1) {
      result.push(i);
    }
    return result;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(window);
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
      }
    })();
  }, [web3]);

  const getLibrary = (_provider) => new Web3Provider(_provider);

  const handleFromChange = (e) => {
    setFrom(() => parseInt(e.target.value, 10) + 0);
  };

  const handleToChange = (e) => {
    setTo(() => parseInt(e.target.value, 10) + 0);
  };

  const handleWalletConnect = async () => {
    const providerOptions = {
      /* See Provider Options Section */
    };

    const web3Modal = new Web3Modal({
      network: 'http://localhost:8545', // optional
      cacheProvider: false, // optional
      providerOptions, // required
    });
    const provider = await web3Modal.connect();
    provider.on('accountsChanged', async () => {
      setAccounts(await web3.eth.getAccounts());
    });
    setAccounts(await web3.eth.getAccounts());
  };

  const handleMint = async () => {
    if (window.ethereum.selectedAddress) {
      const contract = new web3.eth.Contract(ContractConfig.token.abi, ContractConfig.token.address);
      const token = await contract.methods.award(window.ethereum.selectedAddress).send({
        from: window.ethereum.selectedAddress,
      });
      console.log(token);
    }
  };

  return (
    <Container>
      <Head>
        <title>Number Auction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Card>
          <CardContent>
            <TextField label="From" value={from} onChange={handleFromChange} />
            <TextField label="To" value={to} onChange={handleToChange} />
            <Button variant="contained" color="primary" onClick={handleWalletConnect} disabled={accounts.length > 0}>
              {accounts.length > 0 ? window.ethereum.selectedAddress : 'Connect' }
            </Button>
          </CardContent>
        </Card>
        <Grid container direction="row" spacing={2}>
          {makeArray(from, to).map((value) => (
            <Grid item xs={6} md={4} key={value}>
              <Number value={value} key={value} onMint={handleMint} />
            </Grid>
          ))}
        </Grid>
      </Web3ReactProvider>
    </Container>
  );
};

export default Home;
