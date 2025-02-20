#!/bin/bash

# Create directories if they don't exist
mkdir -p assets/images
mkdir -p assets/videos

# Download images
curl -o assets/images/hero-bg.jpg "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=80"
curl -o assets/images/portfolio-1.jpg "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
curl -o assets/images/portfolio-2.jpg "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
curl -o assets/images/portfolio-3.jpg "https://images.unsplash.com/photo-1556761175-129418cb2dfe?w=800&q=80"
curl -o assets/images/team-1.jpg "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
curl -o assets/images/about-img.jpg "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"

# Download sample videos from a public CDN
curl -o assets/videos/hero-video.mp4 "https://static.videezy.com/system/resources/previews/000/042/013/original/business-team-meeting.mp4"
curl -o assets/videos/team-video.mp4 "https://static.videezy.com/system/resources/previews/000/042/014/original/business-team-brainstorming.mp4"

# Create favicon
convert assets/images/logo.svg -resize 32x32 assets/images/favicon.ico
