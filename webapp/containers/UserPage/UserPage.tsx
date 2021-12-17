import {
  Badge,
  Button,
  Container,
  TextArea,
  TextInput,
} from "../../components";
import styled from "styled-components";
import User from "../../db/user";
import Posts from "../HomePage/Posts";
import IBadge from "../../db/badge";
import { useState } from "react";
import { Response } from "../../db/response";

interface Props {
  isOwner: boolean;
  profile: User;
}

const UserPage: React.FC<Props> = ({ profile, isOwner }) => {
  const { name, image, quote, about, posts, badges } = profile;
  const [editQuote, setEditQuote] = useState<boolean>(false);
  const [editAbout, setEditAbout] = useState<boolean>(false);
  const [newQuote, setNewQuote] = useState<string>(quote);
  const [newAbout, setNewAbout] = useState<string>(about);
  const [newSkill, setNewSkill] = useState<string>("");
  const [userBadges, setUserBadges] = useState<IBadge[]>(badges ?? []);

  async function handleSaveAbout() {
    const request = await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({
        ...profile,
        about: newAbout,
        posts: undefined,
        badges: undefined,
      }),
    });
    const response: Response<User> = await request.json();
    if (response.statusCode == 200) {
      setEditAbout(false);
    } else {
      // pass
      console.log("Could not update about");
    }
  }

  async function handleAddSkill() {
    const request = await fetch("/api/badges", {
      method: "POST",
      body: JSON.stringify({
        name: newSkill,
        userId: profile.id,
      }),
    });

    const response: Response<IBadge> = await request.json();
    if (response.statusCode == 200) {
      setUserBadges([...userBadges, response.data]);
      setNewSkill("");
    } else {
      // pass
      console.log("Could not create skill");
    }
  }

  async function handleDeleteSkill(badge: IBadge) {
    const request = await fetch("/api/badges", {
      method: "DELETE",
      body: JSON.stringify(badge),
    });

    const response: Response<IBadge> = await request.json();
    if (response.statusCode == 200) {
      setUserBadges(userBadges.filter((b) => b.name != badge.name));
    } else {
      // pass
      console.log("Something went wrong deleting badge");
    }
  }

  return (
    <Container style={{ marginBottom: "100px" }}>
      <TitleWrapper>
        <Img src={image} />
        <Title>{name}</Title>
      </TitleWrapper>

      {quote && <Quote>{quote}</Quote>}

      <Title>About</Title>
      {editAbout ? (
        <TextArea fluid text={newAbout} callback={setNewAbout} />
      ) : newAbout ? (
        <div>
          {newAbout.split("\n").map((p, i) => (
            <p key={`${i}-${p}`}>{p}</p>
          ))}
        </div>
      ) : (
        <p>
          <em>- Tell us about yourself! -</em>
        </p>
      )}
      {isOwner && (
        <Button
          callback={async () => {
            if (editAbout) {
              await handleSaveAbout();
            } else {
              setEditAbout(!editAbout);
            }
          }}
        >
          {editAbout ? "Save" : "Edit about"}
        </Button>
      )}

      <Title>Skills</Title>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleAddSkill();
        }}
      >
        {isOwner && (
          <SkillsInputWrapper>
            <TextInput
              style={{ marginRight: "10px" }}
              text={newSkill}
              callback={setNewSkill}
            />
            <Button type="submit">Add skill</Button>
          </SkillsInputWrapper>
        )}
        {userBadges &&
          userBadges.map((badge: IBadge) =>
            isOwner ? (
              <Badge
                callback={async () => await handleDeleteSkill(badge)}
                key={badge.name}
              >
                {badge.name}
              </Badge>
            ) : (
              <Badge key={badge.name}>{badge.name}</Badge>
            )
          )}
      </form>

      {posts && posts.length > 0 && <Title>Code Review Requests</Title>}
      {posts && <Posts editable={isOwner} posts={posts} />}
    </Container>
  );
};

export default UserPage;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
`;

const Title = styled.h1`
  margin-top: 50px;
`;

const Img = styled.img`
  border-radius: 50%;
  height: 80px;
  margin-top: 50px;
  margin-right: 20px;
  box-shadow: 0 5px 5px rgb(0, 0, 0, 0.1);
  border: solid 1px rgb(10, 10, 140, 0.7);
`;

const Quote = styled.p`
  color: gray;
  margin-left: 100px;
  margin-top: -30px;
  font-size: 18px;
  font-weight: bold;
`;

const SkillsInputWrapper = styled.div`
  display: block;
  margin-bottom: 20px;
`;
