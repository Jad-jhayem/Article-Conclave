import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/pictures/Logo.png";
import { useRouter } from "next/router";
import { useLogIn } from "@/context/LogIn";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn } = useLogIn();
  const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(Boolean(anchorEl));
  }, [anchorEl]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logo}>
        <Image src={Logo} width={70} height={65} alt="Logo image" />
      </div>
      <div className={styles.links}>
        <Link href="/" legacyBehavior className={styles.link}>
          <a className={styles.linkTxt}>Home</a>
        </Link>
        <Link href="/Articles" legacyBehavior className={styles.link}>
          <a className={styles.linkTxt}>Articles</a>
        </Link>
        <Link href="/ContactUs" legacyBehavior className={styles.link}>
          <a className={styles.linkTxt}>Contact us</a>
        </Link>
      </div>
      {!isLoggedIn ? (
        <div className={styles.btns}>
          <Link href="/LogIn" legacyBehavior>
            <button className={styles.btnLogIn}>Log In</button>
          </Link>
          <Link href="/SignUp" legacyBehavior>
            <button className={styles.btnSignUp}>Sign Up</button>
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.avatar}>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                className={styles.imgAvatar}
                alt="user"
                sx={{ width: 50, height: 50 }}
                src="/Pictures/Avatar.png"
              />
            </IconButton>
          </div>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>My articles</MenuItem>

            <MenuItem onClick={handleClose}>Favorite</MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
      ;
    </div>
  );
};

export default Navbar;
