
# VectorShift  Assessment  [Live Demo](https://vectorshift-assessment-flyw.vercel.app)

This project is a frontend and backend application that demonstrates the implementation of node abstraction, dynamic styling, improved functionality for Text nodes, and backend integration to handle node and edge processing. Below, you’ll find instructions, features, and steps to run the project.



## Features

- Node Abstraction
- Styling
- Text Node Logic
- Backend Integration


## Installation

### Frontend


1.	Navigate to the /frontend directory:

```bash
  cd frontend 
```

2.	Install dependencies:

```bash
npm install
```

3. Start the frontend server:

```bash
npm start
```


### Backend

1.	Navigate to the /backend directory:

```bash
cd backend
```

2.	Install Python dependencies:

```bash
pip3 install 
```

3. Start the backend server:
   
```bash
uvicorn main:app --reload
```
## Usage

	1.	Open the frontend in your browser (At http://localhost:3000).
	2.	Drag and drop nodes from the toolbar to create a pipeline.
	3.	Click on the “Submit” button.
	4.	The pipeline data (nodes and edges) will be sent to the backend.
	5.	The backend will process the data and return:
	-	Number of nodes.
	-	Number of edges.
	-   Whether the pipeline forms a Directed Acyclic Graph (DAG).
	6.	An alert will display the result in the frontend.
