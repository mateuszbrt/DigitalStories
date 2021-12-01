import React, { useEffect, useState } from "react";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

import { getStoryIds } from "../services/hnApi";

import {
  StoriesContainerWrapper,
  GlobalStyle,
} from "../styles/StoriesContainerStyles";

import Story from "../components/Story";

export default function StoriesContainer(props) {
  const [storyIds, setStoryIds] = useState([]);

  const count = useInfiniteScroll();

  useEffect(() => {
    getStoryIds().then((data) => setStoryIds(data));
  }, []);
  return (
    <>
      <GlobalStyle />

      <StoriesContainerWrapper data-test-id="stories-container">
        <h1>Hacker News Stories</h1>
        {storyIds.slice(0, count).map((storyId, index) => (
          <React.Fragment>
            <Story key={storyId} storyId={storyId} index={index} />
          </React.Fragment>
        ))}
      </StoriesContainerWrapper>
    </>
  );
}
