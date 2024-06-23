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
  const [courseData, setCourseData] = useState({
    courseId: 0,
    active: 0,
  });

  //*-------------------------------------------------------------------------------------this function Add new course to the db
  const addNewCourse = async ({ description, name }) => {

  
    if (!name.trim() ||!description.trim()) {
  console.log(description);
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
   
      setTimeout(() => {
        setOpenSnackbar(true);
      }, 1000);
    }

    handleCloseAddModel();
    setContent(emptyContent);
  };
  //*-------------------------------------------------------------------------------------this function delete selected course from db
  const deleteCurrentCourse = (courseId, active) => {
    dispatch(
      DeleteCourseState({
        courseId,
        active: active,
      })
    );
    handleCloseConfirmedDialog();
  };
  //*-------------------------------------------------------------------------------------this function edit selected course from db
  const updateCurrentCourse = (courseId) => {
    if (
      !(
        content.name.trim() &&
        content.description.trim()
        
      )
    ) {
      setSnackBarText("some info is undefine");
      setSnackBarStatus("error");
      setTimeout(() => {
        setOpenSnackbar(true);
      }, 1000);
    } else {
      dispatch(EditCourseState({ courseId, content }));
    }

    handleCloseEditModel();
  };
  return (
    <Box sx={{ backgroundColor: "lightgray", minHeight: "100vh", padding: 3,flexGrow:1,mt:2 }}>
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
                <StyledTableCell>description</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
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
                          setCourseData({
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
                          setCourseData({
                            courseId: course.id,
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
        fun={deleteCurrentCourse}
        itemId={courseData.courseId}
        isDeleted={courseData.active}
        itemName={itemName}
        snackBarText={CourseSelector?.snackBarMessage}
        snackBarStatus={CourseSelector?.snackBarStatus}
      />
      <AddModal
        snackBarText={CourseSelector?.snackBarMessage}
        snackBarStatus={CourseSelector?.snackBarStatus}
        show={showAddModal}
        setShow={setShowAddModal}
        handleShowModel={handleShowAddModel}
        itemName={itemName}
        fun={addNewCourse}
        handleCloseModel={handleCloseAddModel}
        content={content}
        setContent={setContent}
      />

      <EditModal
        snackBarText={CourseSelector.snackBarMessage}
        snackBarStatus={CourseSelector.snackBarStatus}
        show={showEditModal}
        setShow={setShowEditModal}
        handleShowModel={handleShowEditModel}
        setModalContent={setContent}
        id={courseData.courseId}
        itemName={itemName}
        fun={updateCurrentCourse}
        handleCloseModel={handleCloseEditModel}
        content={content}
        setContent={setContent}
      />
      <SimpleSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        text={CourseSelector?.snackBarMessage||snackBarText}
        status={CourseSelector?.snackBarStatus||snackBarStatus}
      />
    </Box>
  );
};

export default CourseList;


