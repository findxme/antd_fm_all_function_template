import React, {Component } from 'react';
import MeTableCtrl from './MeTableCtrl';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = { table:[] }
    }
    render() { 
        const {fdid} =this.props
        return ( 
        <div>
            <MeTableCtrl fdid= {fdid}/>
        </div> );
    }
}
 
export default index;


