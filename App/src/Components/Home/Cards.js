import React, { Component } from 'react'
import { Card, Col, Row, Descriptions, Badge, Empty } from 'antd';

export default class Cards extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (this.props.data.length == 0){
            return (
                <Empty />
            );
        }
        return (
            <div style={{ padding: '30px' }}>
                <Row gutter={16}>
                    {this.props.data.map((value, index) => (
                        <Col key={index} span={8} style={{ marginBottom: '7px' }}>
                            <Card title={value.name} bordered={false}>
                                <Descriptions title="Details">
                                    <Descriptions.Item label="place">{value.place}</Descriptions.Item>
                                    <Descriptions.Item label="Cuisine">{value.cuisine}</Descriptions.Item>
                                    <Descriptions.Item label="Price">{
                                        <Badge count={value.price} style={{ backgroundColor: '#108ee9' }} overflowCount={100000000} />
                                        }</Descriptions.Item>
                                    <Descriptions.Item label="Address">
                                        {value.area}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Comments">
                                        {value.comments}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Col>
                    ))
                    }
                </Row>
            </div>
        )
    }
}