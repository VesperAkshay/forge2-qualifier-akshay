# Tiny Kanban App Plan
## Laravel API (SQLite) + React (Vite)

## Project Structure
- **Backend**: Laravel API with SQLite (F:\forge2-qualifier-akshay\backend)
- **Frontend**: React application with Vite (F:\forge2-qualifier-akshay\frontend)

## Entities & Database Schema

### 1. Boards
- id (primary key)
- title (string)
- description (text, nullable)
- created_at (timestamp)
- updated_at (timestamp)

### 2. Lists
- id (primary key)
- board_id (foreign key to boards)
- title (string)
- position (integer for ordering)
- created_at (timestamp)
- updated_at (timestamp)

### 3. Cards
- id (primary key)
- list_id (foreign key to lists)
- title (string)
- description (text, nullable)
- position (integer for ordering within list)
- due_date (date, nullable)
- created_at (timestamp)
- updated_at (timestamp)

### 4. Tags
- id (primary key)
- name (string)
- color (string, hex color code)
- created_at (timestamp)
- updated_at (timestamp)

### 5. Members
- id (primary key)
- name (string)
- email (string, unique)
- avatar_url (string, nullable)
- created_at (timestamp)
- updated_at (timestamp)

### 6. Pivot Tables
#### card_tag (many-to-many)
- card_id (foreign key to cards)
- tag_id (foreign key to tags)

#### card_member (many-to-many)
- card_id (foreign key to cards)
- member_id (foreign key to members)

## API Endpoints

### Boards
- GET /api/boards - List all boards
- POST /api/boards - Create a new board
- GET /api/boards/{id} - Get a specific board
- PUT /api/boards/{id} - Update a board
- DELETE /api/boards/{id} - Delete a board

### Lists
- GET /api/lists - List all lists (or filter by board_id)
- POST /api/lists - Create a new list
- GET /api/lists/{id} - Get a specific list
- PUT /api/lists/{id} - Update a list
- DELETE /api/lists/{id} - Delete a list

### Cards
- GET /api/cards - List all cards (or filter by list_id)
- POST /api/cards - Create a new card
- GET /api/cards/{id} - Get a specific card
- PUT /api/cards/{id} - Update a card
- DELETE /api/cards/{id} - Delete a card
- POST /api/cards/{id}/move - Move card to different list/position

### Tags
- GET /api/tags - List all tags
- POST /api/tags - Create a new tag
- GET /api/tags/{id} - Get a specific tag
- PUT /api/tags/{id} - Update a tag
- DELETE /api/tags/{id} - Delete a tag

### Members
- GET /api/members - List all members
- POST /api/members - Create a new member
- GET /api/members/{id} - Get a specific member
- PUT /api/members/{id} - Update a member
- DELETE /api/members/{id} - Delete a member

### Card Relationships
- POST /api/cards/{id}/tags - Assign tags to card
- DELETE /api/cards/{id}/tags/{tagId} - Remove tag from card
- POST /api/cards/{id}/members - Assign members to card
- DELETE /api/cards/{id}/members/{memberId} - Remove member from card

## Frontend Components (React + Vite)

### Main App Structure
- App.jsx - Main application component
- BoardList.jsx - Displays list of boards
- BoardView.jsx - Main board interface (Kanban view)
- ListComponent.jsx - Individual list container
- CardComponent.jsx - Individual card component
- Modal components for forms:
  - BoardFormModal.jsx
  - ListFormModal.jsx
  - CardFormModal.jsx
  - TagFormModal.jsx
  - MemberFormModal.jsx

### Key Features Implementation
1. **Board Management** - Create, read, update, delete boards
2. **List Management** - Create lists within boards, reorder lists
3. **Card Management** - CRUD operations for cards, drag-and-drop between lists
4. **Tagging System** - Create and assign colored tags to cards
5. **Member Assignment** - Assign team members to cards
6. **Due Dates** - Set and display due dates on cards
7. **Drag-and-Drop** - Move cards between lists using react-beautiful-dnd or similar

