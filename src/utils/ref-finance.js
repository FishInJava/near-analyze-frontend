import {config} from "../config";
import {sendJson} from "./tmp_fetch_send_json";

export const refFinanceTokenPrices = async () => {
  try {
    return sendJson('GET', config.REF_FINANCE_API_ENDPOINT + '/list-token-price');
  } catch (error) {
    console.error(`Failed to fetch token prices: ${error}`);
    return {};
  }
};

