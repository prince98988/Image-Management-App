import { Component } from "react";
import { Button} from "reactstrap";

class AddImage extends Component{
    constructor(props) {
        super(props);
        this.state = {
           name:"",
           item:JSON.parse(localStorage.getItem("shared_image"))
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(){
        var images=this.props.images;
        var image=this.state.item;
        image.name=this.state.name;
        images.push(this.state.item);
        this.props.addImage(images);
        this.props.changeSModal();
    }
    handleChange(e){
        this.setState({
            name:e.target.value
        })
    }
    render(){
        return (
            <div >
                <h5 className="heading_search">Edit your media files here</h5>
                <div className="image_back">
                    <div className="row justify-content-center m-2 addimage" >
                       <img src={this.state.item.urls.full} className="addimage"></img>
                   </div>
                   <div className="row">
                       <div className="col-sm-5 offset-sm-1">
                           <b className="text4">Title</b>
                       </div>
                       <div className="col-sm-2">
                       <b className="text4">Dimensions</b>
                       </div>
                   </div>
                   
                   <div className="row">
                       <div className="col-sm-5 offset-sm-1">
                           <input className="input3" placeholder="TItle" onChange={this.handleChange} minLength="1" maxLength="128"></input>
                       </div>
                       <div className="col-sm-2">
                       <b className="text4">{this.state.item.width}×{this.state.item.height}</b>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-sm-10 offset-sm-9 addButton">
                          <Button color="primary" onClick={()=>this.handleSubmit()} 
                          disabled={this.state.name.length>0&&this.state.name.length<129?false:true}><b >Submit</b></Button>
                       </div>
                   </div>
                </div>
            </div>
        )
    }
}

export default AddImage;