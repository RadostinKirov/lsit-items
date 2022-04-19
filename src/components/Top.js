
import React from "react";
import { getAllPosts, getPostById } from "../service/posts";
import store from "../store/store";

class Top extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputGet: '',
            inputShow: '',
            loading: false
        };
    }



    onChangeGetHandler = (e) => {
        this.setState({
            inputGet: e.target.value
        })
    }

    onChangeShowHandler = (e) => {
        this.setState({
            inputShow: e.target.value
        })
    }

    onClickGet = () => {
        if (this.state.inputGet === "all") {
           this.setState({loading: true})
            try {
                getAllPosts()
                    .then(res => {
                        store.dispatch(
                            {
                                type: "postsLoaded",
                                payload: res
                            }
                        )
                        this.setState({loading: false});
                        console.log(store.getState());
                    })


            } catch (err) {
                throw err;
            }
        } else {
            const inputID = this.state.inputGet;
            if (isNaN(inputID)) {
                console.log('not a number');
            } else {
                this.setState({loading: true});
              try{
                   getPostById(inputID)
                    .then(res => {
                        store.dispatch(
                            {
                                type: "postsLoaded",
                                payload: res
                            }
                        )
                        this.setState({loading: false})
                        console.log(store.getState())
                    })
                }catch(err){
                    throw err;
                }
            }
        }
    }

    render() {
        return (
            <section className="buttons">
               
                {this.state.loading ? <h1 id="loading-msg">Loading...</h1> : ''}
               
                <div className="get-section">
                    <input onChange={this.onChangeGetHandler} value={this.state.inputGet} type="text" />
                    <button onClick={this.onClickGet} >GET</button>
                </div>
                <div className="show-section">
                    <input onChange={this.onChangeShowHandler} value={this.state.inputShow} type="text" />
                    <button >SHOW</button>
                </div>
                <hr className="line" />
            </section>
        )
    }
}

export default Top;