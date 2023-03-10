import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Grow,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import landingImage from '../assets/oudioo.png'
import { GlassCard } from "../components/Glasscard";
import { GrowList } from "../components/GrowList";
import Image from '../assets/backdrop2.jpeg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  },
  container: {
    paddingTop: 100,
    padding: theme.spacing(4),
  },
  content: {
    paddingTop: theme.spacing(6),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    width:  '70px',
    height: '65px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loginText : {
    color: '#ffffff',
    textDecoration: 'none'
  }
}));

interface FormElements extends HTMLFormControlsCollection {
     email: HTMLInputElement;
     password: HTMLInputElement;
     persistent: HTMLInputElement;
 }
interface SignInFormElement extends HTMLFormElement {
     readonly elements: FormElements;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to={'#'}>
        Oudioo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Login() {
  const classes = useStyles();
  
  

  return (
    <div className={classes.app}>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.container}>
        <form onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                event.preventDefault();
                 const formElements = event.currentTarget.elements;
                 const data = {
                   email: formElements.email.value,
                   password: formElements.password.value,
                  //  persistent: formElements.persistent.checked,
                };
                alert(JSON.stringify(data, null, 2));
       }}>
          <Grow in>
            <GlassCard>
              <GrowList className={classes.content}>
                <Avatar className={classes.avatar}>
                 <img src={landingImage} className={classes.avatar}/>
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  style={{ width: "100%" }}
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  <Link to={'/home'} className={classes.loginText}>Sign In</Link>
                </Button>
                
                <Grid container>
                  <Grid item xs>
                    <Link to={'#'} >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to={'#'} >
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>

                <Box mt={4}>
                  <Copyright />
                </Box>
              </GrowList>
            </GlassCard>
          </Grow>
        </form>
      </Container>
    </div>
  );
}

export default Login;