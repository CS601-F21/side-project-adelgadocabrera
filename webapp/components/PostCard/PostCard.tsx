import React, { useState } from "react";
import styled from "styled-components";
import IPost from "../../db/post";
import { Badge } from "../index";
import Link from "next/link";
import { fromNow } from "../../utils/dates";
import { TextInput } from "../";

interface Props {
  post: IPost;
  editable: boolean;
}

export const PostCard: React.FC<Props> = ({ post, editable }) => {
  const [deletePost, setDeletePost] = useState<boolean>(false);
  const [deleteMsg, setDeleteMsg] = useState<string>("");
  const [postIsDeleted, setPostIsDeleted] = useState<boolean>(false);
  const contentLength = 160; // number of chars

  async function handleDeletePost(e: string) {
    setDeleteMsg(e);

    if (e == post.title) {
      const deleteRequest = await fetch("/api/posts", {
        method: "DELETE",
        body: JSON.stringify({ postId: post.id }),
      });
      setPostIsDeleted(true);
    }
  }

  if (postIsDeleted) return "";

  return (
    <Card onBlur={() => setTimeout(() => setDeletePost(false), 150)}>
      <Link
        href={"/post/" + post.id}
        key={"post-" + post.id + "-" + post.title}
      >
        <Metadata>
          <Item>
            <Number>{post.likes}</Number>
            likes
          </Item>
          <Item>
            <Number>
              {!post._count?.codeReviews ? 0 : post._count.codeReviews}
            </Number>
            code reviews
          </Item>
        </Metadata>
      </Link>
      {deletePost ? (
        <Body>
          <p>
            Type <strong>{post.title}</strong> to delete post:
          </p>
          <TextInput
            fluid
            autoFocus
            text={deleteMsg}
            callback={handleDeletePost}
          />
        </Body>
      ) : (
        <Link href={"/post/" + post.id} key={"post-" + post.id}>
          <Body>
            <Title>{post.title}</Title>
            <Description>
              {post.content.length > contentLength
                ? post.content.slice(0, contentLength) + "..."
                : post.content}
            </Description>
            <Date>{fromNow(post.createdAt)}</Date>
            <Badges>
              {post.badges &&
                post.badges.map((b) => (
                  <Badge key={"badge-" + b.id}>{b.name}</Badge>
                ))}
            </Badges>
          </Body>
        </Link>
      )}
      {editable && (
        <DeleteWrapper onClick={() => !deletePost && setDeletePost(true)}>
          {deletePost ? "Cancel" : "Delete"}
        </DeleteWrapper>
      )}
    </Card>
  );
};

const DeleteWrapper = styled.div`
  z-index: 999;
  cursor: pointer;
  background-color: rgb(209, 26, 42);
  padding: 10px 20px;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  &:hover {
    filter: brightness(1.1);
  }
`;

const Body = styled.div`
  width: 100%;
  height: auto;
  padding: 25px 20px;

  @media (min-width: 768px) {
    padding: 30px 20px 20px 50px;
  }
`;

const Card = styled.section`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  margin-bottom: 20px;
  background-color: white;
  border: solid 1px rgb(0, 0, 0, 0);
  transition: box-shadow 0.1s linear;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border: solid 1px rgb(10, 10, 140, 0.7);
    border-radius: 3px;
  }
`;

const Metadata = styled.div`
  height: 100%;
  display: flex;
  width: 100%;
  margin-top: 20px;
  border-radius: 0;
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: column;
    width: 150px;
    margin: 0;
    height: auto;
    border-radius: 3px 0 0 3px;
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
  padding: 10px;
  font-size: 14px;

  @media (min-width: 768px) {
    height: 100%;
    padding: 0;
  }

  &:hover {
    filter: brightness(1.1);
  }
`;

const Number = styled.div`
  font-weight: 900;
  font-size: 20px;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const Title = styled.div`
  font-family: Montserrat;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 0px;
`;

const Description = styled.p`
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Badges = styled.div`
  display: flex;
  align-items: flex-end;
  align-content: flex-end;
  flex-wrap: wrap;
`;

const Date = styled.div`
  margin-bottom: 10px;
  color: gray;
  font-size: 14px;
`;
