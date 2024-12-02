
# Next js Repeator

This is a Dynamic Repeater Form application built with Next.js 15 and Material-UI (MUI). The app allows users to dynamically add, edit, and delete form entries in a table. It supports data validation, persistence via local storage, and provides a modern and responsive UI.


## Features

- Dynamic Form Rows: Add, edit, and delete rows dynamically.
- Validation: Field validation using yup and react-hook-form.
- Persistent Data Storage: Data is stored in local storage for persistence across sessions.
- Reusable Components: Modular components for input fields, dropdowns, and date pickers.
- Responsive Design: Optimized for all screen sizes using Material-UI.
- Next.js 15 Features: Leverages server-side rendering (SSR) and client-side interactivity with React Server Components.


## Tech Stack

- Next.js 15: Framework for building the app with server-side rendering (SSR) and client-side interactivity.
- React: The core library powering the UI.
- Material-UI (MUI): For styling and layout components.
- React-Hook-Form: For efficient form state management.
- Yup: For schema-based validation.
- use-local-storage: For local persistence of form data.



## Prerequisites


Ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
## Installation

1. Clone the repository:
```bash
 git clone <repository-url>
```
2. Navigate to the project directory:
```bash
cd my-app

```
3. Install dependencies:
```bash
npm install
# or
yarn install

```
4. Run the development server:
```bash
npm run dev
# or
yarn dev
```
5. Open the app in your browser at http://localhost:3000.

## Folder Structure
```bash
src/
│
├── app/
│   ├── page.js                # Main page component
│   └── layout.js              # Global layout for the app
│
├── components/
│   ├── shared/
│   │   ├── form/
│   │   │   ├── FormInputSelect.js  # Dropdown component
│   │   │   ├── DatePicker.js       # Date picker component
│   │   │   ├── InputField.js       # Input field component
│   │   │   └── Toastmsg/           # Toast notifications
│   │   └── validation/
│   │       └── formValidation.js   # Validation schema for the form
│   ├── detailsList.js              # Predefined lists for dropdown options
│   └── Table.js                    # Component rendering the dynamic repeater table
│
├── styles/
│   ├── globals.css                 # Global CSS
│   └── table.css                   # Table-specific styles
│
├── utils/
│   ├── localStorage.js             # Utility for handling local storage
│
├── pages/
│   ├── api/                        # API endpoints (if needed for future expansion)
│
├── public/                         # Public assets
├── next.config.js                  # Next.js configuration
└── package.json                    # Project dependencies

```
## Components Overview
1. Table Component
Purpose: 
- Renders the dynamic table with form rows.
Features: 
- Add, edit, and delete rows.
- Persistent data with use-local-storage.
- Form validation using react-hook-form and yup


2. FormInputSelect Component
- Reusable dropdown component for fields like class or gender.

3. DatePicker Component
- Reusable date picker for selecting the date of birth.
4. InputField Component
- Text input field with validation for fields like email or full name.
5. Toast Notifications
- Provides visual feedback for actions like save or delete.
## Usage

#### Add a New Row
1. Click "Add Row" to create a new blank row.
2. Fill out the required fields.
3. Click Save to persist the row.
#### Edit a Row
1. Click the Edit button for the row you want to update.
2. Modify the fields and click Save.

#### Delete a Row
1. Click the Delete button for a row.
2. Confirm the action in the dialog.
