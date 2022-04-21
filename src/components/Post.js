import React from "react";

import { delPostById } from "../service/posts";
import store from "../store/store";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.post.title,
            body: this.props.post.body,
            id: this.props.post.id,
            message: ''
        };
    }


    render() {

        const onDeletehandler = () => {
            console.log('delete clicked', this.state.id);
            this.setState({ message: "Delete..." });
            try {
                delPostById(this.state.id)
                    .then(res => {
                        store.dispatch(
                            {
                                type: "postDelete",
                                payload: { id: this.state.id }
                            }
                        )

                        console.log("store updated -> ", store.getState());

                    })


            } catch (err) {
                throw err;
            }
        }


        return (
            <article>
                <h1 id='delete-message'>{this.state.message}</h1>
                <h2>{this.state.title}</h2>
                <p>{this.state.body}</p>
                <button onClick={onDeletehandler} value={this.state.id}>Delete</button>
            </article>
        )
    }
}

export default Post;