import React from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

function PostCard({ post: { body, createdAt, id, username, likes, comments } }) {

    const likePost = () => {
        console.log("like post");
    }

    const commentPost = () => {
        console.log("comment");
    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='div' labelPosition='right' onClick={likePost}>
                    <Button color='teal' basic>
                        <Icon name='heart' />
                    </Button>
                    <Label basic color='teal' pointing='left'>
                        {likes.length}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' onClick={commentPost}>
                    <Button color='blue' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {comments.length}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    )
}

export default PostCard