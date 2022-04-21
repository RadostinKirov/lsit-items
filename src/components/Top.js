
import React from "react";
import { getAllPosts, getPostById } from "../service/posts";
import store from "../store/store";

class Top extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputGet: '',
            inputShow: '',
            loading: false,
            errValidation: ''
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
        if (this.state.inputGet) {
            if (this.state.inputGet === "all") {
                this.setState({ loading: true })
                try {
                    getAllPosts()
                        .then(res => {
                           
                            store.dispatch(
                                {
                                    type: "postsLoaded",
                                    payload: { data: res }
                                }
                            )
                            this.setState({ loading: false });
                            console.log("saved in store -> ", store.getState());
                        })


                } catch (err) {
                    console.log(err)
                    throw err;
                }
            } else {
                const inputID = this.state.inputGet;
                if (isNaN(inputID)) {
                    console.log('not a number');
                } else {
                    this.setState({ loading: true });
                    try {
                        getPostById(inputID)
                            .then(res => {
                                store.dispatch(
                                    {
                                        type: "postsLoaded",
                                        payload: { data: [res] }
                                    }
                                )
                                this.setState({ loading: false })
                                console.log("saved in store -> ", store.getState())
                            })
                    } catch (err) {
                        throw err;
                    }
                }
            }
        }
    }

    onClickShow = () => {
        let dataToPrint = store.getState().data;
        const inputShow = this.state.inputShow;
        if (!inputShow) {
            this.setState({ errValidation: 'въведи "all ,1, 2, 3 ..."' })
        } else if (inputShow === "all") {
            this.setState({errValidation: ''});
            store.dispatch(
                {
                    type: "postsToPrint",
                    payload: { dataToPrint }
                }
            )
            console.log(store.getState())
        } else if (isNaN(inputShow)) {
            console.log('not a number');
        } else {
            this.setState({errValidation: ''});
            const id = inputShow;
            console.log('checkpoint1 -> ', dataToPrint)
            dataToPrint = dataToPrint.filter(post => post.userId === Number(id));
            if(dataToPrint.length === 0){
                this.setState({errValidation: 'няма такъв запис'});
                return
            }
            store.dispatch(
                {
                    type: "postsToPrint",
                    payload: { dataToPrint }
                }
            )
            console.log(store.getState())
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
                    <button onClick={this.onClickShow} >SHOW</button>
                    {this.state.errValidation ? <h1 id="err-validation">{this.state.errValidation}</h1> : ''}
                </div>
                <hr className="line" />
            </section>
        )
    }
}

export default Top;