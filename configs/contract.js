import ItemAuction from './ItemAuction.json';
import ItemToken from './ItemToken.json';

const ContractConfig = {
  auction: {
    address: '0xae8641eeDb80F335b689D2229B47eF824054b304',
    abi: ItemAuction.abi,
  },
  token: {
    address: '0xd3de050B8104cB291C1C10c54bAECaDF449b6E49',
    abi: ItemToken.abi,
  },
};
export default ContractConfig;
