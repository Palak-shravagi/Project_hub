import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, Redirect } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Rightsection from "../rightsection/Rightsection";
import TextField from "@mui/material/TextField";
// import AddIcon from '@material-ui/icons/Add';
// import Info from "./components/Information/infromation";
import Fab from "@mui/material/Fab";
import logo from "../../final-logo-01.jpg";
import { Row, Col } from "react-bootstrap";
import "./loginhome.css";
import Filter from "../filters/filter";
import { useEffect } from "react";

const pages = ["Home", "About us", "Contact"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function LoginHome() {
  const [logedIN, setlogedIN] = React.useState(true);
  React.useEffect(async () => {
    try {
      const res = await fetch("/islogedin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status != 266) setlogedIN(false);
    } catch (error) {
      console.log(error);
      window.alert("Error!");
    }
  }, []);

  if (!logedIN) {
    return <Redirect to="/login" />;
  }
  const navigate = useNavigate ();;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const callhomelogin = async () => {
    try {
      const res = fetch("/LoginHome", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log("data from db" + data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
    navigate("/LoginHome");
  };

  useEffect(() => {
    callhomelogin();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "rgb(13,17,23)" }}>
        <AppBar
          position="static"
          className=""
          style={{
            backgroundColor: "#171A22",
            marginBottom: "10px",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                <img
                  style={{
                    width: "170px",
                    height: "60px",
                    marginTop: "5px",
                    marginBottom: "5px",
                    paddingBottom: "5px",
                  }}
                  src={logo}
                />
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                <img
                  style={{
                    width: "170px",
                    height: "60px",
                    marginTop: "5px",
                    marginBottom: "5px",
                    paddingBottom: "5px",
                  }}
                  src={logo}
                />
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Row
          style={{
            backgroundColor: "rgb(13,17,23)",
            paddingLeft: "50px",
            paddingRight: "50px",
          }}
        >
          <Col md={2}>
            {/* <Box width={20} component="span" m={1}>
              <div width="20">
                <Col>
                  <Button
                    style={{ marginLeft: "200px" }}
                    onClick={() => navigate("/info")}
                    variant="contained"
                    color="primary"
                  >
                    Add Project
                  </Button>
                </Col>
              </div>
            </Box> */}

            <Rightsection></Rightsection>
          </Col>
          {/* section in between the porject and filter tab */}
          <Col md={7}>
            <div class="input-group mb-3">
              <input
                type="text"
                style={{ backgroundColor: "rgb(13,17,23)", color: "white" }}
                class="form-control input-text"
                placeholder="Type here to search"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button class="btn btn-lg" type="button">
                  <i class="fa fa-search"></i>
                </button>{" "}
              </div>
            </div>
          </Col>
          <Col md={3} style={{ paddingRight: "0px" }}>
            <Filter />
          </Col>
        </Row>
        {/* <Box width={20} component="span" m={1} >
          <div width="20">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Button onClick={() => navigate("/info")} variant="contained" color="primary" >Add Project</Button>
            
            </div>          

        </Box> */}

        {/* <Container maxWidth="sm"  >
            
        </Container> */}
      </div>
    </>
  );
}

export default LoginHome;
