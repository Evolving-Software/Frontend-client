import React from 'react';
import { storiesOf } from '@storybook/react'
import Video from '../components/elements/video/video'

const defaultProps = {
        media: "https://youtu.be/p2sZKAPOQXs",
        poster: "",
        className: "",
        controls: true,
        autoPlay: false,
}

storiesOf('Video', module).add("default", () => <Video {...defaultProps}/>)