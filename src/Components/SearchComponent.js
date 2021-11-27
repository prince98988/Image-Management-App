import axios from "axios";
import { Component } from "react";



class SearchImage extends Component{


    constructor(props) {
        super(props);
        this.state = {
           search:"",
           photos:[]
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleImageClick = this.handleImageClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSearch(){
      
        const url = "https://api.unsplash.com/search/photos?page=1&query="+this.state.search+"&client_id=SRyaCBe1jjJbOoGO1J0-oStALtYQQaiJXmPYlrE5pkY";
        axios.get(url)
        .then((res)=>{
            this.setState({
                photos:res.data.results
            })
        })
    }
    handleChange(e){
        this.setState({
            search:e.target.value
        })
    }
    handleImageClick(image){
        localStorage.setItem("shared_image",JSON.stringify(image));
        this.props.changeSearchModal();
        this.props.changeSModal();
    }
    render(){

        
        return (
            <div >
                <h5 className="heading_search">Search and select an image</h5>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="search_box">
                            <span className="fa fa-search"> </span> {" "}
                            <input className="input1" type="text" placeholder="Search Media" onChange={this.handleChange} ></input>
                        </div>
                    </div>
                    <div className="col-sm-1">
                       <button className="search_button "><b className="text4"onClick={()=>this.handleSearch()}>Search</b></button>
                    </div>
                </div>
                <div className="image_back">
                    <div className="col-12">
                        <div className="d-flex flex-wrap ">
                            { this.state.photos.map((item) => {
                                return (
                                    <div className="image_box1" m-5 onClick={()=>this.handleImageClick(item)} >
                                        <img src={item.urls.small} className="images"></img>
                                    </div>
                                )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchImage;