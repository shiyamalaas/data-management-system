import  { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const App = () => {
  const [rows, setRows] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [newRow, setNewRow] = useState({ name: "", age: "", email: "" });

  // Fetch records
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/records").then((res) => setRows(res.data));
  }, []);

  // Add
  const handleAdd = () => {
    axios.post("http://127.0.0.1:5000/api/records", newRow).then((res) => {
      setRows([...rows, res.data]);
      setNewRow({ name: "", age: "", email: "" });
    });
  };

  // Edit 
  const handleSave = (id) => {
    const updatedRow = rows.find((row) => row.id === id);
    axios.put(`http://127.0.0.1:5000/api/records/${id}`, updatedRow).then(() => {
      setIsEdit(null);
    });
  };

  // Delete
  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/records/${id}`).then(() => {
      setRows(rows.filter((row) => row.id !== id));
    });
  };
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      
    </Box>
  );
  return (
    <Box>
      <h1>Data management system </h1>
      <br/>
      <div 
    className="Card-container" 
    style={{ 
        textAlign: "center", 
        margin: "auto", 
        width: "40%", 
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)" 
    }}
><Card sx={{ minWidth: 275 }}>
      <CardContent >
        <TextField
          label="Name"
          value={newRow.name}
          onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
          sx={{
            padding: "10px",
          }}
        /><br></br>
        <TextField
          label="Phone Number"
          value={newRow.age}
          onChange={(e) => setNewRow({ ...newRow, age: e.target.value })}
          sx={{
            padding: "10px",
          }}
          
        /><br></br>     
           <TextField
          label="Email"
          value={newRow.email}
          onChange={(e) => setNewRow({ ...newRow, email: e.target.value })}
          sx={{
            padding: "10px",
          }}
        />
        
      </CardContent>
      <CardActions>
      
     
      <Button 
    onClick={handleAdd} 
    style={{ 
        margin: "auto", 
        backgroundColor: "#0866ff", 
        color: "white" 
    }}
>
    Add Record
</Button>
      </CardActions>
    </Card>
    </div>
   
    <div style={{ width: "62%", margin: "auto", marginTop: "35px" }}>
  <DataGrid
    rows={rows}
    columns={[
      { field: "id", headerName: "ID", width: 90 },
      {
        field: "name",
        headerName: "Name",
        width: 150,
        editable: isEdit !== null,
      },
      {
        field: "age",
        headerName: "Phone Number",
        width: 150,
        editable: isEdit !== null,
      },
      {
        field: "email",
        headerName: "Email",
        width: 180,
        editable: isEdit !== null,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 200,
        renderCell: (params) => (
          <>
            {isEdit === params.id ? (
              <Button onClick={() => handleSave(params.id)}>Save</Button>
            ) : (
              <Button onClick={() => setIsEditing(params.id)}>Edit</Button>
            )}
            <Button onClick={() => handleDelete(params.id)}>Delete</Button>
          </>
        ),
      },
    ]}
    pageSize={5}
    onRowEditCommit={(params) => {
      const updatedRows = rows.map((row) =>
        row.id === params.id ? { ...row, ...params } : row
      );
      setRows(updatedRows);
    }}
  />
</div>

    </Box>
  );
};

export default App;

