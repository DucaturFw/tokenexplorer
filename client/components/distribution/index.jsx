import React from "react";
import styled from 'styled-components';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import eth from './eth.png';
import eos from './eos.png';
import neo from './neo.png';
import ada from './ada.png';
import bitcoin from './bitcoin.png';

const data = [
    { name: 'EOS', value: 2400, src: eos },
    { name: 'ETH', value: 4567, src: eth },
    { name: 'NEO', value: 1398, src: neo },
    { name: 'ADA', value: 9800, src: ada }
];
const COLORS = ["#8C8C8C", "#44C5FF", "#B8E82C", "#4561FF"];

export default class Distribution extends React.Component {

    get labels() {
        return data.map((item, idx) => {
            return (
                <Item key={idx}>
                    <img src={item.src} />
                    <br />
                    <Label color={COLORS[idx]} />
                    <span>{item.name}</span>
                    <p>{item.value}</p>
                </Item>
            )
        })
    }

    render() {
        return (
            <Wrap>
                <Title>
                    <h3>DISTRIBUTION OF TOKENS</h3>
                </Title>
                <Charter>
                    <Info>
                        <BTC src={bitcoin} />
                        256.8
                        <br />
                        BTC TOTAL
                    </Info>
                    <PieChart width={250} height={250}>
                        <Pie
                            data={data}
                            dataKey={"value"}
                            innerRadius={80}
                            labelLine={false}
                            outerRadius={120} fill="#82ca9d">
                            {
                                data.map((entry, index) => <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie >
                        <Tooltip />
                    </PieChart>
                </Charter>
                <Tokens>
                    {this.labels}
                </Tokens>
                <Exchange >
                    <Exchangebutton>
                        Exchange
                    </Exchangebutton>
                </Exchange >
            </Wrap>
        )
    }
}
const Wrap = styled.div`
    background-color: #FFFFFF;
    width:50rem;;
    border-radius: 10px;
`;

const Title = styled.div`
    border-bottom: solid rgba(40, 47, 54, 0.15);
    padding: 15px;
    margin-bottom: 20px;
    text-align: center;
`;

const Charter = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
`;

const Info = styled.div`
    position: absolute;
    top: 110px;
    text-align: center;
`;

const BTC = styled.img`
    height: 20px;
`;

const Tokens = styled.div`
    display: flex;
    justify-content: space-around;
`;

const Item = styled.div`
    text-align: center;
`;

const Label = styled.span`
    display: inline-block;
    width: 12px;
    height: 12px;
    background: ${props => props.color ? props.color : 'white'};
    border-radius: 50%;
    margin-top: -3px;
    margin-right: 5px;
`;

const Exchangebutton = styled.button`
    background: #475FF2;
    border-radius: 5px;
    font-size: 18px;
    height:40px;
    width:130px;
    color: #FFFFFF;
    cursor: pointer;
`;

const Exchange = styled.div`
    text-align: center;
    padding: 20px;
`;