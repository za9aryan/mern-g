import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { Grid } from 'semantic-ui-react'
import PostCard from '../components/PostCard'

const FETCH_POSTS = gql`

{
  getPosts {
    body
    id
    username
    createdAt
    comments {
      body
      username
      id
    }
    likes {
      id
      username
      createdAt
    }

  }
}

`

const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS)


    return (
        <Grid columns={3} >
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {
                    loading ?
                        "loading posts ..." :
                        data.getPosts.map(post => {
                            return (
                                <Grid.Column key={post.id} style={{ marginBottom: "10px" }}>
                                    <PostCard post={post} />
                                </Grid.Column>
                            )
                        })
                }
            </Grid.Row>
        </Grid>
    )
}



export default Home