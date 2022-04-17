import React, {Component} from "react";
import {Input, Table} from 'antd';
import FungibleTokens from "../../services/FungibleTokens";
import {config} from "../../config";
import {formatNearAmount} from "../../utils/balanceHelpers";
import {formatTokenAmount} from '../../utils/amounts';
import NonFungibleTokens from "../../services/NonFungibleTokens";
import "antd/dist/antd.min.css";
import {walletSimple} from "../../utils/walletSimple";
import {refFinanceTokenPrices} from "../../utils/ref-finance";

const {Search} = Input;
const FRAC_DIGITS = 5;

class Wallet extends Component {
    state = {
        // 用户ft和nft信息
        ft:[],
        nft:[],
    };

    compare = (p) =>{
        return function(m,n){
            const a = m[p];
            const b = n[p];
            return b-a; // 降序
        }
    }

    onSearch = async (accountId) => {
        const likelyContracts = [...new Set([...(await FungibleTokens.getLikelyTokenContracts({accountId})), ...config.WHITELISTED_CONTRACTS])];
        const likelyNFTContracts = await NonFungibleTokens.getLikelyTokenContracts(accountId);
        // 从ref获取价格
        const getTokenPriceFromREF = await refFinanceTokenPrices();

        let result = [];
        // rpc查询near余额
        const nearAccount = await walletSimple.viewAccount(accountId);

        await Promise.all([...likelyContracts.map(async (contractName) => {
            try {
                const balance = await FungibleTokens.getBalanceOf({contractName, accountId});
                // 这可以缓存
                const metadata = await FungibleTokens.getMetadata({contractName});
                let balanceResult;
                if (metadata.symbol === 'NEAR'){
                    balanceResult = balance && formatNearAmount(balance)
                }else {
                    balanceResult = formatTokenAmount(balance, metadata.decimals, FRAC_DIGITS);
                }

                // 币种的元数据信息
                result.push({
                    "contract":contractName,
                    "symbol":metadata.symbol,
                    "decimals":metadata.decimals,
                    "balanceOrigin":balance,
                    "balance":balanceResult
                });
            } catch (e) {
                // Continue loading other likely contracts on failures
                console.warn(`Failed to load FT for ${contractName}`, e);
            }
        }),getTokenPriceFromREF,nearAccount]).then(()=>{
            // 将near放入
            result.push({
                // 这里合约名称用的是WNear，方便后续查价格，目前没有问题
                "contract":"wrap.near",
                "symbol":"NEAR",
                "decimals":24,
                "balanceOrigin":nearAccount.amount,
                "balance":formatNearAmount(nearAccount.amount)
            });
            // 写入$价格
            for (const v of result) {
                const USDPrice = getTokenPriceFromREF[v.contract];
                if (USDPrice !== undefined){
                    v.usdPrice = USDPrice.price;
                    v.totalUsdPrice = USDPrice.price * v.balance;
                }else {
                    v.usdPrice = "未从ref获取单价："+v.contract;
                }
            }
            // 排序
            result.sort(this.compare("totalUsdPrice"));
            this.setState({ft:result})
        });

        let NFTResult = [];
        await Promise.all(likelyNFTContracts.map(async (contractName) => {
            try {
                const metadata = await NonFungibleTokens.getMetadata(contractName);
                // 币种的元数据信息
                NFTResult.push({
                    "spec":metadata.spec,
                    "name":metadata.name,
                    "symbol":metadata.symbol,
                    "base_uri":metadata.base_uri,
                    "icon":metadata.icon,
                    "reference":metadata.reference,
                    "reference_hash":metadata.reference_hash,
                });
            } catch (e) {
                // Continue loading other likely contracts on failures
                console.warn(`Failed to load NFT for ${contractName}`, e);
            }
        })).then(()=>{
            // alert(JSON.stringify(NFTResult))
            this.setState({nft:NFTResult})
        })

    }

    render() {
        const ft_columns = [
            {
                title: '合约简称',
                dataIndex: 'symbol',
                key: "symbol",
            },
            {
                title: '用户余额(个)',
                dataIndex: 'balance',
            },
            {
                title: '单价($)',
                dataIndex: 'usdPrice',
            },
            {
                title: '总价($)',
                dataIndex: 'totalUsdPrice',
            },
            {
                title: '合约地址',
                dataIndex: 'contract',
            },
        ];
        const nft_columns = [
            {
                title: 'nft名称',
                dataIndex: 'name',
                key: "name",
            },
            {
                title: 'nft符号',
                dataIndex: 'symbol',
                key: "symbol",
            },
            {
                title: 'spec',
                dataIndex: 'spec',
                key: "spec",
            },
        ];
        return (
            <div>
                <h1 align="center">Wallet页面</h1>
                <Search
                    placeholder="account-id"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={(value) => this.onSearch(value)}
                />
                <div>
                    <Table dataSource={this.state.ft} columns={ft_columns} rowKey="symbol" />
                </div>
                <div>
                    <Table dataSource={this.state.nft} columns={nft_columns} rowKey="name" />
                </div>
            </div>);
    }
}

export default Wallet;