import React from "react";
import styled from 'styled-components';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import FA from 'react-fontawesome';
import axios from 'axios';

export default class Network extends React.Component {

    state = {
        loading: true,
    }

    componentDidMount() {
        const { network } = this.props.match.params;

        axios.get(`${apiHolders}/api/v1/holders/${network}`)
            .then(res => {
                const { holders } = res.data;
                // Add name to show on piechart
                holders.forEach(holder => holder.name = holder.address);

                this.setState({ holders, loading: false });
            })
    }

    get network() {
        const network = this.props.match.params.network;
        return network.toUpperCase();
    }

    get summ() {
        if (this.state.holders) {
            const summ = this.state.holders.reduce((sum, item) => {
                return sum + item.tokens;
            }, 0);

            return (
                <Info>
                    {summ}
                    <br />
                    TOTAL
                </Info>
            );
        }
    }

    get labels() {
        return (
            <Tokens>
                <Table>
                    <thead>
                        <tr>
                            <Cells>Address</Cells>
                            <Cells>Tokens</Cells>
                            <Cells>%</Cells>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.holders.map((item, idx) => {
                            return (
                                <tr key={idx}>
                                    <CellItem>{item.address}</CellItem>
                                    <CellItem>{item.tokens}</CellItem>
                                    <CellItem>{item.stake}</CellItem>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Tokens>
        );
    }

    render() {
        if (this.state.loading) {
            return (
                <Wrap>
                    <LoadingWrap>
                        <FA name="spinner" size="4x" spin />
                    </LoadingWrap>
                </Wrap>
            )
        }

        return (
            <Wrap>
                <Title>
                    <h3>{this.network} Network Holders</h3>
                </Title>
                <Inner>
                    <Charter>
                        {this.summ}
                        <PieChart width={300} height={300}>
                            <Pie
                                data={this.state.holders}
                                dataKey={"tokens"}
                                innerRadius={80}
                                labelLine={false}
                                outerRadius={120} fill="#82ca9d">
                            </Pie >
                            <Tooltip />
                        </PieChart>
                    </Charter>
                    {this.labels}
                </Inner>
            </Wrap>
        )
    }
}

const Wrap = styled.div`
    background-color: #FFFFFF;
    width: 65rem;
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
    top: 130px;
    text-align: center;
`;

const Tokens = styled.div`
    width: 100%;
    border: 1px solid #DFE0E1;
    padding:10px;
    margin-right: 15px;
    margin-bottom: 15px;
    border-radius: 10px;
`;

const Table = styled.table`
    width: 100%;
`;

const Cells = styled.td`
    padding: 6px;
    font-size: 12px;
`;

const CellItem = styled(Cells)`
    border-top: 1px solid #DFE0E1;
`;

const LoadingWrap = styled.div`
    height: 400px;
    text-align: center;
    padding-top: 200px;
`;

const Inner = styled.div`
    display: flex;
`;