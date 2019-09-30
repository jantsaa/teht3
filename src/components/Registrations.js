import React,{Component} from 'react';
import {Table,ButtonToolbar,Button} from 'react-bootstrap';
import {AddRegistration} from './AddRegistration';



export class Registrations extends Component {

    constructor(props) {
        super(props);
        this.state={regs : [], addModalShow:false}
    }

    componentWillMount() {
        this.refreshList();
    }

    refreshList() {
        //tämä päivittää näytön myös
        this.setState({regs: [{id:1,first:'Matti', last:'Möttönen',age:44},
        {id:2,first:'Aku', last:'Ankka',age:54}]})
        //tähän fetch
    }

    render() {
        const {regs} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false})
        return (
            <div>
              <ButtonToolbar>
              <Button
                variant='primary'
                onClick={()=>this.setState({addModalShow:true})}
                >Add Registration</Button>
                <AddRegistration
                show={this.state.addModalShow}
                onHide={addModalClose}
                />
            </ButtonToolbar>
               <Table>
                   <thead>
                    <tr>
                        <th>Id</th>
                        <th>First</th>
                        <th>Last</th>
                        <th>Age</th>
                    </tr>
                   </thead>
                   <tbody>
                    
                    {regs.map(reg=>
                        <tr>
                        <td>{reg.id}</td>
                        <td>{reg.first}</td>
                        <td>{reg.last}</td>
                        <td>{reg.age}</td>
                        </tr>
                    )
                    }
                       

                   </tbody>
               </Table> 
            </div>
        )
    }
}

export default Registrations