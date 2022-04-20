import {config} from "../config";

export const getTransactionInfoUrl = (hash) => config.explorer_url + 'transactions/' + hash;

