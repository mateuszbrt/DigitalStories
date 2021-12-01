import React, { useState, useEffect } from "react";

import { getStory } from "../services/hnApi";
import { mapTime } from "../mappers/mapTime";

import {
  StoryMetaElement,
  StoryMeta,
  StoryTitle,
  StoryWrapper,
} from "../styles/StoryStyles";

export default function Story({ storyId }) {
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory(storyId).then((data) => data && data.url && setStory(data));
  }, []);
  return story && story.url ? (
    <StoryWrapper data-testid="story">
      <StoryTitle>
        <a href={story.url}>{story.title}</a>
      </StoryTitle>

      <StoryMeta>
        <span data-testid="story-by">
          <StoryMetaElement color="#000">By:</StoryMetaElement> {story.by}
        </span>
        <span data-testid="story-type">
          <StoryMetaElement color="#000">Type:</StoryMetaElement> {story.type}
        </span>
        <span data-testid="story-time">
          <StoryMetaElement color="#000">Posted:</StoryMetaElement> {``}
          {`${mapTime(story.time)} ago`}
        </span>
      </StoryMeta>
    </StoryWrapper>
  ) : null;
}
