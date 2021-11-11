import React from 'react';
import styled from 'styled-components'
import IPost from "../../db/post";
import {Badge} from '../index'

const Card = styled.section`
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    box-shadow: 0 4px 10px rgba(0,0,0, .2);
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 20px;
    transition: box-shadow 0.2s linear;
    background-color: white;
    
    @media(min-width: 768px){
        flex-direction: row;
    }
    
    &:hover {
        box-shadow: 0 8px 14px rgba(0,0,0, .3);
    }
`;

const Metadata = styled.div`
   height: 100%;
   display: flex;
   width: 100%; 
   margin-top: 20px;
   border-radius: 0 0 8px 8px;
   overflow: hidden;
   
   @media(min-width: 768px){
        flex-direction: column;
        width: 150px; 
        margin: 0;
        height: auto;
        border-radius: 8px 0 0 8px;
   }
   
`;

const Item = styled.div`
    text-align: center;
    background-color: rgb(100, 100, 105);
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    @media(min-width: 768px){
        height: 100%;
    }
    
    &:hover {
        filter: brightness(1.1);
    }
`;

const Number = styled.div`
    font-weight: 900;
    font-size: 24px;
`;

const Body = styled.div`
    width: 100%;
    height: auto;
    padding: 25px 20px;
    
    @media(min-width: 768px){
        padding: 40px 40px 20px 60px;
    }
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 0px;
`;

const Description = styled.p`
    font-size: 16px;
    margin-top: 5px;
`;

const Badges = styled.div`
    display: flex;
    align-items: flex-end;
    align-content: flex-end;
`;

const Date = styled.div`
    text-align: right;
    color: gray;
`;

interface Props {
    post: IPost
}

export const Post: React.FC<Props> = ({post}) => {
    return <Card key={"post-" + post.id}>
        <Metadata>
            <Item>
                <Number>
                    {post.likes}
                </Number>
                likes
            </Item>
            <Item>
                <Number>
                    {!post.codeReviews ? 0 : post.codeReviews.length}
                </Number>
                code reviews
            </Item>
        </Metadata>
        <Body>
            <Title>
                {post.title}
            </Title>
            <Description>
                {post.content}
            </Description>
            <Date>
                {post.createdAt.toLocaleDateString()}
            </Date>
            <Badges>
                {post.badges.map(b => <Badge key={"badge-" + b.id}>{b.name}</Badge>)}
            </Badges>
        </Body>
    </Card>
}