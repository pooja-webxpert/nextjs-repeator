"use client";
import React, { useContext, useState } from "react";
import {
  Button,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import useLocalStorage from "use-local-storage";
import { yupResolver } from "@hookform/resolvers/yup";
import { PatientHistoryValidation } from "@/component/validation/patientHistoryValidation";
import FormInputSelect from "@/component/shared/form/FormInputSelect";
import FormDatePicker from "@/component/shared/form/datePicker";
import { CollegeClasses, genderOptions, TreatmentDetails } from "@/component/detailsList";
import InputField from "@/component/shared/form/InputField";
import { successMsg } from "@/component/shared/form/Toastmsg/toaster";

const Home = () => {
  

  const [formRows, setFormRows] = useLocalStorage("formRows", [
    {
      id: Date.now(),
      fullName: "",
      class: "",
      email: "",
      gender: "",
      dob: null,
      studentId: Date.now(),
      isEditing: true, // Initially editing
    },
  ]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentId, setStudentId] = useState();

  const [selectedRowId, setSelectedRowId] = useState(null);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      studentId: studentId || "",
      fullName: "",
      class: "",
      dob: null,
      gender: "",
      email: "",
    },
    
  });

  const handleAdd = () => {
    const newId = Date.now();
    setStudentId(newId)
    setFormRows((prev) => [
      ...prev,
      {
        id: newId,
        fullName: "",
        class: "",
        email:"",
        gender: "",
        dob: null,
        isEditing: true,
      },
    ]);
    reset();
  };
  
  const handleOpenDeleteModal = (id) => {
    setSelectedRowId(id);
    setDeleteModalOpen(true);
  };
  
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedRowId(null);
  };
  
  const handleConfirmDelete = () => {
    const updatedRows = formRows.filter((row) => row.id !== selectedRowId);
    setFormRows(updatedRows);
    
    // If the rows are empty after deletion, add a new empty row
    if (updatedRows.length === 0) {
      const newId = Date.now();
      setFormRows([
        {
          id: newId,
          treatment: "",
          class: "",
          email: "",
          gender: "",
          dob: null,
          isEditing: true,
        },
      ]);
      reset();
    }

successMsg("Student record is deleted successfully")
    
    handleCloseDeleteModal();
  };
  
 const handleSaveRow = (id, formData) => {
  let isNew = false;

  setFormRows((prevRows) =>
    prevRows.map((row) => {
      if (row.id === id) {
        if (row.isEditing) {
          isNew = true; // Determine if the row is new (editing)
        }
        return {
          ...row,
          fullName: formData[`fullName_${id}`] || row.fullName,
            class: formData[`class_${id}`] || row.class,
            email: formData[`email_${id}`] || row.email,
            dob: formData[`dob_${id}`] || row.dob,
            gender: formData[`gender_${id}`] || row.gender,
            isEditing: false, // End editing for this row
        };
      }
      return row;
    })
  );

  if (isNew) {
    successMsg("Student record is added successfully");
  } else {
    successMsg("Student record is updated successfully");
  }
};


  const handleEdit = (id) => {
    const updatedRows = [...formRows];
    const rowIndex = updatedRows.findIndex((row) => row.id === id);

    if (rowIndex !== -1) {
      updatedRows[rowIndex].isEditing = true; 
      setFormRows(updatedRows);

      const currentRow = updatedRows[rowIndex];
      setValue(`fullName_${id}`, currentRow.fullName);
      setValue(`email_${id}`, currentRow.email);
      setValue(`class_${id}`, currentRow.class);
      setValue(`gender_${id}`, currentRow.gender);
      setValue(`dob_${id}`, currentRow.dob);

    }
  };

  const columns = [
    {
      field: "studentId",
      headerName: "Student Id",
      width: 150,
      renderCell: (params) =>
          params.row.id
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 180,
      renderCell: (params) =>
        params.row.isEditing ? (
          <InputField
            // errors={errors}
            control={control}
            label="Full Name"
            name={`fullName_${params.row.id}`} // Make the name unique to the row
            className="custom-input"
          />
        ) : (
          params.row.fullName || ""
        ),
    },
    
    {
      field: "class",
      headerName: "Class",
      width: 150,
      renderCell: (params) =>
        params.row.isEditing ? (
          <FormInputSelect
            // errors={errors}
            control={control}
            label="Class"
            options={CollegeClasses}
            name={`class_${params.row.id}`}
            className="custom-input"
          />
        ) : (
          params.row.class||""
        ),
    },
    {
      field: "dob",
      headerName: "Date of Birth",
      width: 170,
      renderCell: (params) =>
        params.row.isEditing ? (
          <FormDatePicker
            control={control}
            label="Date of Birth"
            name={`dob_${params.row.id}`}
            className="custom-input"
          />
        ) : (
          params.row.dob||""
        ),
    },
    {
      className: "headerName",
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) =>
        params.row.isEditing ? (
          <InputField
          type="email"
            control={control}
            label="Email"
            name={`email_${params.row.id}`}
            className="custom-input"
          />
        ) : (
          params.row.email||""
        ),
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 120,
      renderCell: (params) =>
        params.row.isEditing ? (
          <FormInputSelect
            control={control}
            label="Gender"
            options={genderOptions}
            name={`gender_${params.row.id}`}
            className="custom-input"
          />
        ) : (
          params.row.gender||""
        ),
    },
  
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        // Check if the current row is the first row (index 0)
        const isFirstRow = params.row.id === formRows[0]?.id;
        return (
          <>
            {params.row.isEditing ? (
              <div className="flex gap-2">
                <Tooltip title="Save">
                  <Button
                    variant="contained"
                    className="edit-icon rounded-full"
                    onClick={handleSubmit((formData) =>
                      handleSaveRow(params.row.id, formData)
                    )}
                  >
                    <SaveIcon />
                  </Button>
                </Tooltip>
                {/* Show the delete icon only if it's not the first row is add */}
                {!isFirstRow && (
                  <Tooltip title="Delete">
                    <Button
                      variant="outlined"
                      className="delete-icon rounded-full"
                      onClick={() => handleOpenDeleteModal(params.row.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Tooltip title="Edit">
                  <Button
                    className="edit-icon rounded-full"
                    variant="outlined"
                    onClick={() => handleEdit(params.row.id)}
                  >
                    <EditIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Delete">
                  <Button
                    variant="outlined"
                    className="delete-icon rounded-full"
                    onClick={() => handleOpenDeleteModal(params.row.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </Tooltip>
              </div>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <Container>
     <div className="text-center mt-5"> 
     <Button className="add-row" onClick={handleAdd} variant="contained">
        Add Student Record
      </Button>
     </div>
      <div style={{ height: 480, width: "100%", marginTop: "15px" }}>
        <DataGrid
          style={{
            margin: "10px",
            fontSize: "16px",
          }}
          rows={formRows}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
          getRowHeight={() => 80} // Adjust row height
          sx={{
            "& .MuiDataGrid-cell": {
              alignItems: "center", // Align content vertically
            },
            "& .custom-input": {
              width: "100%", // Ensure inputs span the cell width
            },
            fontSize: "1rem", // Adjust font size for readability
          }}
        />
      </div>

      <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
    </>
  );
};

export default Home;