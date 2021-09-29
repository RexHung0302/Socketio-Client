import React, { useContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useHistory } from "react-router";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { StateContext } from "./pages/index";
import { Alert, Snackbar } from "@mui/material";

function App() {
  const history = useHistory();
  const data = useContext(StateContext);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Stack spacing={3}>
          <TextField
            id="name"
            label="您的大名"
            variant="standard"
            placeholder="輸入名稱進入聊天"
            helperText={data?.state?.name === "" ? "名稱為必填" : ""}
            error={data?.state.name === "" ? true : false}
            onChange={(e) => {
              data?.setState(
                (preVal) =>
                  (preVal = {
                    ...preVal,
                    name: e.target.value,
                  })
              );
            }}
          />
          <Stack spacing={1}>
            <Button
              variant="contained"
              onClick={() => {
                if (data?.state.name) {
                  history.push("/lobby");
                }
              }}
            >
              進入聊天室
            </Button>
            <Button
              style={{
                backgroundColor: "#00c300",
              }}
              variant="contained"
              onClick={() => {
                setOpenSnackbar(true);
              }}
            >
              Line Login
            </Button>
            <Button
              style={{
                backgroundColor: "#1877f2",
              }}
              variant="contained"
              onClick={() => {
                setOpenSnackbar(true);
              }}
            >
              Facebook Login
            </Button>
          </Stack>
        </Stack>
      </header>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        key={0}
        autoHideDuration={2000}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          功能尚未開放!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
