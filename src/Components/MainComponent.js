import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button ,Input,Modal,ModalHeader,ModalBody} from 'reactstrap';
import styled, { css } from 'styled-components';

import {deleteImage, changeSearchModal, changeSModal, addImage} from '../redux/ActionImages';
import SearchImage from './SearchComponent';
import AddImage from './SelectImageComponent';


const mapStateToProps = state => {
    return {
      Images: state.Images
      
    }
    
  }

  const mapDispatchToProps = (dispatch) => ({
    deleteImage: (Image,isAll) => dispatch(deleteImage(Image,isAll)), 
    changeSModal :() => dispatch(changeSModal()),
    changeSearchModal :() => dispatch(changeSearchModal()),
    addImage : (images) => dispatch(addImage(images))
  });

class Main extends Component {
    componentDidMount(){
      localStorage.setItem("isSelectedModalOpen",false);
    }
    constructor(props) {
        super(props);
        this.state = {
           sortby:"name",
           b1:"green",
           b2:"white",
           b3:"white",
           delArray:[],
           isAll:false,
           isNavOpen: false,
           search:""
        };
        
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleDeleteAll = this.handleDeleteAll.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleErase = this.handleErase.bind(this); 
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.checkSearch = this.checkSearch.bind(this);
        this.toggleSearchModal = this.toggleSearchModal.bind(this);
      }
    handleTitleChange =(e)=>{
      this.setState({
        sortby:"name",b1:"green",b2:"white",b3:"white"
       });
      
    }
    handleDateChange =(e)=>{
       this.setState({ sortby:"created_at",b2:"green",b1:"white",b3:"white"})
    }
    handleSizeChange =(e)=>{
       this.setState({
         sortby:"size",b3:"green",b2:"white",b1:"white"
        })
    }
    handleDeleteAll =() =>{
      this.setState({
        isAll:!this.state.isAll,
      })
    }
    handleDelete = (item) =>{
      this.setState({
        delArray:this.state.delArray.indexOf(item)!=-1?this.state.delArray.filter((id) => id !== item):[...this.state.delArray,item]
      })
    }
    handleErase =() =>{
      this.setState({
        delArray:[]
      })
    }
    handleRemove = () =>{
        if(this.state.isAll){
          this.setState({
            isAll:!this
          },() =>{this.props.deleteImage("",true)})
        }
        else{
           this.state.delArray.map((item)=>{
             this.props.deleteImage(item,false);
           })
        }
    }
    handleSearch(e){
      this.setState({
        search:e.target.value
      });
    }
   checkSearch(item) {
      return  (this.state.search==""||item.name.indexOf(this.state.search)!=-1 );
   }
    toggleSearchModal() {
      this.props.changeSearchModal();
    }
    toggleSelectedModal() {
      this.props.changeSModal();
    }
      render() {

        const Button1 = styled.button`
        background: transparent;
        border-radius: 3px;
        border: 2px solid palevioletred;
        color: palevioletred;
        margin: 0.5em 1em;
        padding: 0.25em 1em;
      
        ${props => props.primary && css`
          background: palevioletred;
          color: white;
        `}
      `;
      
      const Container = styled.div`
        text-align: center;
      `
          return( 
              
              <React.Fragment>
                <div className="container" >
                    <div>
                    
                      <h3 className="heading1">Media library </h3><br></br>
                      <h5 className="heading2">Create, edit, and manage the media on your community.</h5>
                      <Button className="button1" onClick={()=>this.toggleSearchModal()} >
                          <b classname="text1">Add image</b>
                      </Button>
                    </div>
                    <div className="rectangle1">
                        <Input type="checkbox" className="checkbox" onClick={this.handleDeleteAll} checked={this.state.isAll}/>
                        <b className="text2">Select All</b>
                        <div className="rectangle3">
                          <div className="delete" onClick={()=>this.handleRemove()}>
                              <span className="fa fa-trash"></span>
                          </div>
                          <div className="clear" onClick={()=>this.handleErase()}>
                            <span className="fa fa-eraser"></span>
                          </div>
                          <div className="search_div">
                              
                          <span className="fa fa-search"> </span> {" "}
                          <input className="input1" type="text" placeholder="Search Media" onChange={this.handleSearch}></input>
                          </div>
                        </div>
                        
                        <div className="rectangle2">
                          <b className="text3">Sort By</b>
                          <div className="rectangle4"></div>
                          <Button1 style={{backgroundColor: this.state.b1}} className="b1" onClick={this.handleTitleChange} id="b1" >Title</Button1> 
                          <Button1 style={{backgroundColor: this.state.b2}}  className="b2" onClick={this.handleDateChange} id="b2">Date</Button1>
                          <Button1 style={{backgroundColor: this.state.b3}} className="b3" onClick={this.handleSizeChange} id="b3">Size</Button1>
                        </div>
                    </div>
                    <div className="images_div">
                        <div className="col-12">
                            <div className="d-flex flex-wrap ">
                                {
                                  
                                  this.props.Images.images.sort((a, b) => {
                                    if(this.state.sortby!=="size"){
                                    let fa = a[this.state.sortby].toLowerCase(),
                                        fb = b[this.state.sortby].toLowerCase();
                                
                                    return fa.localeCompare(fb);
                                    }
                                    else{
                                      let w1=parseInt(a.width);
                                      let h1=parseInt(a.height);
                                      let w2=parseInt(b.width);
                                      let h2=parseInt(b.height);
                                      if(w1*h1>w2*h2)return 1;
                                      else if(w1*h1<w2*h2) return -1;
                                      else 
                                      return 0;
                                    }
                                  }),
                                  this.props.Images.images.filter(this.checkSearch).map((item) => {
                                    return (
                                            <div>
                                            
                                            <div className="image_box" m-5>
                                            <Input type="checkbox" className="deletebox" 
                                              onClick={()=>this.handleDelete(item.id+"|"+item.name)}
                                              checked={this.state.isAll||this.state.delArray.indexOf(item.id+"|"+item.name)!=-1}/>
                                                <img src={item.urls.small} className="images"></img>
                                            </div>
                                            {item.name}
                                            </div>
                                    )
                                    })
                                }
                            </div>
                      </div>
                    </div>
                </div>
                <Modal size="lg" style={{maxWidth: '920px', width: '100%'}} isOpen={this.props.Images.isSearchModalOpen} 
                       toggle={()=>this.toggleSearchModal()}>
                    <ModalHeader toggle={()=>this.toggleSearchModal()}>Select Image</ModalHeader>
                    <ModalBody>
                      <SearchImage changeSearchModal={this.props.changeSearchModal}
                                   changeSModal={this.props.changeSModal} 
                                   Images={this.props.Images}>
                       </SearchImage>
                    </ModalBody>
                </Modal>
                <Modal size="lg" style={{maxWidth: '500px', width: '100%'}} isOpen={this.props.Images.isSelectedModalOpen} 
                       toggle={()=>this.toggleSelectedModal()}>
                    <ModalHeader toggle={()=>this.toggleSelectedModal()}>Select Image</ModalHeader>
                    <ModalBody>
                      <AddImage changeSModal={this.props.changeSModal} 
                                addImage = {this.props.addImage} images={this.props.Images.images} >
                      </AddImage>
                    </ModalBody>
                </Modal>
            </React.Fragment>
          );
          
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);