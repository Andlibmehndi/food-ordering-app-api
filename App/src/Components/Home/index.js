import React, { Component } from 'react';
import Cards from './Cards';
import axios from 'axios';
import { message, Input, Row, Col, Button } from "antd";
import {orderBy} from 'lodash'
import Select from 'react-select';

const { Search } = Input;

const optionsSort = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
];


const FilterCuisine = [
    { value: 'Mexicana', label: 'Mexicana' },
    { value: 'Italiana', label: 'Italiana' }
];

const FilterName = [
    { value: "Havmor", label: 'Havmor' },
    { value: "TGB", label: 'TGB' },
    { value: "FreezLand", label: 'FreezLand' },
    { value: "Macdonal", label: 'Macdonal' },
    { value: "WaterSide", label: 'WaterSide' }
];

const FilterPlace = [
    { value: "Bodakdev", label: 'Bodakdev' },
    { value: "Ambavadi", label: 'Ambavadi' }
];

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            records: [],
            selectedOption: optionsSort[0],
            placeFilter:null,
            nameFilter:null,
            cuisineFilter:null
        }
    }

    handleSearch = (value) => {
        if (value !== '') {
            this.getApiCall(value);
        } else {
            this.getApiCall();
        }
    }

    handleSortChange = (selectedOption) => {
        this.setState({ selectedOption });
        this.sortRecord(selectedOption.value)
    };

    handlePlaceChange = (placeFilter) => {
        this.setState({ placeFilter });
        const filterInput = this.prepareFilter(this.state.cuisineFilter?.value, placeFilter.value, this.state.nameFilter?.value);
        this.getFilterCall(filterInput)
    };

    handleCuisineChange = (cuisineFilter) => {
        this.setState({ cuisineFilter });
        const filterInput = this.prepareFilter(cuisineFilter.value, this.state.placeFilter?.value, this.state.nameFilter?.value);
        this.getFilterCall(filterInput)
    };

    handleNameChange = (nameFilter) => {
        this.setState({ nameFilter });
        const filterInput = this.prepareFilter(this.state.cuisineFilter?.value, this.state.placeFilter?.value, nameFilter.value);
        this.getFilterCall(filterInput)
    };

    prepareFilter = (cuisineValue, placeValue, nameValue) =>{
        return {
            ...(cuisineValue!==null)&& {cuisine: cuisineValue},
            ...(placeValue!==null)&& {place: placeValue},
            ...(nameValue!==null)&& {name: nameValue}
        }
    }

    getToken = () => {
        let header = null;
        if(localStorage.getItem('login')){
            return header = {
                Authorization: JSON.parse(localStorage.getItem('login')).token
            }
        }
        return header;
    }

    getApiCall = (searchValue = null) => {
        axios.get(`http://localhost:4000/search/${searchValue !== null ? searchValue : ''}`, {headers: this.getToken()})
            .then(res => {
                if (res.status === 200 && res.data.success) {
                    this.setState({ records: res.data.record })
                    this.sortRecord(this.state.selectedOption.value)
                } else {
                    message.error('Something Went Wrong....');
                }
            })
            .catch(error => {
                message.error('Something Went Wrong....');
                console.log(error)
            })
    }

    getFilterCall = (filterValue) => {
        axios.post('http://localhost:4000/filter', {...filterValue},  {headers:this.getToken()})
            .then(res => {
                if (res.status === 200 && res.data.success) {
                    this.setState({ records: res.data.record })
                    this.sortRecord(this.state.selectedOption.value)
                } else {
                    message.error('Something Went Wrong....');
                }
            })
            .catch(error => {
                message.error('Something Went Wrong....');
                console.log(error)
            })
    }

    componentDidMount() {
        if(localStorage.getItem('login')){
            this.getApiCall();
        }else{
            this.handleLogOut();
        }
       
    }

    sortRecord = (value) =>{
        const newRecords = orderBy(this.state.records, ['price'], [value]);
        this.setState({ records: newRecords })
    }

    handleLogOut =()=>{
        localStorage.clear();
        this.props.history.push('/')
    }


    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px', height: '100vH' }}>
                <div style={{paddingBottom: '10px'}}><Button type="primary" icon="logout" onClick={this.handleLogOut} >LogOut</Button></div>
                <div>
                    <Search placeholder="input search text" onSearch={this.handleSearch} enterButton />
                </div>
                <div style={{ marginTop: '10px', marginBottom:"25px" }}>
                    <Row type="flex" justify="space-around">
                        <Col span={6}>Sorting: <Select
                            value={this.state.selectedOption}
                            onChange={this.handleSortChange}
                            options={optionsSort}

                        /></Col>
                        <Col span={6}>FilterName: <Select
                            value={this.state.nameFilter}
                            onChange={this.handleNameChange}
                            options={FilterName}
                        /></Col>
                        <Col span={6}>FilterPlace: <Select
                            value={this.state.placeFilter}
                            onChange={this.handlePlaceChange}
                            options={FilterPlace}
                        /></Col>
                        <Col span={6}>FilterCuisine: <Select
                            value={this.state.cuisineFilter}
                            onChange={this.handleCuisineChange}
                            options={FilterCuisine}
                        /></Col>
                    </Row>

                </div>
                <Cards data={this.state.records} />
            </div>
        )
    }
}

export default Home
