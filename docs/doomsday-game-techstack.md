# Doomsday Game - Technical Stack

## Core Technologies

### Frontend Framework
- **Svelte** + **TypeScript**
  - Simple, compiled framework with minimal runtime
  - Strong typing for maintainability
  - Built-in state management
  - Small bundle size

### Build Tool
- **Vite**
  - Fast development server
  - Efficient build process
  - Native TypeScript support
  - Small production bundles

### Deployment
- **Netlify**
  - Free tier hosting
  - Automatic deployments from GitHub
  - Custom domain support
- **GitHub**
  - Version control
  - CI/CD integration with Netlify

## Project Structure
```
src/
├── lib/
│   ├── components/
│   │   ├── GameSetup.svelte
│   │   ├── GameBoard.svelte
│   │   ├── Results.svelte
│   │   ├── Timer.svelte
│   │   └── Hints.svelte
│   ├── utils/
│   │   ├── dateGenerator.ts
│   │   ├── doomsdayCalculator.ts
│   │   └── storage.ts
│   └── types/
│       └── game.ts
├── routes/
│   ├── +page.svelte
│   ├── game/+page.svelte
│   └── results/+page.svelte
└── app.html
```

## Dependencies
Minimal external dependencies to keep bundle size small:

### Production Dependencies
```json
{
    "svelte": "^4.x.x",
    "@sveltejs/kit": "^2.x.x"
}
```

### Development Dependencies
```json
{
    "typescript": "^5.x.x",
    "vite": "^5.x.x",
    "@sveltejs/adapter-netlify": "^3.x.x",
    "vitest": "^1.x.x"
}
```

## Implementation Guidelines

### State Management
- Use Svelte's built-in stores
- Keep state minimal and flat
```typescript
import { writable } from 'svelte/store';

export const gameState = writable<GameState>({
    currentDate: new Date(),
    score: 0,
    correct: 0,
    incorrect: 0,
    timeRemaining: 0,
    questionTime: 0,
    hints: []
});
```

### CSS Strategy
- Use vanilla CSS with scoped styles
- No external CSS frameworks
- CSS custom properties for theming
```css
:root {
    --primary-color: #4a90e2;
    --error-color: #e24a4a;
    --success-color: #4ae24a;
}
```

### Performance Considerations
- Lazy load routes
- Precompute doomsday dates for selected year range
- Minimize DOM updates
- Use `requestAnimationFrame` for timer updates
- Implement debouncing for rapid inputs

### Testing Strategy
- Unit tests with Vitest
- Focus on core game logic
- Test date generation and scoring
- Simple component tests

### Build and Deploy
```yaml
# netlify.toml
[build]
  command = "npm run build"
  publish = "build/"
  node_version = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Code Quality Guidelines
- ESLint + Prettier configuration
- TypeScript strict mode
- Consistent naming conventions
- Component-specific types
- Documentation with JSDoc
- Clear commit messages

## Performance Targets
- Initial load < 100kb
- Time to Interactive < 2s
- Perfect Lighthouse score
- 60fps animations
