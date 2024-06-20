import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
  Box,
} from "@mui/material";

import AddModal from "../../components/AddModal";
import SimpleSnackbar from "../../components/Snackbar";
import ConfirmedAndEditDialog from "../../components/ConfirmedDialog";
import EditModal from "../../components/EditModal";
import {
  AddCourseState,
  DeleteCourseState,
  EditCourseState,
} from "../../service/Redux/courses";

import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: "bold",
}));

const CourseList = ({
  courses,
  handleEdit,
  courseUpdate,
  CourseSelector,
  itemName,
  teacherName,
}) => {

  console.log(CourseSelector);
  const [showAddModal, setShowAddModal] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const [snackBarStatus, setSnackBarStatus] = useState("");

  const handleClickOpenConfirmDialog = () => setOpenDialog(true);
  const handleCloseConfirmedDialog = () => setOpenDialog(false);

  const handleShowAddModel = () => setShowAddModal(true);
  const handleCloseAddModel = () => setShowAddModal(false);
 
  const handleShowEditModel = () => setShowEditModal(true);
  const handleCloseEditModel = () => {
    setShowEditModal(false);
    setContent(emptyContent);
  };

  const dispatch = useDispatch();

  const [content, setContent] = useState({
    name: "",
    description: "",
  });
  const emptyContent = {
    name: "",
    description: "",
  };
  const [courseData, setBranchData] = useState({
    courseId: 0,
    active: 0,
  });

  //-------------------------------------------------------------------------------------this function Add new course to the db
  const addNewCourse = async ({ description, name }) => {
console.log(description,name);
  
    if (!name.trim() &&!description.trim()) {
      setSnackBarText("some info is undefine");
      setSnackBarStatus("error");
      setTimeout(() => {
        setOpenSnackbar(true);
      }, 1000);
    } else {
      dispatch(
        AddCourseState({
          name: name,
          description: description,
          user_id: localStorage.getItem("id"),
        })
      );
      // setSnackBarText("branch added successfully");
      // setSnackBarStatus("success");
      setTimeout(() => {
        setOpenSnackbar(true);
      }, 1000);
    }

    handleCloseAddModel();
    setContent(emptyContent);
  };
  //-------------------------------------------------------------------------------------this function delete selected branch from db
  // const deleteCurrentBranch = (branchId, active) => {
  //   dispatch(
  //     DeleteBranchesState({
  //       branchId,
  //       active: active,
  //     })
  //   );
  //   handleCloseConfirmedDialog();
  // };
  //-------------------------------------------------------------------------------------this function edit selected branch from db
  const updateCurrentBranch = (branchId) => {
    if (
      !(
        content.name.trim() &&
        content.phone.trim() &&
        content.street_name.trim()
      )
    ) {
      setSnackBarText("some info is undefine");
      setSnackBarStatus("error");
      // setTimeout(() => {
      //   setOpenSnackbar(true);
      // }, 1000);
    } else {
      // dispatch(EditBranchesState({ branchId, content }));
    }

    handleCloseEditModel();
  };
  return (
    <Box sx={{ backgroundColor: "lightgray", minHeight: "100vh", padding: 3 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={courseUpdate}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 3,
        }}
      >
        <Typography variant="h4">welcome Teacher {teacherName}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleShowAddModel();
          }}
        >
          Add Course
        </Button>
      </Box>
      {!(CourseSelector?.courses?.length === 0) ? (
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table aria-label="branches table">
            <TableHead>
              <TableRow>
                <StyledTableCell>course Name</StyledTableCell>
                <StyledTableCell>Created At</StyledTableCell>
                <StyledTableCell>text</StyledTableCell>
                <StyledTableCell align="center">description</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses?.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.created_at}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setContent({
                            name: course.name,
                            description: course.description,
                          });
                          setBranchData({
                            courseId: course.id,
                            active: course.active,
                          });
                          handleShowEditModel();
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="secondary"
                        onClick={() => {
                          setBranchData({
                            branchId: course.id,
                            active: 0,
                          });
                          handleClickOpenConfirmDialog();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={{ padding: 3, marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            There are no course added yet.
          </Typography>
        </Paper>
      )}

      <ConfirmedAndEditDialog
        handleCloseDialog={handleCloseConfirmedDialog}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        // fun={deleteCurrentBranch}
        itemId={courseData.branchId}
        isDeleted={courseData.active}
        itemName={itemName}
        snackBarText={CourseSelector.snackBarMessage}
        snackBarStatus={CourseSelector.snackBarStatus}
      />
      <AddModal
        snackBarText={CourseSelector.snackBarMessage}
        snackBarStatus={CourseSelector.snackBarStatus}
        show={showAddModal}
        setShow={setShowAddModal}
        handleShowModel={handleShowAddModel}
        itemName={itemName}
        fun={addNewCourse}
        handleCloseModel={handleCloseAddModel}
        content={content}
        setContent={setContent}
      />

      {/* <EditModal
        snackBarText={CourseSelector.snackBarMessage}
        snackBarStatus={CourseSelector.snackBarStatus}
        show={showEditModal}
        setShow={setShowEditModal}
        handleShowModel={handleShowEditModel}
        setModalContent={setContent}
        id={branchData.branchId}
        itemName={itemName}
        fun={updateCurrentBranch}
        handleCloseModel={handleCloseEditModel}
        content={content}
        setContent={setContent}
      /> */}
      <SimpleSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        text={CourseSelector.snackBarMessage}
        status={CourseSelector.snackBarStatus}
      />
    </Box>
  );
};

export default CourseList;

{
  /* <Dialog open={openAddDialog} onClose={handleClose}>
        <DialogTitle>Add New Branch</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Branch Name"
            type="text"
            fullWidth
            value={newBranch.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={newBranch.location}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={newBranch.location}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog> */
}
