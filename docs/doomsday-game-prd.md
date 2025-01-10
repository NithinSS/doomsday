# Doomsday Algorithm Practice Game
Product Requirements Document

## Product Overview
The Doomsday Algorithm Practice Game is a minimalist web-based application designed to help users practice and master the Doomsday algorithm for mental calendar calculations. Users are presented with random dates and must determine the corresponding day of the week within a time limit, with progressive hints to aid learning.

## Core Features

### Game Configuration
- Time limit selection (default: 2 minutes)
  - Configurable from 1 to 10 minutes
  - Display in MM:SS format
- Year range selection
  - Default: 1600 to 2100
  - Any year range is valid, including same year for start and end
  - Input validation to ensure start year ≤ end year
- Configuration screen appears on first load and when "Reset Game" is selected
- Settings are preserved in local storage for returning users

### Gameplay Interface
- Minimalist design focusing on essential elements
- Primary display elements:
  - Current date in format: "March 15, 1923"
  - Timer countdown
  - Current score
  - Info button (opens instruction overlay)
  - Hint indicators (side panel)
- Keyboard controls:
  - Numbers 1-7 for day selection
    - 1: Sunday
    - 2: Monday
    - 3: Tuesday
    - 4: Wednesday
    - 5: Thursday
    - 6: Friday
    - 7: Saturday
  - Escape key to pause game
  - Space bar to resume game

### Hint System
- Maximum time per question: 40 seconds
- Hints appear every 10 seconds
- Hints are only visible when hovered
- Progressive hint sequence:
  1. Century's Doomsday (10s): "2000 is a Tuesday"
  2. Year's Doomsday (20s): "2025 is a Friday"
  3. Month's Doomsdays (30s): "1, 8, 15, 22, 29 August are Doomsdays"
  4. Direct Answer (40s): "It's a Wednesday"
- Hint indicators show availability without revealing content
- No penalty for using hints

### Game Mechanics
- Date Generation:
  - Random dates within selected year range
  - Equal distribution across months and years
  - No duplicate dates until all possible dates are used
- Scoring System:
  - +1 point for correct answer
  - No penalty for incorrect answers
- Response Feedback:
  - Correct answer: 
    - Subtle color change
    - New date appears instantly
  - Incorrect answer:
    - Quick subtle shake
    - Brief color change
    - Date remains for another attempt

### End Game
- Triggered by:
  - Timer reaching zero
  - User clicking "End Game" button
- Results screen shows:
  - Final score
  - Number of correct answers
  - Number of incorrect answers
  - Average response time
  - All-time high score

### Instructions & Help
- Info button reveals overlay with:
  - Basic Doomsday algorithm explanation
  - Keyboard controls
  - Scoring system
  - Quick reference table for doomsday dates
- Option to disable tutorial for future visits

## User Scenarios

### Scenario 1: First-time User
1. User visits the website
2. Welcome screen with brief game description
3. Default game settings are presented
4. User starts game with 2-minute timer
5. User sees first date and available hints
6. Hints progressively appear as time passes
7. End game screen shows performance metrics

### Scenario 2: Focused Practice
1. User selects specific year (2024-2024)
2. Sets custom timer duration
3. Practices dates within chosen year
4. Uses hints strategically
5. Reviews performance

### Scenario 3: Learning Mode
1. User sets longer timer
2. Actively uses hint system
3. Takes time to understand patterns
4. Makes connections between hints and answers
5. Reviews correct answers

## Technical Requirements

### Performance
- Date generation must be instantaneous
- Answer validation response under 100ms
- Minimal, smooth animations
- Game state saved every 15 seconds

### Browser Support
- Modern browsers (last 2 versions)
- Mobile-responsive design
- Touch interface support for mobile

### Data Management
- Local storage for settings and high scores
- Basic progress tracking

## Success Metrics
- User engagement (average session duration)
- Learning effectiveness (improvement in response time)
- User retention (returning users)
