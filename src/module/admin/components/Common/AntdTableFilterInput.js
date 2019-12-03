import React, { Component } from "react";
import { Input, Button, Icon} from 'antd';

class AntdTableFilterInput extends Component {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        table: null,
        columnKey: null
    }
    state = {
        filterDropdownVisible: false,
        filtered: false,
        searchText: null
    }

    static onFilterDropdownVisibleChange(visible, instance, filterInput) {
        filterInput && filterInput.setState({
                filterDropdownVisible: visible,
            }, () => {
                filterInput.searchInput && filterInput.searchInput.focus()
                instance.setState({
                    updated: 1
                })
            }
        );
    }
    componentDidMount() {

    }

    componentDidUpdate() {
        // console.log('Updated')
        this.searchInput && this.searchInput.focus()
    }

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }

    onSearch = () => {
        const { searchText } = this.state;
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
        })
        this.props.table.handleFilter({key: this.props.columnKey}, searchText)
    }

    render() {
        return (
            <div className="custom-filter-dropdown">
                <Input
                ref={ele => this.searchInput = ele}
                placeholder="Search name"
                value={this.state.searchText}
                onChange={this.onInputChange}
                onPressEnter={this.onSearch}
                />
                <Button type="primary" onClick={this.onSearch}>Search</Button>
            </div>
        );
    }
}

export default AntdTableFilterInput;