## Task Breakdown

### Phase 1: Backend Setup (Laravel API)
1. [ ] Initialize Laravel project in backend folder
2. [ ] Configure SQLite database connection
3. [ ] Create migration files for all entities:
   - Boards table
   - Lists table
   - Cards table
   - Tags table
   - Members table
   - Pivot tables (card_tag, card_member)
4. [ ] Run migrations to create database schema
5. [ ] Create Eloquent models for all entities with relationships
6. [ ] Create API controllers for all entities:
   - BoardController
   - ListController
   - CardController
   - TagController
   - MemberController
7. [ ] Define API routes in routes/api.php
8. [ ] Implement validation for all endpoints
9. [ ] Test API endpoints with Postman or similar tool

### Phase 2: Frontend Setup (React + Vite)
1. [ ] Initialize Vite React project in frontend folder
2. [ ] Install required dependencies:
   - react-router-dom for routing
   - axios for HTTP requests
   - react-beautiful-dnd (or similar) for drag-and-drop
   - Optional: UI library like Tailwind CSS or Material-UI
3. [ ] Set up project structure with components folder
4. [ ] Create main App component with routing
5. [ ] Implement API service layer for communicating with Laravel backend

### Phase 3: Feature Implementation
#### Board Features
1. [ ] Create BoardList component to display all boards
2. [ ] Implement board creation form (modal)
3. [ ] Implement board update/delete functionality
4. [ ] Connect board components to Laravel API endpoints

#### List Features
1. [ ] Implement list creation within boards
2. [ ] Implement list update/delete functionality
3. [ ] Connect list components to Laravel API endpoints

#### Card Features
1. [ ] Create CardComponent with display of title, description, tags, members, due date
2. [ ] Implement card creation form (modal)
3. [ ] Implement card update/delete functionality
4. [ ] Implement drag-and-drop functionality to move cards between lists
5. [ ] Connect card components to Laravel API endpoints

#### Tag Features
1. [ ] Create tag management interface
2. [ ] Implement tag creation, update, deletion
3. [ ] Implement tag assignment to cards
4. [ ] Connect tag components to Laravel API endpoints

#### Member Features
1. [ ] Create member management interface
2. [ ] Implement member creation, update, deletion
3. [ ] Implement member assignment to cards
4. [ ] Connect member components to Laravel API endpoints

#### Due Date Features
1. [ ] Implement due date selection in card forms
2. [ ] Display due dates on cards with visual indicators (overdue, today, future)
3. [ ] Connect due date functionality to Laravel API endpoints

### Phase 4: Integration & Testing
1. [ ] Test all CRUD operations for each entity
2. [ ] Test drag-and-drop functionality between lists
3. [ ] Test tag assignment/removal functionality
4. [ ] Test member assignment/removal functionality
5. [ ] Test due date functionality
6. [ ] Perform end-to-end testing of complete workflows
7. [ ] Optimize performance and fix any bugs
8. [ ] Add loading states and error handling
9. [ ] Implement basic styling and responsiveness

## Technical Requirements

### Backend (Laravel)
- PHP 8.1+
- Laravel 9.x or 10.x
- SQLite 3.x
- Composer dependency manager

### Frontend (React)
- Node.js 16.x+
- npm or yarn
- React 18.x+
- Vite 4.x+

## Development Workflow
1. Backend API development and testing
2. Frontend setup and API integration
3. Feature-by-feature implementation
4. Continuous testing throughout development
5. Final integration and polishing

## Estimated Time
- Phase 1 (Backend): 2-3 hours
- Phase 2 (Frontend Setup): 1-2 hours
- Phase 3 (Features): 4-6 hours
- Phase 4 (Integration/Testing): 2-3 hours
- **Total**: Approximately 9-14 hours

## Next Steps
1. Begin backend setup in the `backend` folder
2. Set up Laravel project and database configuration
3. Create migrations and models
4. Implement API endpoints
5. Once backend is functional, proceed with frontend setup