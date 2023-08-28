import { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
//import logo from "../../assets/logo.svg";
import FormHelperText from "@mui/material/FormHelperText";

import * as EmailValidator from "email-validator";

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&])[A-Za-z\d@$!%^*?&]{8,}$/;

  const checkPassword = passwordRegex.test(password);

  return checkPassword;
};

const LoginForm = () => {
  const [showAlert, setShowAlert] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const validateForm = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    // Add validation code here

    // check email validity
    const emailCheck = EmailValidator.validate(email);
    setEmailIsValid(emailCheck);

    // check password validity
    const passwordCheck = validatePassword(password);
    setPasswordIsValid(passwordCheck);

    if (!emailCheck || !passwordCheck) {
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    if (validateForm(event)) {
      setShowAlert("Login Successful");
    }
  };

  return (
    <div>
      {showAlert && (
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
        </Snackbar>
      )}

      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              my: 2,
            }}
          >
            {/*  <img src={logo} width="147" alt="harrison.ai" /> */}
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              error={!emailIsValid}
              margin="normal"
              required
              fullWidth
              id="email "
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              helperText={!emailIsValid && "Enter a valid email"}
            />
            <TextField
              error={!passwordIsValid}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={
                !passwordIsValid && (
                  <FormHelperText>
                    <Typography variant="body2">
                      - Minimum 8 characters
                      <br />
                      - Should contain both uppercase and lowercase letter
                      <br />- Minimum of 1 numerical digit (0-9)
                      <br />- Minimum of 1 special character (!@#$%^&*, etc)
                    </Typography>
                  </FormHelperText>
                )
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

export default LoginForm;
