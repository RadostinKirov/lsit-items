import store from "../store/store";
import Post from "./Post";
import React from "react";
import { connect } from 'react-redux';

class Bottom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: store.getState().dataToPrint
        };
    }



    render() {
        // const mapStateToProps = state => ({ posts: state.dataToPrint });
        console.log(this.props)
        const { posts } = this.props;
         console.log('posts -> ',posts)
        
        return (
            <section className="results">

                {
                    posts?.length > 0 
                        ? posts.map(x => <Post key={x.id} post={x} />)
                        : ''
                }

            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.dataToPrint
    }
}

export default connect(mapStateToProps)(Bottom);
