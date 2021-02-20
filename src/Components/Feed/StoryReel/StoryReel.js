import React from "react";
import "./StoryReel.css";
import Story from "./Story/Story";
function Storyreel() {
  return (
    <div className="storyReel">
      <Story
        image="http://www.gstatic.com/tv/thumb/persons/67369/67369_v9_bb.jpg"
        profileSrc="https://i.pinimg.com/originals/ce/d4/e1/ced4e117b0f2f490c79e9e820d14cd99.jpg"
        title="Robet Downey jr"
      />
      <Story
        image="http://www.gstatic.com/tv/thumb/persons/67369/67369_v9_bb.jpg"
        profileSrc="https://i.pinimg.com/originals/ce/d4/e1/ced4e117b0f2f490c79e9e820d14cd99.jpg"
        title="Robet Downey jr"
      />
      <Story
        image="http://www.gstatic.com/tv/thumb/persons/67369/67369_v9_bb.jpg"
        profileSrc="https://i.pinimg.com/originals/ce/d4/e1/ced4e117b0f2f490c79e9e820d14cd99.jpg"
        title="Robet Downey jr"
      />
    </div>
  );
}

export default Storyreel;
